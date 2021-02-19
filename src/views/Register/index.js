import React, { useState, useContext, useEffect } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import StoreContext from "../../store/context";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Typography from '@material-ui/core/Typography';

import api from "../../services/api";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
  },
}));

function initialState() {
  return { name: "", password: "" };
}

function Register() {
  const classes = useStyles();
  const [values, setValues] = useState(initialState);
  const { setToken } = useContext(StoreContext);
  const history = useHistory();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    setValues(initialState);
  }, 1);

  function onChange(event) {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  }
  async function Register() {
    await api.post("auth/register/", values).then((response) => {
    });
  }
  function onSubmit(event) {
    event.preventDefault();
    Register();
    alert("Registrado");
    setRedirect(true);
  }

  return (
    <Container component="main" maxWidth="xs">
      {redirect && <Redirect to="/login" />}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form onSubmit={onSubmit} className={classes.form} noValidate>
          <TextField
            onChange={onChange}
            value={values.name}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoFocus
          />
          <TextField
            onChange={onChange}
            value={values.password}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Register
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default Register;
