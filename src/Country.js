import React, { useEffect, useState } from "react";
import "./Country.css";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams } from "react-router-dom";
import Axios from "axios";

const Country = () => {
  const [country, setCountry] = useState({});
  const params = useParams();

  useEffect(() => {
    Axios.get(`https://restcountries.com/v2/name/${params.name}`).then(
      (res) => {
        setCountry(res.data[0]);
        console.log("country", res.data[0]);
      }
    );
  }, []);

  return (
    <>
      {/* Navbar */}
      <div className="topNav">
        <h3>Where in the world?</h3>
        <div className="mode">
          <DarkModeOutlinedIcon />
          <h5>Dark Mode</h5>
        </div>
      </div>
      {/* back button */}
      <div className="back">
        <ArrowBackIcon />
        <h4>Back</h4>
      </div>
      {/* single card */}
      {country && (
        <div className="container">
          <div className="box_country">
            <div className="box__image">
              <img src={country?.flags?.png} alt="image" />
            </div>
            <div className="box__desc">
              <div className="box__desc1">
                <div className="item1">
                  <h2>{country?.name}</h2>
                  <p>Native Name: {country?.nativeName}</p>
                  <p>Population: {country?.population}</p>
                  <p>Region: {country?.region}</p>
                  <p>Sub Region: {country?.subregion}</p>
                  <p>Capital: {country?.capital}</p>
                </div>
                <div className="item2">
                  <p>Top Level Domain: {country?.topLevelDomain[0]}</p>
                  <p>Currencies: {country?.currencies[0]?.name}</p>
                  <p> Language: {country?.languages[0]?.name}</p>
                </div>
              </div>
              <div className="box__desc2">
                <p>Border Countries:</p>
                {country.borders.map((b) => (
                  <button>{b}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Country;
