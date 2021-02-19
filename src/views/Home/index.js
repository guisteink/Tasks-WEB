import React, { useEffect, useState } from "react";
import * as S from "./styles";

import Drawer from "../../components/Drawer";
import NoteCard from "../../components/NoteCard";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { parseISO, formatDistance } from "date-fns";
import { Redirect } from "react-router-dom";

import api from "../../services/api";
import isConnected from "../../utils/isConnected";
import isLogged from "../../utils/isLogged";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(8),
  },
  filterCard: {
    paddingTop: theme.spacing(8),
    width: "10vw",
  },
  link: {
    textDecoration: "none",
    color: "black",
  },
}));

function Home() {
  const classes = useStyles();
  const [filter, setFilter] = useState("all");
  const [tasks, setTasks] = useState([]);
  const [redirect, setRedirect] = useState(false);

  async function loadTasks() {
    await api
      .get(`/task/filter/${filter}/${isConnected}`)
      .then((response) => {
        setTasks(response.data);
      });
  }

  function daysToTask(d) {
    return formatDistance(parseISO(d), new Date());
  }

  useEffect(() => {
    if (!isLogged) {
      setRedirect(true);
      loadTasks();
      alert("Faca o login");
    }
    if (isLogged && !isConnected) {
      setRedirect(true);
      loadTasks();
      alert("Sincronize o QrCode para ter acesso as anotacoes");
    }
    loadTasks();
  }, [filter]);

  return (
    <S.Container>
      {redirect && <Redirect to="/qrcode" />}
      <Drawer />
      <React.Fragment>
        <main>
          <Container className={classes.cardGrid} maxWidth="md">
            <div className={classes.div}>
              <ButtonGroup
                className={classes.filterCard}
                color="primary"
                aria-label="outlined primary button group"
              >
                <Button onClick={() => setFilter("all")}>All</Button>
                <Button onClick={() => setFilter("today")}>Today</Button>
                <Button onClick={() => setFilter("late")}>Late</Button>
              </ButtonGroup>
            </div>

            <Grid className={classes.cardGrid} container spacing={4}>
              {tasks.map((t) => (
                <NoteCard
                  key={t._id}
                  id={t._id}
                  title={t.title}
                  description={t.description}
                  when={t.when}
                  done={t.done}
                ></NoteCard>
              ))}
            </Grid>
          </Container>
        </main>
      </React.Fragment>
    </S.Container>
  );
}

export default Home;
