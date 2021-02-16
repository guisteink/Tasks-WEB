import React from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  filterCard: {
    display: "flex",
    justifyContent: "center"
  },
}));

export default function DisableElevation() {
  const classes = useStyles();
  return (
    <ButtonGroup className={classes.filterCard} variant="outlined">
      <Button color="default">All</Button>
      <Button color="default">Today</Button>
      <Button color="default">Late</Button>
    </ButtonGroup>
  );
}
