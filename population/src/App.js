import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Home from './Home';
import PopulationData from './PopulationData';
import PopulationDataSearch from './PopulationDataSearch';
import AddNewPopulation from './AddNewPopulation';
import PopulationArmy from './PopulationArmy';

const App = () => {
  const [enlistedPopulation, setEnlistedPopulation] = React.useState([]);
  const [newlyAddedPopulation, setNewlyAddedPopulation] = React.useState([]);

  const handleEnlist = (populationBot) => {
    if (!enlistedPopulation.find((bot) => bot["ID Year"] === populationBot["ID Year"])) {
      setEnlistedPopulation((prevEnlisted) => [...prevEnlisted, populationBot]);
    }
  };

  const handleRelease = (populationBot) => {
    setEnlistedPopulation((prevEnlisted) =>
      prevEnlisted.filter((bot) => bot["ID Year"] !== populationBot["ID Year"])
    );
  };

  const handleAddPopulation = (newPopulationData) => {
    // set when the server returns the newly added data with an ID
    setNewlyAddedPopulation((prevNewlyAdded) => [...prevNewlyAdded, newPopulationData]);
  };

  return (
    <Router>
      <AppBar position="static" sx={{ backgroundColor: '#007bff' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            C.J's POPULATION APP
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/data">
            Population Data
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 2 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/data"
            element={
              <Box>
                <Typography variant="h4" sx={{ mb: 3, color: '#007bff' }}>
                  POPULATION DATA
                </Typography>
                <AddNewPopulation onAddPopulation={handleAddPopulation} />
                <Box>
                  <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
                    ADDED POPULATION
                  </Typography>
                  {newlyAddedPopulation.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        border: 1,
                        p: 2,
                        my: 2,
                        backgroundColor: '#f0f0f0',
                        '&:hover': {
                          backgroundColor: '#e0e0e0',
                        },
                      }}
                    >
                      <Typography>ID Year: {item["ID Year"]}</Typography>
                      <Typography>ID Nation: {item["ID Nation"]}</Typography>
                      <Typography>Nation: {item.Nation}</Typography>
                      <Typography>Year: {item.Year}</Typography>
                      <Typography>Population: {item.Population}</Typography>
                      <Typography>Slug Nation: {item["Slug Nation"]}</Typography>
                    </Box>
                  ))}
                </Box>
                <PopulationDataSearch onEnlist={handleEnlist} />
                <PopulationArmy enlistedPopulation={enlistedPopulation} onRelease={handleRelease} />
              </Box>
            }
          />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
