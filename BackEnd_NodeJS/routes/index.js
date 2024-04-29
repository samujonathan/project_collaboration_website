var express = require('express');
var router = express.Router();
var pool = require("./pool");
const xlsx = require("xlsx");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const { PDFDocument } = require("pdf-lib");
const axios = require("axios");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token." });
    req.user = user;
    next();
  });
}

/* POST add project route. */
router.post("/add-project", function (req, res, next) {
  const { title, technology_bucket, category, description, problem_creator } =
    req.body;

  // Assuming you have user authentication and you can get the user_id of the logged-in user from the token
  const user_id = req.user.user_id;

  // Insert the project into the database
  pool.query(
    `INSERT INTO PROJECTS (title, technology_bucket, category, description, problem_creator, user_id) 
    VALUES ($1, $2, $3, $4, $5, $6) 
    RETURNING project_id`,
    [title, technology_bucket, category, description, problem_creator, user_id],
    (error, result) => {
      if (error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(201).json({
          message: "Project added successfully",
          project_id: result.rows[0].project_id,
        });
      }
    }
  );
});

function insertProjectsFromExcel(filePath, userId) {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(worksheet);

  data.forEach((project) => {
    const { Title, Technology_Bucket, Category, Description, Problem_Creator } =
      project;

    // Insert the project into the database
    pool.query(
      `INSERT INTO PROJECTS (title, technology_bucket, category, description, problem_creator, user_id) 
      VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        Title,
        Technology_Bucket,
        Category,
        Description,
        Problem_Creator,
        userId,
      ],
      (error, result) => {
        if (error) {
          console.error("Error inserting project:", error.message);
        } else {
          console.log("Project inserted successfully");
        }
      }
    );
  });
}

/* GET route to write contents of the file into projects database. */
router.get("/write-projects", function (req, res, next) {
  const filePath =
    "/home/jonathan/study/projects/projectCollab/routes/projects/sih.xlsx";
  const userId = 1; // Assuming user_id is 1

  // Insert projects from Excel file into the database
  insertProjectsFromExcel(filePath, userId);

  res
    .status(200)
    .json({ message: "Projects added successfully from Excel file." });
});


// Multer storage configuration
const storage = multer.memoryStorage()

// Multer upload instance
const upload = multer();

router.post("/upload-resume", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }
    const user = JSON.parse(req.body.user);

    console.log(user);
    const pdfBuffer = req.file.buffer;

    // Load the uploaded PDF file
    const pdfDoc = await PDFDocument.load(pdfBuffer);

    // Check if it's a valid PDF file
    if (!pdfDoc) {
      return res.status(400).json({ error: "Invalid PDF file." });
    }

    // Save the PDF data or perform any other operations
    // For now, we'll just send it as a response
    const folderName =  "/home/jonathan/study/projects/projectCollab/routes/projects/uploads"
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
    }
    const fileName = user.id + ".pdf";
    const filePath = path.join(folderName, fileName);
    fs.writeFile(filePath, pdfBuffer, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to save file." });
      }

      // Update the database with the resume path
      const resumePath = filePath;
      pool.query(
        `UPDATE users SET resume_path = $1 WHERE user_id = $2`,
        [resumePath, user.id],
        (error, result) => {
          if (error) {
            console.error("Error updating resume path:", error.message);
            return res
              .status(500)
              .json({ error: "Failed to update resume path." });
          }
          console.log("Resume path updated successfully.");
          res.status(200).json({ success: true, filePath });
        }
      );
    });
  } catch (error) {
    console.error("Error uploading PDF:", error);
    res.status(500).json({ error: "An error occurred while uploading PDF." });
  }
});

router.get("/recommend/:user_id", async (req, res) => {
  try {
    const user_id = req.params.user_id;

    // Make the Axios call to fetch recommendations
    const response = await axios.get(
      `http://localhost:8080/api/recommendations/${user_id}/`
    );
    const recommendations = response.data.recommendations;

    // Return recommendations as JSON response
    res.json({ recommendations });
  } catch (error) {
    // Handle any errors
    console.error("Error getting recommendations:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching recommendations" });
  }
});




module.exports = router;
