
//chapuza variables globales para guardar datos
var precioFactura = 0;
var clientesMap =  new Map();
var cliente = {nombre: "name1",
			apellido1: "ape1",
			apellido2: "ape2"};
var empresa = null;

$(window).on("load", function() {
	$("#btnEmpresa").on("click", function() {
		contenido("contenidoEmpresa");
		activarBoton("btnEmpresa");
	});
	$("#btnClientes").on("click", function() {
		contenido("contenidoClientes");
		activarBoton("btnClientes");
	});
	$("#btnCobrosPagos").on("click", function() {
		contenido("contenidoCobrosPagos");
		activarBoton("btnCobrosPagos");
	});
	$("#btnFacturacion").on("click", function() {
		contenido("contenidoFacturacion");
		activarBoton("btnFacturacion");
	});
	$("#guardarEmpresa").on("click", function() {
		validarEmpresa();
	});
	$("#btnAddCliente").on("click", function() {
		if (validarClientes()) addCliente(document.getElementById("clienteInputNombre").value, document.getElementById("clienteInputTelefono").value);
	});
	$("#btnValidarCobrosPagos").on("click", function() {
		if(validarCobrosPagos()) movimiento(document.getElementById("precio").value, document.getElementById("unidades").value, document.getElementById("mes").value, document.getElementById("mov").value);
	});
	$("#btnEmpresaYProducto").on("click", function() {
		addEmpresaYProducto("tablaInfo", "tablaProductos");
	});
	$("#btnBorrarFactura").on("click", function() {
		borrarFactura();
	});
	





});
//boton activo de otro css
function activarBoton(id) {
	cambiaBtn(id, "btnActivo");
	desactivarBotones(id);
}

function cambiaBtn(id, clase) {
	document.getElementById(id).classList = clase;
}

function desactivarBotones(id) {
	var btns = document.getElementById("menuNav").getElementsByTagName("button");
	for (var i = 0; i < btns.length; i++) {
		if(btns[i].id != id) cambiaBtn(btns[i].id, "btnNav");
	}
}

function contenidoClear() {
	var x = document.getElementsByClassName("contenido");
		for (var i = 0; i < x.length; i++) {
			x[i].style.display = "none";
		}
}
function contenido(id) {
	contenidoClear();
	document.getElementById(id).style.display = "flex";
}
/** clientes**/
function addCliente(nombre, telefono) {
	addClienteLoad(nombre, telefono);
	//añadir a la VG clientes
	var x = nombre.split(" ");
	var clienteInfo = {
		nombre: x[0],
		apellido1: x[1],
		apellido2: x[2],
	};
	clientesMap.set(parseInt(telefono), clienteInfo);
}
function cargarClientes() {
	/*clientes.forEach(function(cliente) {
		addClienteLoad(cliente.nombre + " " + cliente.apellido1 + " " + cliente.apellido2);
	});*/
	for (var [key, value] of clientesMap.entries()) {
		addClienteLoad(value.nombre + " " + value.apellido1 + " " + value.apellido2, key);
	}
}
function addClienteLoad(nombre, telefono) {
	var lista = document.getElementById("listaClientes");
	var elementoLista = document.createElement("li");
	var nombreCliente = document.createTextNode(nombre + " / " + telefono);
	// boton borrar fila
	var boton = document.createElement("button");
	boton.appendChild(document.createTextNode("x"));		
	boton.style.float = "right";	
	boton.onclick = function() {borrarFila(this)};
	//meter en un span nombreCliente y boton
	var span = document.createElement("span");
	span.appendChild(nombreCliente);
	span.appendChild(boton);
	elementoLista.appendChild(span);
	lista.appendChild(elementoLista);
}
//** fin clientes**/
function guardarEmpresa(empresa) {
	var datosEmpresa = empresa.split(" ");
	this.empresa = {nombre: datosEmpresa[0],
					telefono: datosEmpresa[1], 
					ciudad: datosEmpresa[2],
					calle: datosEmpresa[3],
					numero: datosEmpresa[4],
					codigoPostal: datosEmpresa[5]
	};
	loadEmpresa();
}

function loadEmpresa() {
	if (empresa != null) {
		document.getElementById("nombreEmpresa").value = empresa.nombre;
		document.getElementById("telefono").value = empresa.telefono;
		document.getElementById("ciudad").value = empresa.ciudad;
		document.getElementById("calle").value = empresa.calle;
		document.getElementById("numero").value = empresa.numero;
		document.getElementById("codigoPostal").value = empresa.codigoPostal;

	}
}

function borrarFila(btn) {
	var li = btn.parentNode.parentNode;
	li.parentNode.removeChild(li);

}
/***diagrama de barras GASTOS***/
function drawDiagramaBarras1() {
	var ctx = document.getElementById("diagramaBarras1");
	var myChart = new Chart(ctx, {
	    type: 'bar',
	    data: {
	        labels: ["Enero", "Febrero", "Marzo"],
	        datasets: [{
	            label: 'Gastos',
	            data: [12, 13, 5],
	            backgroundColor: [
	                'rgba(54, 162, 235, 0.2)',
	                'rgba(54, 162, 235, 0.2)',
	                'rgba(54, 162, 235, 0.2)',
	            ],
	            borderColor: [
	                'rgba(54, 162, 235, 1)',
	                'rgba(54, 162, 235, 1)',
	                'rgba(54, 162, 235, 1)',
	            ],
	            borderWidth: 1
	        }]
	    },
	    options: {
	        scales: {
	            yAxes: [{
	                ticks: {
	                    beginAtZero:true
	                }
	            }]
	        },
	        title: {
	            display: false,
	            text: 'Gastos',
        	},
        	legend: {
        		display: false,
        	},

	    },
	    plugins: [{
	    	beforeInit: function(diagrama) {
	    		diagrama.data.datasets[0].backgroundColor[1] = "rgba(200,0,0,0.2)";
				diagrama.data.datasets[0].borderColor[1] = "rgba(200,0,0,1)"
	    	}
	    }]

	});
}
/***diagrama de barras INGRESOS***/
function drawDiagramaBarras2() {
	var ctx = document.getElementById("diagramaBarras2");
	var myChart = new Chart(ctx, {
	    type: 'bar',
	    data: {
	        labels: ["Enero", "Febrero", "Marzo"],
	        datasets: [{
	            label: 'Gastos',
	            data: [20, 17, 5],
	            backgroundColor: [
	                'rgba(54, 162, 235, 0.2)',
	                'rgba(54, 162, 235, 0.2)',
	                'rgba(54, 162, 235, 0.2)',
	            ],
	            borderColor: [
	                'rgba(54, 162, 235, 1)',
	                'rgba(54, 162, 235, 1)',
	                'rgba(54, 162, 235, 1)',
	            ],
	            borderWidth: 1
	        }]
	    },
	    options: {
	        scales: {
	            yAxes: [{
	                ticks: {
	                    beginAtZero:true
	                }
	            }]
	        },
	        title: {
	            display: false,
	            text: 'Gastos',
        	},
        	legend: {
        		display: false,
        	},

	    },
	    plugins: [{
	    	beforeInit: function(diagrama) {
	    		diagrama.data.datasets[0].backgroundColor[0] = "rgba(0,200,0,0.2)";
				diagrama.data.datasets[0].borderColor[0] = "rgba(0,200,0,1)"
	    	}
	    }]

	});
}

//tipo movimiento gast/ingreso
function movimiento(cantidad, unidades, mes, mov) {
	if (mov == "Gasto") gasto(cantidad, unidades, mes);
	else if (mov == "Ingreso") ingreso(cantidad, unidades, mes);
}
//actualizar diagrama de barras gastos
function gasto(cantidad, unidades, mes) {
	var diagrama = null;
	Chart.helpers.each(Chart.instances, function(instance){
	  if (instance.chart.canvas.id == "diagramaBarras1")
	  		diagrama = instance.chart;
	});
	if (diagrama != null) {		
		//sumar al mes la cantidad
		var id_mes = null;
		for(var i = 0; i < diagrama.data.labels.length; i++) {
			if (mes == diagrama.data.labels[i]) id_mes = i;
		}	
		diagrama.data.datasets[0].data[id_mes] = parseInt(diagrama.data.datasets[0].data[id_mes], 10) + parseInt(cantidad, 10)*parseInt(unidades, 10);

		//poner verde el valor mas alto
		var maximo = diagrama.data.datasets[0].data[0];
		var id = 0;
		var k = 0;
		diagrama.data.datasets[0].data.forEach(function(data){
			if (maximo <= data) {
				maximo = data;
				id = k;
				if (k > 0) setColorDefault(diagrama, k - 1);
				else if (k == 0) {
					setAllColorDefault(diagrama.data.datasets[0]);
				}
			}
			k++;
		});
		diagrama.data.datasets[0].backgroundColor[id] = "rgba(200, 0,0,0.2)";
		diagrama.data.datasets[0].borderColor[id] = "rgba(200,0,0,1)"
		//fin poner verde el valor mas alto
		diagrama.update();	
	}
	else alert("diagrama null");
}
//actalizar diagrama de barras ingresos
function ingreso(cantidad, unidades, mes) {
	var diagrama = null;
	Chart.helpers.each(Chart.instances, function(instance){
	  if (instance.chart.canvas.id == "diagramaBarras2")
	  		diagrama = instance.chart;
	});
	if (diagrama != null) {		
		//sumar al mes la cantidad
		var id_mes = null;
		for(var i = 0; i < diagrama.data.labels.length; i++) {
			if (mes == diagrama.data.labels[i]) id_mes = i;
		}	
		diagrama.data.datasets[0].data[id_mes] = parseInt(diagrama.data.datasets[0].data[id_mes], 10) + parseInt(cantidad, 10)*parseInt(unidades, 10);

		//poner verde el valor mas alto
		var maximo = diagrama.data.datasets[0].data[0];
		var id = 0;
		var k = 0;
		diagrama.data.datasets[0].data.forEach(function(data){
			if (maximo <= data) {
				maximo = data;
				id = k;
				if (k > 0) setColorDefault(diagrama, k - 1);
				else if (k == 0) {
					setAllColorDefault(diagrama.data.datasets[0]);
				}
			}
			k++;
		});
		diagrama.data.datasets[0].backgroundColor[id] = "rgba(0,200,0,0.2)";
		diagrama.data.datasets[0].borderColor[id] = "rgba(0,200,0,1)"
		//fin poner verde el valor mas alto
		diagrama.update();	
	}
	else alert("diagrama null");	
	
}
//CAMBIAR color barra default tras dejar de ser maximo
function setAllColorDefault(dataset) {
	for(var i = 0; i < dataset.backgroundColor.length; i++) {
		dataset.backgroundColor[i] = "rgba(54, 162, 235, 0.2)";
		dataset.borderColor[i] = "rgba(54, 162, 235, 1)";
	}
}
function setColorDefault(diagrama, i) {	
	diagrama.data.datasets[0].backgroundColor[i] = "rgba(54, 162, 235, 0.2)";
	diagrama.data.datasets[0].borderColor[i] = "rgba(54, 162, 235, 1)"
}
/****tests***/
//actalizar diagrama de barras ingresos
function ingresoTest() {
	var diagrama = null;
	Chart.helpers.each(Chart.instances, function(instance){
	  if (instance.chart.canvas.id == "diagramaBarras2")
	  		diagrama = instance.chart;
	});
	if (diagrama != null) {
		//poner verde el valor mas alto
		var maximo = diagrama.data.datasets[0].data[0];
		var id = 0;
		var i = 1;
		diagrama.data.datasets.forEach(function(dataSet){
			if (maximo < dataSet.data[i]) {
				maximo = dataSet.data[i];
				id = i;
			}
			i++;
		});
		diagrama.data.datasets[0].backgroundColor[id] = "rgba(0,200,0,0.2)";
		diagrama.data.datasets[0].borderColor[id] = "rgba(0,200,0,1)"
		//fin poner verde el valor mas alto
		diagrama.update();	
	}
	else alert("diagrama null");
	
	
}

//Añadir Empresa y Productos

function getValueFormEmpresa(i) {	
	var form = document.getElementById("formEmpresa");
	var arrayInput = form.getElementsByTagName("input");
	return arrayInput[i].value;

}

function addEmpresa(idTable) {
	var hijosTabla = document.getElementById(idTable).childNodes;
	var hijosTbody = hijosTabla[1].childNodes;
	var parametroTramposo = 0;
	for (var i = 0; i < hijosTbody.length; i+=2) {
		var tr = hijosTbody[i].childNodes;
		for (var j = 1; j < tr.length; j+=2) {
			var td = tr[j];
			parametroTramposo = i+j;
			if(j == 1) parametroTramposo -= 1;
			else parametroTramposo -= 2;
			var value = getValueFormEmpresa(parametroTramposo);			
			td.innerHTML= "";
			td.appendChild(document.createTextNode(value));
		}
	}
}


function addProducto(idTable) {
	var producto = document.getElementById("Producto").value;
	var precio = document.getElementById("Precio").value;
	if(precio != "" && producto != "") {
		var newTdProducto = document.createElement("td");
		newTdProducto.appendChild(document.createTextNode(producto));
		var newTdPrecio = document.createElement("td");
		newTdPrecio.appendChild(document.createTextNode(precio));
		var tr = document.createElement("tr");
		var boton = document.createElement("button");
		boton.onclick = function() {borrarTr(this)};
		boton.innerHTML= "X";
		tr.appendChild(newTdProducto);
		tr.appendChild(newTdPrecio);
		tr.appendChild(boton);
		var tBody = document.getElementById(idTable).childNodes[1];
		tBody.appendChild(tr);
		precioFactura += (+precio);		actualizarPrecio();
	}
	else {
		alert("Necesitas un nombre de producto y un precio para añadir un producto nuevo");
	}

}

function borrarTr(btn) {
	var tr = btn.parentNode;
	var precio = tr.childNodes[1];
	precioFactura -= (+precio.childNodes[0].textContent);
	tr.parentNode.removeChild(tr);
	actualizarPrecio();

}
function borrarFactura() {
	document.getElementById("tablaInfo").childNodes[1].innerHTML="<tbody><tr> <td id='facturacionNombreEmpresa'>Nombre Emp</td> <td id='facturacionNIF'>NIF</td> </tr> <tr> <td id='facutracionDireccion'>Direccion</td> <td id='facturacionCliente'>Cliente</td> </tr> </tbody>";
	document.getElementById("tablaProductos").childNodes[1].innerHTML="<tbody><tr><th>Nombre Producto</th><th>Precio</th></tr></tbody>";
	precioFactura = 0;
	actualizarPrecio();



}

function addEmpresaYProducto(idTableInfo, idTableProductos) {
	addEmpresa(idTableInfo);
	addProducto(idTableProductos);
}

function actualizarPrecio() {
	var precision = 2;
	var i = precioFactura;
	while(i >= 1) {
		i = i/10;
		precision = precision + 1;
	}
	var preu = precioFactura.toPrecision(precision);
	if (preu < 0.01) preu = 0;
	document.getElementById("tdPrecioTotal").innerHTML = "Precio Total : " + preu;
}




///// validaiton script

function validarEmpresa() {
	if (document.getElementById("nombreEmpresa").value == "") alert("Por favor, introduzca un nombre de empresa");
	else if (document.getElementById("telefono").value == "") alert("Por favor, introduzca un número de teléfono");
	else if (document.getElementById("ciudad").value == "") alert("Por favor, introduzca un nombre de una ciudad");
	else if (document.getElementById("calle").value == "") alert("Por favor, introduzca un nombre de una calle");
	else if (document.getElementById("numero").value == "") alert("Por favor, introduzca un número de calle");
	else if (document.getElementById("codigoPostal").value == "") alert("Por favor, introduzca CP");
}


function validarCobrosPagos() {
	console.log("erer");
	if (document.getElementById("unidades").value == "") {
		alert("Por favor, introduzca el número de unidades"); return false;
	}
	else if (document.getElementById("precio").value == "") {
		alert("Por favor, introduzca un precio");
		return false;
	}
	return true;
}

function validarClientes() {
	if (document.getElementById("clienteInputNombre").value == "") {
		alert("Por favor, introduzca el nombre del cliente"); return false;
	}
	else if (document.getElementById("clienteInputTelefono").value == "") {
		alert("Por favor, introduzca un número de cliente");
		return false;
	}
	return true;

}