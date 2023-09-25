import http from "../services/axiosService.js";
import Swal from "sweetalert2";

class tasksService {
  getTasks(callback, error) {
    Swal.fire({
      title: "Cargando...",
      didOpen: () => {
        Swal.showLoading();
      },
    });

    http
      .get("getTasks")
      .then((response) => {
        Swal.close();
        callback(response.data);
      })
      .catch(function (error) {
        if (error.response) {
          Swal.hideLoading();
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un error al cargar las tareas.",
          });
        }
      });
  }

  searchTasks(params, callback, error) {
    http
      .post("searchTasks", params)
      .then((response) => {
        callback(response.data);
      })
      .catch(function (error) {
        if (error.response) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un error al buscar las tareas.",
          });
        }
      });
  }

  createNew(params, callback, error) {
    Swal.fire({
      title: "Confirmación de guardado",
      text: "¿Desea guardar la tarea?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Si, guardar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Guardando...",
          didOpen: () => {
            Swal.showLoading();
          },
        });

        http
          .post("createNewTask", params)
          .then((response) => {
            Swal.close();
            Swal.fire({
              icon: "success",
              title: "Proceso Éxitoso",
              text: "Tarea guardada correctamente.",
            });
            callback(response.data);
          })
          .catch((response) => {
            error(response.data);
            Swal.hideLoading();
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Hubo un error al guardar la tarea.",
            });
          });
      }
    });
  }

  updateLikes(params, callback, error) {
    http
      .put("updateLikes", params)
      .then((response) => {
        callback(response.data);
      })
      .catch((response) => {
        error(response.data);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un error al agregar like a la tarea correspondiente.",
        });
      });
  }

  deleteTask(params, callback, error) {
    Swal.fire({
      title: "Confirmación de eliminación",
      text: "¿Desea eliminar la tarea?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Eliminando...",
          didOpen: () => {
            Swal.showLoading();
          },
        });

        http
          .delete(`deleteTask/${params}`)
          .then((response) => {
            Swal.close();
            Swal.fire({
              icon: "success",
              title: "Proceso Éxitoso",
              text: "Tarea eliminada correctamente.",
            });
            callback(response.data);
          })
          .catch((response) => {
            error(response.data);
            Swal.hideLoading();
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Hubo un error al eliminar la tarea.",
            });
          });
      }
    });
  }
}
export default new tasksService();
