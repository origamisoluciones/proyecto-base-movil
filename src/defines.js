/** @const {string} URL_API Url of the API */
const URL_API = 'https://proyectobase.origamisoluciones.com/api/';

/** @const {string} API_TOKEN API token */
const API_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJhY2Nlc3MiOiJjdzg5TzVuQl8xcUI0Lkdqay1RcyIsImlkIjpudWxsfQ.IodsKAZvyeex_Eu0atzx545Pd2F5GFAYCJsvJmXOgHQfOaCrRZV6WPtWDdhWjJMLdpvJS11MFncy-f2BWze_EQ';

/** @const {string} DATATABLES_LANGUAGE Datatables language */
const DATATABLES_LANGUAGE = {
	"sProcessing":     "Procesando...",
	"sLengthMenu":     "Mostrar _MENU_ registros",
	"sZeroRecords":    "No se encontraron resultados",
	"sEmptyTable":     "Ningún dato disponible en esta tabla",
	"sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
	"sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
	"sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
	"sInfoPostFix":    "",
	"sSearch":         "Buscar:",
	"sUrl":            "",
	"sInfoThousands":  ",",
	"sLoadingRecords": "Cargando...",
	"oPaginate": {
		"sFirst":    "Primero",
		"sLast":     "Último",
		"sNext":     "Siguiente",
		"sPrevious": "Anterior"
	},
	"oAria": {
		"sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
		"sSortDescending": ": Activar para ordenar la columna de manera descendente"
	}
};

/** @const {string} ERROR_MESSAGE Error message to display */
const ERROR_MESSAGE = 'Ha ocurrido un error. Contacta con el equipo de soporte para resolver el problema.';

/** @const {string} WARNING_MESSAGE Error message to display */
const WARNING_MESSAGE = 'Faltan campos por completar o tienen un formato incorrecto.';

export default {
    URL_API,
    API_TOKEN,
    DATATABLES_LANGUAGE,
	ERROR_MESSAGE,
	WARNING_MESSAGE
}