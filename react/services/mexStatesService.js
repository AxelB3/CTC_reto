import http from "../services/axiosService.js";
import Swal from "sweetalert2";

class mexStatesService {
  getMexStates(callback, error) {
    Swal.fire({
      title: "Cargando...",
      didOpen: () => {
        Swal.showLoading();
      },
    })

    http
      .get("getMexStates")
      .then((response) => {
        Swal.close()
        callback(response.data);
      })
      .catch((response) => {
        error(response.data);
          Swal.hideLoading();
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un error al cargar los estados de México.",
          });
      });
  }
}
export default new mexStatesService();
