import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";

import { useNavigate } from "react-router-dom";

const CityList = () => {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(`${process.env.REACT_APP_API}/cities`);

        setCities(result.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Typography variant="h4" component="h1">
        Liste des villes
      </Typography>
      {isError && <div>Une erreur est survenue ...</div>}
      {isLoading ? (
        <div>Chargement ...</div>
      ) : (
        <ul style={{ listStyle: "none" }}>
          {cities.map((city, index) => (
            <li key={city._id} style={{ marginTop: index === 0 ? 0 : 5 }}>
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  navigate(`/cities/${city._id}`);
                }}
              >
                <Typography color="white">{city.name}</Typography>
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CityList;
