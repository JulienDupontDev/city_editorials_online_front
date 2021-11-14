import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Routes, Route } from "react-router";
import CityList from "./components/CityList";
import { Button } from "@material-ui/core";
import City from "./components/City";
import { Link } from "react-router-dom";
function App() {
  return (
    <Grid container className="App">
      <Grid item xs={12}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              <Link to="/">
                <Button>City editorials</Button>
              </Link>
            </Typography>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<CityList />} />
          <Route path="/cities/:id" element={<City />} />
        </Routes>
      </Grid>
    </Grid>
  );
}

export default App;
