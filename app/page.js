"use client";

import styles from "./page.module.css";
import CustomCard from "@/components/Cards/Card";
import { Button, Row, Col } from "react-bootstrap";
import { useState } from "react";

export default function Home() {
  // Variable para poder manejar cuando se necesite crear un nuevo card
  const [newTask, setNewTask] = useState(false);
  
  // Funcion que cambia el estado de mi newTask cuando se necesite crear un nuevo card
  const CreateNewTask = () => {
    setNewTask(!newTask);
  };

  // Data inicial de un objeto task de ejemplo
  const taskData = {
    title: "Ejemplo de tarjeta",
    date: "10/09/2023",
    state: "Sinaloa",
    creator: "Usuario Ejemplo",
    description: "Esta es una tarjeta de ejemplo",
    likes: 5,
  };

  return (
    <main className={styles.main}>
      <div className={"p-3"}>
        {!newTask &&
          <Button onClick={CreateNewTask}>
          Crear Nueva Tarea
        </Button>
        }
      </div>

      {newTask && (
        <Row className="w-100 justify-content-center gap-3">
          <Col sm={8} md={6} xs={"auto"}>
          <CustomCard isCreationMode={newTask} setIsCreationMode={CreateNewTask}/>
        </Col>
        </Row>
      )}

      <Row className="w-100 justify-content-center gap-3">
        <Col sm={8} md={6} xs={"auto"}>
          <CustomCard data={taskData} />
        </Col>
        <Col sm={8} md={6} xs={"auto"}>
          <CustomCard data={taskData} />
        </Col>
      </Row>
    </main>
  );
}
