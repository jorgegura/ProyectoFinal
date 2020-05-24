document.querySelector('.preloader-wrapper').classList.remove('active');
document.querySelector('.preloader-wrapper').style.display = "none";
document.querySelector('.content').style.display = "block";
document.getElementById('contenido').style.height = 100;
var nombrenegocio = getnombrenegocio();
var negocio = getnegocio();
var breadcrumbnegocio = document.getElementById('idnegocio');
var user = getuser();
console.log(user);
var contacto = document.getElementById('contacto');
//añadir el nombre del negocio
breadcrumbnegocio.innerHTML = nombrenegocio;

function negocioweb() {
    if (negocio.web != undefined) {
        return '<li><i class="small material-icons">http</i><a href="' + negocio.web + '">' + negocio.web + '</a></li>';
    } else if (negocio.web == undefined) {
        return '';
    }
}