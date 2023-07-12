
export const formatearFecha = (fecha: string ) => {

// Crear una nueva instancia de Date con la fecha actual
let fechaNueva = new Date(fecha);

const año = fechaNueva.getFullYear();
const mes = ("0" + (fechaNueva.getMonth() + 1)).slice(-2); // Los meses van de 0 a 11
const dia = ("0" + fechaNueva.getDate()).slice(-2);

const fechaFormateada = año + "-" + mes + "-" + dia;

return fechaFormateada.toString();

}