import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { useMediaQuery, Paper, Typography } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";


import useStyles from "./styles";

const Map = ({ setCoordinates, setBounds, coordinates, places, setChildCliked }) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width: 600px)");

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDx72SbvxrukrPo8of-cgLpY31pm8-0ut8" }}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        // options={}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildCliked(child)}
      >
        {places?.map((place, i) => place.latitude && place.longitude && (
          <div
            key={i}
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
          >
            {!isDesktop ? (
              <LocationOnOutlinedIcon color="primary" fontSize="large" />
            ) : (
              <Paper elevation={3} className={classes.paper}>
                <Typography className={classes.typography} variant="subtitle2">
                  {place.name}
                </Typography>
                <img
                  className="classes.pointer"
                  src={
                    place.photo
                      ? place.photo.images.large.url
                      : "https://foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                  }
                  alt={place.name}
                />
                <Rating size="small" value={Number(place.rating)} readOnly />
              </Paper>
            )}
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
