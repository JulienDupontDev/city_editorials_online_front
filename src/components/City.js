import { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import {
  Button,
  Card,
  CardActions,
  makeStyles,
  Typography,
  CardHeader,
} from "@material-ui/core";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  infos: {
    display: "flex",
    flexDirection: "column",
  },
}));
const City = () => {
  const [city, setCity] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const classes = useStyles();
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(`${process.env.REACT_APP_API}/cities/${id}`);

        setCity(result.data);
        console.log(result.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [id]);

  return (
    <>
      <Grid container justify="center">
        {city && (
          <Grid item className={classes.infos} xs={12}>
            <Typography variant="h3">Informations basiques</Typography>
            <Typography>Nom : {city.name}</Typography>
            <Typography>Code postal : {city.zipcode}</Typography>
          </Grid>
        )}
        <Grid item xs={6}>
          {city &&
            city.documents.map((doc, index) => {
              const document = doc[0];
              return (
                <Card style={{ marginTop: index !== 0 ? 5 : 0 }}>
                  <CardHeader title={document.name} />
                  <CardActions>
                    <Button>
                      <a
                        href={document.url}
                        target="_blank"
                        download={document.url}
                      >
                        Télécharger
                      </a>
                    </Button>
                  </CardActions>
                </Card>
              );
            })}
        </Grid>
      </Grid>
    </>
  );
};

export default City;
