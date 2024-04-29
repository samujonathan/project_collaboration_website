// Signup.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useFetch from "./hooks";

// https://developers.google.com/identity/gsi/web/reference/js-reference

const GoogleSignup = (props) => {
  // Get the current URL of the website
  const currentURL = window.location.href;

  // Extract the hostname from the URL
  const hostname = new URL(currentURL).hostname;
  const { handleGoogle, loading, error } = useFetch(
    `http://${hostname}:5002/users/signup`
  );

  useEffect(() => {
    /* global google */
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogle,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("signUpDiv"),
        {
          // type: "standard",
          theme: "filled_black",
          // size: "small",
          text: "continue_with",
          shape: "pill",
        }
      );

      // window.google.accounts.id.prompt()
    }
  }, [handleGoogle]);

  return (
    <>
      <nav style={{ padding: "2rem" }}>
        <Link to="/">Go Back</Link>
      </nav>
      <header style={{ textAlign: "center" }}>
        <h1>Register to continue</h1>
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
        {loading ? (
          <div>Loading....</div>
        ) : (
          <div id="signUpDiv" data-text="signup_with"></div>
        )}
      </main>
      <footer></footer>
    </>
  );
};

export default GoogleSignup;