import React, { useState, useEffect } from "react";
import * as S from "./styles";
import Drawer from "../../components/Drawer";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Qr from "qrcode.react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import isConnected from "../../utils/isConnected";
import isLogged from "../../utils/isLogged";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    display: "inline-block",
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(8),
  },
  title: {
    paddingTop: theme.spacing(3),
    display: `flex`,
    justifyContent: "center",
  },
  subtitle: {
    paddingTop: theme.spacing(1),
    display: `flex`,
    justifyContent: "start",
  },
  codigo: {
    width: "35vw",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(1),
  },
}));

function QrCode() {
  const classes = useStyles();
  const [mac, setMac] = useState();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {}, 1);

  async function Unsync() {
    localStorage.removeItem("@groupfy/macaddress");
    window.location.reload();
  }

  async function SaveMac() {
    if (!mac) {
      alert("Informe o código QR Code");
    } else {
      await localStorage.setItem("@groupfy/macaddress", mac);
      window.location.reload();
      if (!redirect) {
        alert("Sincronizado");
      }
    }
  }

  return (
    <S.Container>
      <Drawer />
      <React.Fragment />
      <main>
        <Container variant="h1" className={classes.cardGrid} maxWidth="md">
          <Typography className={classes.title}>
            {isConnected ? <h1>Sincronizadoooooo</h1> : <h1>Sincronizar</h1>}
          </Typography>

          <Qr value="https://github.com/guisteink/API-CRUD" size={400}></Qr>
          <FormControl className={classes.codigo} variant="outlined">
            {isConnected ? (
              <OutlinedInput readonly value={isConnected} />
            ) : (
              <OutlinedInput
                id="mac"
                type="text"
                name="mac"
                value={mac}
                onChange={(e) => setMac(e.target.value)}
                id="component-outlined"
                label="codigo"
              />
            )}

            {isConnected ? (
              <Button
                color="primary"
                className={classes.button}
                variant="contained"
                onClick={Unsync}
              >
                UnSync
              </Button>
            ) : (
              <Button
                color="primary"
                className={classes.button}
                variant="contained"
                onClick={SaveMac}
              >
                Sync
              </Button>
            )}

            <Typography className={classes.subtitle}>
              <h3>Observação:</h3>
            </Typography>
            <Typography className={classes.text}>
              <span>
                O código MacAddress ao lado serve apenas de ilustração e
                redirecionamento para uma página pré-determinada. Para se
                conectar devidamente com suas tasks, digite sempre o mesmo
                código, como uma senha.
              </span>
            </Typography>
          </FormControl>
        </Container>
      </main>
    </S.Container>
  );
}

export default QrCode;
