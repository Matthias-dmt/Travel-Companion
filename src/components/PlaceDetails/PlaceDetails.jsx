import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import Rating from "@material-ui/lab/Rating";

import useStyles from "./styles";

const PlaceDetails = ({
  selected,
  refProp,
  place: {
    name,
    photo,
    price_level: price,
    ranking,
    awards,
    cuisine,
    address,
    phone,
    web_url,
    website,
    rating,
    num_reviews,
  },
}) => {
  const classes = useStyles();

  selected &&
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <Card elevation={6}>
      <CardMedia
        style={{ height: 350 }}
        image={
          photo
            ? photo.images.large.url
            : "https://foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
        }
        title={name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {name}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Rating size="small" value={Number(rating)} readOnly />
          <Typography gutterBottom variant="subtitle1">
            out of {num_reviews} reviews
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Price</Typography>
          <Typography gutterBottom variant="subtitle1">
            {price}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Ranking</Typography>
          <Typography gutterBottom variant="subtitle1">
            {ranking}
          </Typography>
        </Box>
        {awards?.map((award, i) => (
          <Box my={1} key={i} display="flex" justifyContent="space-between">
            <img src={award.images.small} alt={award.display_name} />
            <Typography color="textSecondary" variant="subtitle2">
              {award.display_name}
            </Typography>
          </Box>
        ))}
        {cuisine?.map(({ name }) => (
          <Chip key={name} label={name} size="small" className={classes.chip} />
        ))}
        {address && (
          <Typography
            gutterBottom
            color="textSecondary"
            variant="body2"
            className={classes.subtitle}
          >
            <LocationOnIcon /> {address}
          </Typography>
        )}
        {phone && (
          <Typography
            gutterBottom
            color="textSecondary"
            variant="body2"
            className={classes.spacing}
          >
            <PhoneIcon /> {phone}
          </Typography>
        )}
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => window.open(web_url, "_blank")}
          >
            Trip Advisor
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => window.open(website, "_blank")}
          >
            Website
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default PlaceDetails;
