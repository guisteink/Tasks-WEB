import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl } from "@material-ui/core";
import { FormGroup } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import api from "../../services/api";

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
}));

export default function TaskForm() {
  const classes = useStyles();

  const [lateCount, setLateCount] = useState();
  const [type, setType] = useState();
  const [id, setId] = useState();
  const [done, setDone] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [when, setWhen] = useState();

  async function Save() {
    console.log("Entrou no save");
    await api
      .post("/task", {
        macaddress: "11:11:11:11:11:11",
        type,
        title,
        description,
        when,
      })
      .then(() => alert("Note saved!"));
      setTitle("");
      setDescription("");
      setType("");
      setWhen("");
      setDone("");
  }

  return (
    <FormControl className={classes.form}>
      <Typography variant="h5" className={classes.formTitle}>
        New note
      </Typography>

      <FormGroup>
        <TextField
          variant="outlined"
          label="Title"
          style={{ margin: 8 }}
          placeholder="Ex: My note"
          fullWidth
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </FormGroup>

      <FormGroup>
        <TextField
          variant="outlined"
          label="Description"
          style={{ margin: 8 }}
          placeholder="Ex: Buy cookies"
          fullWidth
          multiline
          rows={4}
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </FormGroup>

      <FormGroup>
        <Select
          style={{ margin: 8 }}
          variant="outlined"
          fullWidth
          onChange={(e) => setType(e.target.value)}
          value={type}
        >
          <MenuItem value={1}>Work</MenuItem>
          <MenuItem value={2}>Recreation</MenuItem>
          <MenuItem value={3}>Home</MenuItem>
        </Select>
      </FormGroup>

      <FormGroup>
        <TextField
          type="datetime-local"
          variant="outlined"
          style={{ margin: 8 }}
          type="date"
          fullWidth
          onChange={(e) => setWhen(e.target.value)}
          value={when}
        />
      </FormGroup>

      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={done}
              onChange={() => setDone(!done)}
              color="primary"
              name="Done"
              variant="outlined"
              fullWidth
            />
          }
          label="Done"
        />
      </FormGroup>

      <FormGroup>
        <Button
          fullWidth
          style={{ margin: 8 }}
          variant="contained"
          color="primary"
          onClick={Save}
        >
          Create
        </Button>
        <Button
          fullWidth
          style={{ margin: 8 }}
          variant="contained"
          color="secondary"
        >
          Cancel
        </Button>
      </FormGroup>
    </FormControl>
  );
}
