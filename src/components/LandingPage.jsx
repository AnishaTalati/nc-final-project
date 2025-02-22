import NavBar from "./NavigationBar";
import { Link, useParams, Route } from "react-router-dom";
import { useState } from "react";
import { checkGroupExists, sendData } from "../utils/api";
import useGeolocation from "react-hook-geolocation";
import GroupPage from "./GroupPage";
import Particle from "react-particles-js";
import particlesConfig from "../assets/particlesConfig.json";

const LandingPage = ({ setUsername, username, setGroupName, groupName }) => {
  const [error, setError] = useState("");
  // const [groupPageDisabled, setGroupPageDisabled] = useState(true);

  const geolocation = useGeolocation();

  const checkInputs = async (button) => {
    if (groupName.length === 0 || username.length === 0) {
      setError("Please provide valid inputs");
    } else {
      checkGroupExists(groupName).then((response) => {
        if (
          (response && button === "join") ||
          (!response && button === "create")
        ) {
          sendData(
            groupName,
            username,
            geolocation.latitude,
            geolocation.longitude
          );
          // setGroupPageDisabled(false);
        } else if (button === "create") {
          setError("That group exists, please try again");
        } else {
          setError("That group doesn't exist, please try again");
        }
      });
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    localStorage.setItem("groupName", groupName);
    localStorage.setItem("username", username);
    switch (e.target.innerHTML) {
      case "Create Group":
        checkInputs("create");
      case "Join a Group":
        checkInputs("join");
    }
  };

  return (
    <div
      className="landing-page"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <div style={{ position: "absolute" }}>
        <Particle height="100vh" width="100vw" params={particlesConfig} />
      </div>
      <NavBar />
      <h1>Welcome to MAPA</h1>
      <form className="landing-form">
        <label>
          Username:
          <br />
          <input
            className="form-input"
            onBlur={(event) => {
              setUsername(event.target.value);
            }}
          ></input>
        </label>
        <br />
        <label>
          Group Name:
          <br />
          <input
            className="form-input"
            onBlur={(event) => {
              setGroupName(event.target.value);
            }}
          ></input>
          <p>{error && error}</p>
        </label>
        <br />
        <div className="button-container">
          <button className="create-button" onClick={handleClick}>
            Create Group
          </button>
          <br />
          <button className="join-button" onClick={handleClick}>
            Join a Group
          </button>
        </div>
        {/* {!groupPageDisabled && ( */}
        <Link to={`/${groupName}`}>
          <button className="group-button" id="group-page-button">
            Group Page
          </button>
        </Link>
        {/* )} */}
      </form>
    </div>
  );
};

export default LandingPage;
