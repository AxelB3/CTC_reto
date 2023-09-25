"use client"; // Esto es para poder utilizar el componente a lo largo del proyecto.

import mexStatesService from "@/services/mexStatesService";
import tasksService from "@/services/tasksService";
// Importaciones de liberias necesarias para crear el card
import React, { useState, useEffect } from "react";
import { Button, useAccordionButton } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { SlLike, SlTrash } from "react-icons/sl";
import Swal from "sweetalert2";

function CustomCard({ isCreationMode, setIsCreationMode, data, setTasks }) {
  const [inputType, setInputType] = useState("text");
  const [dataTask, setDataTask] = useState(data);
  const [disableBtnLike, setDisableBtnLike] = useState(false);
  const [mexStates, setMexStates] = useState(null);
  const [task, setTask] = useState({
    title: null,
    description: null,
    name_creator: null,
    mexstate_id: null,
    date: null,
    is_title_valid: false,
    is_date_valid: false,
    is_name_creator_valid: false,
    is_description_valid: false,
    is_mexstate_id_valid: false,
  });

  const error = () => {
    setIsCreationMode(false);
  };

  //Trae todos los estados de la republica si esta en modo creacion
  useEffect(() => {
    if (isCreationMode) {
      mexStatesService.getMexStates(setMexStates, error);
    }
  }, []);

  useEffect(() => {
    // Actualizar dataTask cuando data cambia
    setDataTask(data);
  }, [data]);

  // Función handleFocus que cambia el tipo de entrada a "date" cuando se enfoca en un campo de fecha.
  const handleFocus = () => {
    setInputType("date");
  };

  // Función handleBlur que cambia el tipo de entrada a "text" cuando se desenfoca un campo de fecha.
  const handleBlur = () => {
    setInputType("text");
  };

  // Funcion handleChange que reecibe un evento de un input para cambia el valor de un campo de entrada.
  const handleChange = (event) => {
    const { name, value } = event.target;

    //Verificar si el valor no es ni vacío ni nulo
    const isNotEmpty = value !== null && value.trim() !== "";

    //Validación por cada campo del formulario
    setTask({ ...task, [name]: value, [`is_${name}_valid`]: isNotEmpty });
  };

  const createNewTask = async () => {
    tasksService.createNew(
      task,
      (data) => {
        setTasks(data);
        setIsCreationMode(false);
      },
      Error
    );
  };

  const cancelDialog = () => {
    //MENSAJE EMERGENTE PARA REAFIRMAR QUE SE VA A
    //CANCELAR EL PROCESO DE GUARDADO
    Swal.fire({
      title: "¿Desea cancelar el proceso?",
      text: "Se eliminarán los datos ingresados",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Aceptar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        setIsCreationMode(false);
      }
    });
  };

  const updateLikes = async (task_id, number_likes) => {
    setDisableBtnLike(true);
    tasksService.updateLikes(
      { id: task_id, number_likes: number_likes + 1 },
      setDataTask,
      Error
    );
  };

  const deleteTask = async (task_id) => {
    tasksService.deleteTask(
      task_id,
      (data) => {
        setTasks(data);
      },
      Error
    );
  };

  return isCreationMode ? (
    <>
      {mexStates !== null && (
        <Card className="W-100">
          <Card.Body>
            <div className="d-flex flex-column gap-3 justify-content-center align-items-center">
              <Card.Title>Nueva Tarea</Card.Title>
              <Form.Control
                type="text"
                name="title"
                placeholder="Título"
                onChange={handleChange}
              />
              {task.is_title_valid == false && (
                <p className="errores w-100">El campo 'título' está vacio</p>
              )}
              <Form.Control
                type={inputType}
                name="date"
                placeholder="Fecha"
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {task.is_date_valid == false && (
                <p className="errores w-100">El campo 'fecha' está vacio</p>
              )}
              <Form.Select
                name="mexstate_id"
                placeholder="Estado"
                onChange={handleChange}
              >
                {mexStates.map((state, index) => {
                  return (
                    <option key={index} value={state.id}>
                      {state.name}
                    </option>
                  );
                })}
              </Form.Select>
              {(task.is_mexstate_id_valid == false || task.mexstate_id == null || parseFloat(task.mexstate_id) === 1) && (
                  <p className="errores w-100">El campo 'estado' no se ha seleccionado</p>
              )}
              <Form.Control
                type="text"
                name="name_creator"
                placeholder="Nombre del Creador"
                onChange={handleChange}
              />
              {task.is_name_creator_valid == false && (
                <p className="errores w-100">El campo 'nombre del creador' está vacio</p>
              )}
              <Form.Control
                as="textarea"
                name="description"
                rows={3}
                placeholder="Descripción"
                onChange={handleChange}
              />
              {task.is_description_valid == false && (
                <p className="errores w-100">El campo 'descripción' está vacio</p>
              )}

              <div className="d-flex gap-3">
                <Button onClick={createNewTask} disabled={!task.is_title_valid || !task.is_date_valid || !task.is_name_creator_valid || !task.is_description_valid || !task.is_mexstate_id_valid || parseFloat(task.mexstate_id) === 1 }>Guardar</Button>
                <Button onClick={cancelDialog} variant="danger">
                  Cancelar
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      )}
    </>
  ) : (
    <Card className="W-100">
      <Card.Body>
        <div>
          <div className="d-flex justify-content-between align-items-center mb-3 gap-5">
            <span className="d-flex flex-column gap-2">
              <Card.Title className="my-auto">{dataTask.title}</Card.Title>
              <Card.Subtitle>{dataTask.name_creator}</Card.Subtitle>
            </span>

            <span className="d-flex flex-column">
              <label>{dataTask.date}</label>
              <label className="text-end">{dataTask.name_state}</label>
            </span>
          </div>
          <Card.Text>{dataTask.description}</Card.Text>
          <span className="d-flex justify-content-between align-items-center mt-4">
            <Button
              variant="none"
              className="border-0"
              onClick={() => {
                updateLikes(dataTask.id, dataTask.number_likes);
              }}
              disabled={disableBtnLike}
            >
              <SlLike />
            </Button>
            {/* Si no se cuentan con like directamente se renderiza el boton de eliminar, en caso de tener aparece el numero de likes */}
            {dataTask.number_likes == 0 ? (
              <Button
                variant="none"
                className="border-0"
                onClick={() => {
                  deleteTask(dataTask.id);
                }}
              >
                <SlTrash />
              </Button>
            ) : (
              <label>{dataTask.number_likes}</label>
            )}
          </span>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CustomCard;
