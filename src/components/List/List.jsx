import React, { createRef, useEffect, useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";

import PLaceDetails from "../PlaceDetails/PlaceDetails";

import useStyles from "./styles";

const List = ({ places, childClicked, loading }) => {
  const classes = useStyles();

  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");
  const [elRefs, setElrefs] = useState([]);

  useEffect(() => {
    const refs = Array(places?.length)
      .fill()
      .map((_, i) => elRefs[i] || createRef());
    setElrefs(refs);
  }, [places]);

  console.log(elRefs);
  return (
    <div className={classes.container}>
      <Typography variant="h4">
        Restaurants, Hotels & Attractions around you
      </Typography>
      {loading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel>Type</InputLabel>
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Type</InputLabel>
            <Select value={rating} onChange={(e) => setRating(e.target.value)}>
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
          </FormControl>

          <Grid container spacing={3} className={classes.list}>
            {places?.map(
              (place, i) =>
                place.latitude &&
                place.longitude && (
                  <Grid ref={elRefs[i]} item key={i} xs={12}>
                    <PLaceDetails
                      place={place}
                      selected={Number(childClicked) === i}
                      refProp={elRefs[i]}
                    />
                  </Grid>
                )
            )}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;
