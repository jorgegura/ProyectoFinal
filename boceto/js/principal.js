document.querySelector('.preloader-wrapper').classList.remove('active');
document.querySelector('.preloader-wrapper').style.display = "none";
document.querySelector('.content').style.display = "block";
var userimg1 = document.getElementById('userimg1');
var userimg2 = document.getElementById('userimg2');
var nameuser = document.getElementById('name');
var emailuser = document.getElementById('emailuser');
var cards = document.getElementById('cards');
var checkpeluqueria = document.getElementById('checkpeluqueria');
var checkrestaurante = document.getElementById('checkrestaurante');
var busqueda = document.getElementById('search');
var user = getuser();
var imgurl = user.photoURL;
var nick = getnick();
var aplicarfiltroscheck = false;
var filtrogeneral = [''];
var no_image_url = 'https://firebasestorage.googleapis.com/v0/b/easy-reserva.appspot.com/o/no_image.jpg?alt=media&token=c4f5e47f-9638-44c9-a02e-617c1a50383f';
var date = new Date();
var htmldecards = '';
var negocios;
var nombrenegocio;
var negocioparanegociopage;
var sites;
var barrabusqueda = document.getElementById('search');
var rconfirmadas = document.getElementById('rconfirmadas');
var rporconfirmar = document.getElementById('rporconfirmar');
var rantiguas = document.getElementById('rantiguas');
nameuser.innerHTML = nick;
emailuser.innerHTML = user.providerData[0].email;
if (imgurl != null) {
  userimg1.setAttribute('src', imgurl);
  userimg2.setAttribute('src', imgurl);
} else {
  userimg1.setAttribute('src', no_image_url);
  userimg2.setAttribute('src', no_image_url);
}

$(document).ready(function () {
  $('.collapsible').collapsible();
  $('.dropdown-trigger').dropdown();
  $('.modal').modal();
  $('.dropdown-trigger').dropdown({
    constrainWidth: false,
    coverTrigger: false,
    closeOnClick: false
  });
  cargarcards();
  $('.sidenav').sidenav();
  $('select').formSelect();
  ajustaralturacards();
  cargarreservas();
  Console.LOG('MEFNASDF')
});

function cargarcards() {
  var ref = database.ref('sites/');
  ref.on('value',
    function (data) {
      negocios = data.val();
      sites = Object.keys(negocios);
      filtrosadd(filtroportitulo);
    },
    function (err) {
      alert('Ha habido un error en la conexión al servidor, por favor revise su conexión o pruebe más tarde');
      console.log(err);
    }
  );
}

function negocio(negocio) {
  for (var i = 0; i < sites.length; i++) {
    if (sites[i] == negocio) {
      var site = sites[i];
      nombrenegocio = site;
      negocioparanegociopage = negocios[site];
      cargarnegocio();
    }
  }
}

function getnegocio() {
  return negocioparanegociopage;
}

function getnombrenegocio() {
  return nombrenegocio;
}

function ajustaralturacards() {
  var filtros = document.getElementsByClassName('fles');
  if (typeof window.innerWidth != 'undefined') {
    viewportheight = window.innerHeight
  } else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) {
    viewportheight = document.documentElement.clientHeight
  } else {
    viewportheight = document.getElementsByTagName('body')[0].clientHeight
  }
  filtros[0].style.height = viewportheight - 65 + "px";
}

function filtrosadd(str3) {

  if (str3 != '') {
    filtroportitulo = str3;
  } else if (str3 == '') {
    filtroportitulo = null;
  };

  filtrocards();
}

function filtrocards() {
  cards.innerText = " ";
  htmldecards = '';
  var sitiostemp = [];
  for (var i = 0; i < sites.length; i++) {
    var site = sites[i];
    var sitio = new String(site.toLowerCase());
    if (negocios[site].verificado == true && (filtroportitulo != null && sitio.indexOf(filtroportitulo.toLowerCase()) != -1)) {
      sitiostemp[sitiostemp.length] = site;
    }

    if (negocios[site].verificado == true && (filtroportitulo == null)) {
      sitiostemp[sitiostemp.length] = site;
    }

  }
  for (var j = 0; j < sitiostemp.length; j++) {
    htmldecards += '<div class="col s12 m6 l4"><div class="card small sticky-action "><div class="card-image waves-effect waves-block waves-light">';
    htmldecards += '</div>' +
      '<div class="card-content"><span class="card-title activator">' +
      sitiostemp[j] + '<i class="material-icons right">more_vert</i></span>' +
      '</div><div class="card-action"><a onclick="negocio(' + "'" + sitiostemp[j] + "'" + ')">Contactar</a></div><div class="card-reveal"><span class="card-title">' +
      sitiostemp[j] + '<i class="material-icons right">close</i></span><p>' +
      negocios[sitiostemp[j]].descripcion +
      '</p></div></div></div>';
  }
  cards.innerHTML = htmldecards;
}

function checks(string) {
  switch (string) {
    case 'restaurante':
      if (checkrestaurante.getAttribute('checked') == 'checked') {
        //descheckearlo y dejar de filtrar por restaurantes
        checkrestaurante.removeAttribute('checked');
        filtrosadd(0, filtroporpeluquerias, filtroportitulo, filtroporprovincia);
      } else {
        //checkearlo y añadir al filtrogeneral
        checkrestaurante.setAttribute('checked', 'checked');
        filtrosadd(1, filtroporpeluquerias, filtroportitulo, filtroporprovincia);
      }
      break;
    case 'peluquería':
      if (checkpeluqueria.getAttribute('checked') == 'checked') {
        //descheckearlo y dejar de filtrar por peluuerías
        checkpeluqueria.removeAttribute('checked');
        filtrosadd(filtroporrestaurantes, 0, filtroportitulo, filtroporprovincia);
      } else {
        //checkearlo y añadir al filtrogeneral
        checkpeluqueria.setAttribute('checked', 'checked');
        filtrosadd(filtroporrestaurantes, 1, filtroportitulo, filtroporprovincia);
      }
      break;
  }
}