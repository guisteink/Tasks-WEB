import * as S from "./styles";

import Drawer from "../../components/Drawer";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl } from "@material-ui/core";
import { FormGroup } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import { format } from "date-fns";
import { Form } from "react-bootstrap";
import Select from "@material-ui/core/Select";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import isConnected from "../../utils/isConnected";
import isLogged from "../../utils/isLogged";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "50vw",
    paddingTop: theme.spacing(10),
  },
  formTitle: {
    paddingTop: theme.spacing(3),
    display: `flex`,
    justifyContent: "center",
  },
  formGrid: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(8),
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
}));

function Task({ match }) {
  const classes = useStyles();
  const [redirect, setRedirect] = useState(false);
  const history = useHistory({});

  var [model, setModel] = useState({
    macaddress: isConnected,
  });

  useEffect(() => {
    if (!isLogged) {
      setRedirect(true);
      alert("Faca o login e sincronize o QrCode para ter acesso as anotacoes");
    }
    if (isLogged && !isConnected) {
      setRedirect(true);
      alert("Sincronize o QrCode para ter acesso as anotacoes");
    }

    if (match.params.id != undefined) {
      LoadTaskDetails();
    }
  }, 1);

  function updatedModel(e) {
    setModel({
      ...model,
      [e.target.name]: e.target.value,
    });
  }

  async function Save() {
    if (!model.macaddress) return alert("Necessaria sincronizacao");
    if (!model.title) return alert("Informe um titulo");
    else if (!model.description) return alert("Informe a descrição");
    else if (!model.when) return alert("Informe a data");
    if (match.params.id) {
      await api
        .put(`/task/${match.params.id}`, model)
        .then(() => setRedirect(true));
    } else {
      await api.post("/task", model).then(() => setRedirect(true));
    }
  }

  async function Remove() {
    const res = window.confirm("Deseja realmente deletar a anotação?");
    if (res) {
      await api
        .delete(`/task/${match.params.id}`)
        .then(() => setRedirect(true));
    }
  }

  async function LoadTaskDetails() {
    await api.get(`/task/${match.params.id}`).then((response) => {
      setModel({
        macaddress: isConnected,
        title: response.data.title,
        description: response.data.description,
        when: format(new Date(response.data.when), "yyyy-MM-dd"),
        done: response.data.done,
      });
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    Save();
  }

  return (
    <S.Container>
      {redirect && <Redirect to="/" />}
      <Drawer />
      <Form onSubmit={onSubmit}>
        <FormControl className={classes.form}>
          <Typography variant="h5" className={classes.formTitle}>
            New note
            {/* {match.params.id ? "Edit note" : "New note"} */}
          </Typography>

          <FormGroup>
            <TextField
              type="text"
              id="title"
              name="title"
              variant="outlined"
              style={{ margin: 8 }}
              placeholder="Ex: My note"
              onChange={(e) => updatedModel(e)}
              value={model.title}
            />
          </FormGroup>

          <FormGroup>
            <TextField
              type="text"
              id="description"
              name="description"
              variant="outlined"
              style={{ margin: 8 }}
              placeholder="Ex: Buy cookies"
              multiline
              rows={4}
              onChange={(e) => updatedModel(e)}
              value={model.description}
            />
          </FormGroup>

          <FormGroup>
            <TextField
              id="when"
              name="when"
              type="date"
              variant="outlined"
              style={{ margin: 8 }}
              onChange={(e) => updatedModel(e)}
              value={model.when}
            />
          </FormGroup>

          <FormGroup>
            <Select
              name="done"
              style={{ margin: 8 }}
              onChange={(e) => updatedModel(e)}
              value={model.done}
              variant="outlined"
              style={{ margin: 8 }}
            >
              <option name="done" value={1}>
                Feito
              </option>
              <option name="done" value={0}>
                À fazer
              </option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Button
              style={{ margin: 8 }}
              variant="contained"
              color="primary"
              onClick={onSubmit}
            >
              Save
            </Button>
            <Button
              onClick={Remove}
              style={{ margin: 8 }}
              variant="contained"
              color="secondary"
            >
              Delete
            </Button>
            <Button
              onClick={() => setRedirect(true)}
              style={{ margin: 8 }}
              variant="contained"
              color="default"
            >
              Voltar
            </Button>
          </FormGroup>
        </FormControl>
      </Form>
      );
    </S.Container>
  );
}

export default Task;
