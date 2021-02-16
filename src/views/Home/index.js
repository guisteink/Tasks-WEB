import React from "react";
import * as S from "./styles";

import TaskCard from "../../components/TaskCard";
import Drawer from "../../components/Drawer"

function Home() {
  return (
    <S.Container>
      <Drawer />
      <TaskCard />
    </S.Container>
  );
}

export default Home;
