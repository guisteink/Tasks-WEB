import React from "react";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import DoneIcon from "@material-ui/icons/Done";
import { format, parseISO, formatDistance } from "date-fns";

const useStyles = makeStyles((theme) => ({
  cardFilter: {
    width: "100vw",
  },
  cardGrid: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(8),
  },
  card: {
    width: "20vw",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  filterCard: {
    paddingTop: theme.spacing(8),
    width: "10vw",
  },
  div: {
    display: `flex`,
    justifyContent: "center",
  },
  link: {
    textDecoration: "none",
    color: "black",
  },
  link2: {
    textDecoration: "none",
  },
  icon: {
    color: "green",
    marginLeft: theme.spacing(1),
  },
}));

function NoteCard({ id, title, description, when, done }) {
  const classes = useStyles();

  function daysToTask(d) {
    return formatDistance(parseISO(d), new Date());
  }
  return (
    <Grid item>
      <Card className={classes.card} title="Click to edit">
        <Link className={classes.link} to={`/task/${id}`}>
          <CardMedia
            className={classes.cardMedia}
            image={`https://source.unsplash.com/random/${id}`}
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
              {done ? (
                <DoneIcon className={classes.icon}></DoneIcon>
              ) : (
                " (" + daysToTask(when) + ")"
              )}
            </Typography>
            <Typography>{description}</Typography>
            <Typography>{format(new Date(when), "yyyy-MM-dd HH:mm")}</Typography>
          </CardContent>
        </Link>

        <CardActions></CardActions>
      </Card>
    </Grid>
  );
}

export default NoteCard;
