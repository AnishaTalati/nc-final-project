import { GroupContext } from "../contexts/groupContext";
import { useContext, useState, useEffect } from "react";
import NavBar from "./NavigationBar";
import { Link, useParams } from "react-router-dom";
import { getGroupData } from "../utils/api";
import Particle from "react-particles-js";
import particlesConfig from "../assets/particlesConfig.json";

const GroupPage = () => {
  const { group_slug } = useParams();
  const [groupData, setGroupData] = useState("");
  const [lookupObj, setLookupObj] = useState([]);

  const myStorage = window.localStorage;
  const groupName = localStorage.getItem("groupName");
  const username = localStorage.getItem("username");

  useEffect(() => {
    getGroupData(group_slug).then((response) => {
      setGroupData(response);
      setLookupObj(Object.keys(response));
    });
  }, []);

  return (
    <div className="map-page">
      <div style={{ position: "relative" }}>
        <Particle height="100vh" width="100vw" params={particlesConfig} />
      </div>
      <NavBar />
      <h2>{group_slug}</h2>
      <h4>Welcome {username}</h4>
      <ul className="group-list">
        {lookupObj.map((member) => {
          return (
            <li key={member}>
              <p>{member}, </p>
            </li>
          );
        })}
      </ul>
      <div className="button-container">
        <Link to={`/${group_slug}/ar`}>
          <button className="join-button">View in AR</button>
        </Link>
        <Link to={`/${group_slug}/map`}>
          <button className="create-button">View in 2D</button>
        </Link>
      </div>
    </div>
  );
};

export default GroupPage;
