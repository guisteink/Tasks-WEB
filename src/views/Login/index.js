import React, { useState, useContext } from "react";
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
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

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
    backgroundColor: theme.palette.primary.main,
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

function Login() {
  const classes = useStyles();
  const [values, setValues] = useState(initialState);
  const { setToken } = useContext(StoreContext);
  const history = useHistory();

  const [user, setUser] = useState();

  function onChange(event) {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  }

  async function SignIn() {
    await api.post("/auth/authenticate", values).then((response) => {
      console.log(response.data);
      setToken(response.data.token);
      if (response.data.token) {
        if (response.data.user) {
          localStorage.setItem("@groupfy/user", response.data.user.name);
        }
        return history.push("/");
      }
      alert("Usuário ou Senha inválidos");
      setValues(initialState);
    });
  }

  function onSubmit(event) {
    event.preventDefault();
    SignIn();
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
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
            label="User"
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
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default Login;
