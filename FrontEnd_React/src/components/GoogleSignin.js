// Login.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useFetch from "./hooks";

// https://developers.google.com/identity/gsi/web/reference/js-reference

const GoogleSignin = (props) => {
  // Get the current URL of the website
  const currentURL = window.location.href;

  // Extract the hostname from the URL
  const hostname = new URL(currentURL).hostname;
  const { handleGoogle, loading, error } = useFetch(
    `http://${hostname}:5002/users/login`
  );

  useEffect(() => {
    /* global google */
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogle,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("loginDiv"),
        {
          // type: "standard",
          theme: "filled_black",
          // size: "small",
          text: "signin_with",
          shape: "pill",
        }
      );

      // google.accounts.id.prompt()
    }
  }, [handleGoogle]);

  return (
    <>
      <nav style={{ padding: "2rem" }}>
        <Link to="/">Go Back</Link>
      </nav>
      <header style={{ textAlign: "center" }}>
        <h1>Login to continue</h1>
      </header>
      <main
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {error && <p style={{ color: "red" }}>{error}</p>}
        {loading ? <div>Loading....</div> : <div id="loginDiv"></div>}
      </main>
      <footer></footer>
    </>
  );
};

export default GoogleSignin;
