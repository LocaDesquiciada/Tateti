const IMG_EQUIS = "cruz.png";
const IMG_CIRCULO = "circulo.png";
const CIRCULO = 0;
const EQUIS = 1;
var LISTADO_CASILLEROS = document.querySelectorAll("Casillero");
var TABLERO = {

	filas: [],
	columnas: [],
	diagonales: []
};

var Casillero = {

	ocupado: -1,
	id: ""
};

var Juego = {

	img: [IMG_CIRCULO, IMG_EQUIS],
};

function obtener_jug_inicial() {

	Juego.jug_actual = Juego.img[Math.floor(Math.random() * 2)];
}

function inicializar_tablero() {	
	
	TABLERO.columnas = [];
	TABLERO.filas = [];
	TABLERO.diagonales = [];	

	LISTADO_CASILLEROS.forEach(
		function( elem ){
		
			elem.style.backgroundImage = "url('')";
			elem.onclick = jugar;	
		}
	); 
}

empezar.onclick = function inicializar() {

	obtener_jug_inicial();
	inicializar_tablero();
	simbolo_turno.src = Juego.jug_actual;
}
	
reiniciar.onclick = function reiniciar_tablero() {

	inicializar_tablero();
	simbolo_turno.src = "";
}

function verificar_fin_del_juego() {

	//diagonales
	if ((TABLERO.diagonales[0] == TABLERO.diagonales[4]) == TABLERO.diagonales[8]) return true;
	if ((TABLERO.diagonales[2] == TABLERO.diagonales[4]) == TABLERO.diagonales[6]) return true;

	//Columnas
	if ((TABLERO.columnas[0] == TABLERO.columnas[3]) == TABLERO.columnas[6]) return true;
	if ((TABLERO.columnas[1] == TABLERO.columnas[4]) == TABLERO.columnas[7]) return true;
	if ((TABLERO.columnas[2] == TABLERO.columnas[5]) == TABLERO.columnas[8]) return true;

	//Filas
	if ((TABLERO.filas[0] == TABLERO.filas[1]) == TABLERO.filas[2]) return true;
	if ((TABLERO.filas[3] == TABLERO.filas[4]) == TABLERO.filas[5]) return true;
	if ((TABLERO.filas[6] == TABLERO.filas[7]) == TABLERO.filas[8]) return true;

	return false;
	
}

// 123 => 012
// 456 => 345
// 789 => 678
function llenar_tablero(casilla) {

	var pos = (parseInt(casilla.id.slice(1,2)) - 1);

	var n;
	if (Juego.jug_actual == IMG_EQUIS ) {
		n = 1;
	} else if (Juego.jug_actual == IMG_CIRCULO){
		n = 0;
	}

	TABLERO.columnas[pos] = n;
	TABLERO.filas[pos] = n;
	TABLERO.diagonales[pos] = n;
}

function jugar() {

	this.style.backgroundImage = "url('"+ Juego.jug_actual + "')";
	this.style.backgroundSize = "100%";
	this.style.backgroundRepeat = "no-repeat";
	this.style.backgroundOrigin = "content-box";
	this.onclick = false;

	Juego.jug_actual = Juego.img[1 - Juego.img.indexOf(Juego.jug_actual)];
	simbolo_turno.src = Juego.jug_actual;
	llenar_tablero(this);
	
	if (verificar_fin_del_juego()) {

		LISTADO_CASILLEROS.forEach(
			function( elem ){
				elem.onclick = false;		
			}
	); 
		alert("WINNER WINNER CHICKER DINNER!");
	}
}

