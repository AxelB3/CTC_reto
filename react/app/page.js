"use client";

import styles from "./page.module.css";
import CustomCard from "@/components/Cards/Card";
import { Button, Row, Col, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import tasksService from "@/services/tasksService";
import Swal from "sweetalert2";

export default function Home() {
  // Variable para poder manejar cuando se necesite crear un nuevo card
  const [newTask, setNewTask] = useState(false);
  const [tasks, setTasks] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filteredTasks, setFilteredTasks] = useState(null);

  //Trae todas las tareas existentes
  useEffect(() => {
    tasksService.getTasks(setTasks);
  }, []);

  useEffect(() => {
    if (tasks !== null) {
      tasksService.searchTasks({ filter: searchText }, (data) => {
        setTasks(data);
      });
    }
  }, [searchText]);

  // Funcion que cambia el estado de mi newTask cuando se necesite crear un nuevo card
  const CreateNewTask = () => {
    setNewTask(!newTask);
    setSearchText("");
  };

  return (
    <main className={styles.main}>
      <div className={"p-3"}>
        {!newTask && <Button onClick={CreateNewTask}>Crear Nueva Tarea</Button>}
      </div>

      {newTask && (
        <Row className="w-100 justify-content-center gap-3">
          <Col sm={8} md={6} xs={"auto"}>
            <CustomCard
              isCreationMode={newTask}
              setIsCreationMode={CreateNewTask}
              setTasks={setTasks}
            />
          </Col>
        </Row>
      )}

      <Row className="w-100 justify-content-center gap-3">
        {tasks &&
          <Col sm={8} md={6} xs={"auto"}>
            <Form.Control
              type="text"
              name="filter"
              placeholder="Buscar por título o estado"
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
          </Col>
        }
        {tasks?.map((task, index) => {
          return (
            <Col key={index} sm={8} md={6} xs={"auto"}>
              <CustomCard data={task} onChangeData={task} setTasks={setTasks}/>
            </Col>
          );
        })}
      </Row>
    </main>
  );
}
