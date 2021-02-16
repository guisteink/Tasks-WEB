import React from "react";
import * as S from "./styles";

import Drawer from "../../components/Drawer";
import TaskForm from "../../components/TaskForm";

function Task() {

  return (
    <S.Container>
      <Drawer />
      <TaskForm />
    </S.Container>
  );
}

export default Task;
