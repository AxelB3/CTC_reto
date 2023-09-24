"use client"; // Esto es para poder utilizar el componente a lo largo del proyecto.

// Importaciones de liberias necesarias para crear el card
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { SlLike } from "react-icons/sl";
import Swal from "sweetalert2";

function CustomCard({ isCreationMode, setIsCreationMode, data }) {
  const [inputType, setInputType] = useState("text");
  const [task, setTask] = useState({
    title: null,
    description: null,
    creator: null,
    state_id: null,
    date: null,
  });
  
  //AQUI SE UTILIZA PARA TRAER TODOS LOS ESTADOS DE LA REPUBLICA
  //DE ESTA MANERA LO PODREMOS UTILIZAR EN UN SELECT COMO OPCIONES
  useEffect(() => {
    // rolesService.getRoles(setRoles, () => {
    //   Swal.fire("Error", "Ha ocurrido un error al cargar los roles", "error");
    // });
  }, []);

  // Función handleFocus que cambia el tipo de entrada a "date" cuando se enfoca en un campo de fecha.
  const handleFocus = () => {
    setInputType("date");
  };

  // Función handleBlur que cambia el tipo de entrada a "text" cuando se desenfoca un campo de fecha.
  const handleBlur = () => {
    setInputType("text");
  };

  const mexStates = [];

  // Funcion handleChange que reecibe un evento de un input para cambia el valor de un campo de entrada.
  const handleChange = (event) => {
    const { name, value } = event.target;
    // Actualiza el estado task con el nuevo valor del campo de entrada.
    setTask({ ...task, [name]: value });
  };

  const createNewTask = async () => {
    Swal.fire({
      title: "Creación",
      text: "¿Desea guardar la tarea?",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return tareasService.create(login).catch((error) => {
          Swal.showValidationMessage(`Request failed: ${error.message}`);
        });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `${result.value.login}'s avatar`,
          imageUrl: result.value.avatar_url,
        });
      }
    });
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
        setIsCreationMode(false)
      }
    });
  };

  return (
    <Card className="W-100">
      <Card.Body>
        {isCreationMode ? (
          <div className="d-flex flex-column gap-3 justify-content-center align-items-center">
            <Card.Title>Nueva Tarea</Card.Title>
            <Form.Control
              type="text"
              name="title"
              placeholder="Título"
              onChange={handleChange}
            />
            <Form.Control
              type={inputType}
              name="date"
              placeholder="Fecha"
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <Form.Select
              name="state_id"
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
            <Form.Control
              type="text"
              name="creator"
              placeholder="Nombre del Creador"
              onChange={handleChange}
            />
            <Form.Control
              as="textarea"
              name="description"
              rows={3}
              placeholder="Descripción"
              onChange={handleChange}
            />

            <div className="d-flex gap-3">
              <Button onClick={createNewTask}>Guardar</Button>
              <Button onClick={cancelDialog} variant="danger">Cancelar</Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3 gap-5">
              <span className="d-flex flex-column gap-2">
                <Card.Title className="my-auto">{data.title}</Card.Title>
                <Card.Subtitle>{data.creator}</Card.Subtitle>
              </span>

              <span className="d-flex flex-column">
                <label>{data.date}</label>
                <label className="text-end">{data.state}</label>
              </span>
            </div>
            <Card.Text>{data.description}</Card.Text>
            <span className="d-flex justify-content-between align-items-center mt-4">
              <SlLike />
              <label>{data.likes}</label>
            </span>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default CustomCard;
