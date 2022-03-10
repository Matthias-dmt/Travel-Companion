import React, { useEffect, useState } from "react";
import { CssBaseline, Grid } from "@material-ui/core";

import { getPlacesData } from "./api";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import PlaceDetails from "./components/PlaceDetails/PlaceDetails";

import placesJson from "./data/places.json";

const App = () => {
  const [places, setPlaces] = useState(placesJson);
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const [childClicked, setChildCliked] = useState(null);

  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");

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
    const filteredPlaces = places.filter(place => place.rating > rating);

    setFilteredPlaces(filteredPlaces)
  }, [rating])

  useEffect(() => {
    setLoading(true);

    if (bounds.sw.lat) {
      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
        setPlaces(data);
      setFilteredPlaces([]);
        setLoading(false);
      });
    }
  }, [type, coordinates, bounds]);

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            loading={loading}
            type={type}
            rating={rating}
            setType={setType}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          {coordinates && (
            <Map
              setCoordinates={setCoordinates}
              setBounds={setBounds}
              coordinates={coordinates}
              places={filteredPlaces.length ? filteredPlaces : places}
              setChildCliked={setChildCliked}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default App;
