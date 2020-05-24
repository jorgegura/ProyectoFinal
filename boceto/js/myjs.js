$(document).ready(function () {
    $('.collapsible').collapsible();
    $('.sidenav').sidenav();
    $('input#txtuser, textarea#textarea2').characterCounter();
    /* Get the documentElement (<html>) to display the page in fullscreen */
    var elem = document.documentElement;

    /* View in fullscreen */

    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        /* IE/Edge */
        elem.msRequestFullscreen();
    }
});
//inicialización de los filtros
var filtroporrestaurantes = false;
var filtroporpeluquerias = false;
var filtroportitulo = null;
var filtroporprovincia = 'Toledo';
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA59kBDbivoAFql_sgbohwL59Gy5CdyunI",
    authDomain: "speedgaming-13eff.firebaseapp.com",
    databaseURL: "https://speedgaming-13eff.firebaseio.com",
    projectId: "speedgaming-13eff",
    storageBucket: "speedgaming-13eff.appspot.com",
    messagingSenderId: "500063834107",
    appId: "1:500063834107:web:7e7fae1381b4d87633455e",
    measurementId: "G-T5633QT2B8"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var stringi;
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.autocomplete');
    //var instances = M.Autocomplete.init(elems, options);
});

function borrar() {
    var d = document.getElementById("rellenar");
    while (d.hasChildNodes())
        d.removeChild(d.firstChild);
}

function home() {
    stringi = 'home';
    transicion();
}

function principal() {
    stringi = 'principal';
    transicion();
}

function paginadeempresa() {
    stringi = 'empresa';
    transicion();
}

function vueltadenegocio() {
    document.querySelector('.content').style.display = "none";
    document.querySelector('.preloader-wrapper').style.display = "block";
    document.querySelector('.preloader-wrapper').classList.add('active');
    var parteizquierda = document.getElementById('parteizquierda');
    addclass(parteizquierda, 'hide-on-med-and-down');
    removeclass(parteizquierda, 'hide');
    var partederecha = document.getElementById('rellenardenegocio');
    addclass(partederecha, 'l10');
    principal();
    filtrosadd(filtroporrestaurantes, filtroporpeluquerias, filtroportitulo, filtroporprovincia);
}

function anegocio() {
    stringi = 'negocio';
    document.querySelector('.content').style.display = "none";
    document.querySelector('.preloader-wrapper').style.display = "block";
    document.querySelector('.preloader-wrapper').classList.add('active');
    var d = document.getElementById("rellenardenegocio");
    while (d.hasChildNodes())
        d.removeChild(d.firstChild);
    cargarnegocio();
}

function cargar(urlmia) {
    var url = urlmia;
    $.ajax({
        type: "GET",
        url: url,
        data: {},
        success: function (datos) {
            $("#rellenar").html(datos);
        }
    });
}

function cargarnegocio() {
    var url = 'negocio.html';
    $.ajax({
        type: "GET",
        url: url,
        data: {},
        success: function (datos) {
            $("#rellenardenegocio").html(datos);
        }
    });
}

function transicion() {
    document.querySelector('.content').style.display = "none";
    document.querySelector('.preloader-wrapper').style.display = "block";
    document.querySelector('.preloader-wrapper').classList.add('active');
    borrar();
    cargar(stringi + ".html");
}
/*UN ADDCLASS personalizado
document.getElementbyId('elemento').classlist.add('clase') ->
 addclass(elemento,clase)||addclass([elemento1,elemento2],clase)||
 addclass(elemento,[clase1,clase2])||addclass([elemento1,elemento2],[clase1,clase2])*/
function addclass(elementos, clase) {
    if (clase instanceof Array != true) clase = new String(clase);
    if (elementos instanceof Array && clase instanceof String) {
        for (var i = 0; i < elementos.length; i++) {
            elementos[i].classList.add(clase);
        }
    }
    if (elementos instanceof Object && elementos instanceof Array != true && clase instanceof Array) {
        for (var i = 0; i < clase.length; i++) {
            elementos.classList.add(clase[i]);
        }
    }
    if (elementos instanceof Array && clase instanceof Array) {
        for (var i = 0; i < elementos.length; i++) {
            for (var j = 0; j < clase.length; j++) {
                elementos[i].classList.add(clase[j]);
            }
        }
    }
    if (elementos instanceof Object && elementos instanceof Array != true && clase instanceof String) {
        elementos.classList.add(clase);
    }

}
/*un REMOVECLASS PERSONALIZADO| 
document.getElementbyId('elemento').classlist.remove('clase') ->
 removeclass(elemento,clase)||removeclass([elemento1,elemento2],clase)||
 removeclass(elemento,[clase1,clase2])||removeclass([elemento1,elemento2],[clase1,clase2])*/
function removeclass(elementos, clase) {
    if (clase instanceof Array != true) clase = new String(clase);
    if (elementos instanceof Array && clase instanceof String) {
        for (var i = 0; i < elementos.length; i++) {
            elementos[i].classList.remove(clase);
        }
    }
    if (elementos instanceof Array && clase instanceof Array) {
        for (var i = 0; i < elementos.length; i++) {
            for (var j = 0; j < clase.length; j++) {
                elementos[i].classList.remove(clase[j]);
            }
        }
    }
    if (elementos instanceof Object && elementos instanceof Array != true && clase instanceof Array) {
        for (var i = 0; i < clase.length; i++) {
            elementos.classList.remove(clase[i]);
        }
    }
    if (elementos instanceof Object && elementos instanceof Array != true && clase instanceof String) {
        elementos.classList.remove(clase);
    }
}