import React, { useEffect, useState } from "react";
import { CssBaseline, Grid } from "@material-ui/core";

import { getPlacesData } from "./api";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import PlaceDetails from "./components/PlaceDetails/PlaceDetails";

import placesJson from './data/places.json'

const App = () => {
  const [places, setPlaces] = useState(placesJson);
  const [loading, setLoading] = useState(false);
  const [childClicked, setChildCliked] = useState(null)

  const [coordinates, setCoordinates] = useState(null);
  const [bounds, setBounds] = useState({
    ne: { lat: 0, lng: 0 },
    sw: { lat: 0, lgn: 0 },
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    setLoading(true);

    if (bounds.sw.lat) {
      // getPlacesData(bounds.sw, bounds.ne).then((data) => {
      //   console.log(data);
      //   setPlaces(data);
          setLoading(false);
      // });
    }
  }, [coordinates, bounds]);

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List places={places} childClicked={childClicked} loading={loading} />
        </Grid>
        <Grid item xs={12} md={8}>
          {coordinates && (
            <Map
              setCoordinates={setCoordinates}
              setBounds={setBounds}
              coordinates={coordinates}
              places={places}
              setChildCliked={setChildCliked}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default App;
