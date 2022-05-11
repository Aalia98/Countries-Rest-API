import React, { useState, useEffect } from "react";
import "./Countries.css";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");
  const navigate = useNavigate();
  const [myStyle, setMyStyle] = useState({
    color: "black",
    backgroundColor: "white",
  });

  const [btnText, setBtnText] = useState("Dark Mode");

  const toggleStyle = () => {
    if (myStyle.color == "black") {
      setMyStyle({
        color: "white",
        backgroundColor: "black",
      });
      setBtnText("Light Mode");
    } else {
      setMyStyle({
        color: "black",
        backgroundColor: "white",
      });
      setBtnText("Dark Mode");
    }
  };

  useEffect(() => {
    Axios.get("https://restcountries.com/v2/all").then((res) =>
      setCountries(res.data)
    );
  }, []);

  return (
    <div style={myStyle}>
      <div className="topNav" style={myStyle}>
        <h3>Where in the world?</h3>
        <div onClick={toggleStyle} className="mode">
          <div className="dark">
            <DarkModeOutlinedIcon />
          </div>
          <h5>{btnText}</h5>
        </div>
      </div>
      <div className="searchBar">
        <div className="icon">
          <div className="searchIcon">
            {/* <SearchIcon /> */}
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Search for a country"
            onChange={(e) => {
              setSearchCountry(e.target.value);
            }}
          />
        </div>
        <div className="filter">
          <input type="text" placeholder="Filter by Region" />
          <img src="/images/icon-arrow-down.svg" alt="down arrow" />
        </div>
      </div>
      {countries.length > 0 ? null : (
        <div className="progress">
          <CircularProgress />
        </div>
      )}
      <div className="box" style={myStyle}>
        {countries &&
          countries
            .filter((val) => {
              if (searchCountry == "") {
                return val;
              } else if (
                val.name.toLowerCase().includes(searchCountry.toLowerCase())
              ) {
                return val;
              }
            })
            .map((item) => (
              <div
                onClick={() => navigate(`/countries/${item.name}`)}
                className="country"
                key={item.name}
              >
                <div className="country__image">
                  <img src={item.flag} alt="image" />
                </div>
                <div className="country__desc">
                  <h3>{item.name}</h3>
                  <p>Population: {item.population}</p>
                  <p>Region: {item.region}</p>
                  <p>Capital: {item.capital}</p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Countries;
