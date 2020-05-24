document.querySelector('.preloader-wrapper').classList.remove('active');
document.querySelector('.preloader-wrapper').style.display = "none";
document.querySelector('.content').style.display = "block";
// Get a reference to the database service
var database = firebase.database();
// Obtener elementos
const txtuseroremail = document.getElementById('txtuseroremail');
const txtuser = document.getElementById('txtuser');
const txtEmail = document.getElementById('txtemail');
const txtpassword = document.getElementById('txtpassword');
const btnLogin = document.getElementById('btnLogin');
const btnSignUp = document.getElementById('btnSignUp');
const btnLogout = document.getElementById('btnLogout');
const btnReturntoLogin = document.getElementById('btnReturntoLogin');
const useroremailarea = document.getElementById('login');
const divdecheck = document.getElementById('divdecheck');
const checkisempresaid = document.getElementById('checkisempresaid');
const btnRegadapta = document.getElementById('btnRegadapta');
const txtempresa = document.getElementById('txtempresa');
const txtpasswordempresa = document.getElementById('txtpasswordempresa');
const auth = firebase.auth();
const textousuariooempresa = document.getElementById('textousuariooempresa');
const spanuseroremail = document.getElementById('spanuseroremail');
const spanemail = document.getElementById('spanemail');
const spannick = document.getElementById('spannick');
const inpus = document.getElementsByClassName('registro');
const barrita = document.getElementById('barrita');
var user;
var nick;
var provider;
var emaildenickname;
var logina = 0;
var loginb = 0;
var rega = 0;
var regb = 0;
var regc = 0;
var regolog = 'log';
$(document).ready(function () {
    $('.modal').modal();
});
/*|||||||||||||||||||||||||||||||
            Logins
|||||||||||||||||||||||||||||*/
// function logingoogle() {
//     var provider = new firebase.auth.GoogleAuthProvider();
//     provider.addScope('email');
//     firebase.auth().useDeviceLanguage();
//     firebase.auth().signInWithRedirect(provider).then(function () {
//         return firebase.auth().getRedirectResult();
//     }).then(result => {
//         // This gives you a Google Access Token. You can use it to access the Google API.
//         var token = result.credential.accessToken;
//         // The signed-in user info.
//         var user = result.user;
//     }).catch(function (error) {
//         // Handle Errors here.
//         var errorCode = error.code;
//         console.log(errorCode);
//         var errorMessage = error.message;
//         console.log(errorMessage);
//         // The email of the user's account used.
//         var email = error.email;
//         console.log(email);
//         // The firebase.auth.AuthCredential type that was used.
//         var credential = error.credential;
//         console.log(credential);
//         // ...
//     });
// }

// function loginfacebook() {
//     var provider = new firebase.auth.FacebookAuthProvider();
//     firebase.auth().useDeviceLanguage();
//     firebase.auth().signInWithRedirect(provider).then(function () {
//         return firebase.auth().getRedirectResult();
//     }).then(function (result) {
//         // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//         var token = result.credential.accessToken;
//         // The signed-in user info.
//         var user = result.user;
//         // ...
//     }).catch(function (error) {
//         // Handle Errors here.
//         var errorCode = error.code;
//         console.log(errorCode);
//         var errorMessage = error.message;
//         console.log(errorMessage);
//         // The email of the user's account used.
//         var email = error.email;
//         console.log(email);
//         // The firebase.auth.AuthCredential type that was used.
//         var credential = error.credential;
//         console.log(credential);
//         // ...
//     });
// }

function loginnormal() {
    //Obtener useroremail y pass
    const useroremail = txtuseroremail.value;
    const pass = txtpassword.value;
    //ver si es correo o nickname
    if (validarEmail(useroremail)) {
        //conectar por email normal
        //Sign in
        const promise = auth.signInWithEmailAndPassword(useroremail, pass);
        promise.catch(e => alert('No existe usuario con este email o la contraseña introducida es errónea'));
    } else if (useroremail != '') {
        //conectar por nickname
        //obtener email de un nickname
        emaildenickname(useroremail);
        const promise = auth.signInWithEmailAndPassword(emaildenickname, pass);
        promise.catch(e => console.log(e.message));
    } else {
        //esta parte de código no se ejecuta nunca debido a que anteriormente 
        //he filtrado que no pueda haber campos vacíos o erróneos
        alert('El campo User/Email no puede estar vacío');
    }
}
/*|||||||||||||||||||||||||||||||
            Registro
|||||||||||||||||||||||||||||*/
function registro() {
    // Obtener email y pass
    const email = txtEmail.value;
    const pass = txtpassword.value;
    const user = txtuser.value;
    const auth = firebase.auth();
    if (validarEmail(email) != true) {
        //email no válido
        alert("el email introducido es incorrecto, por favor revise el texto introducido");
    } else {
        // Registrarse in
        //ver si ya tienes cuenta primero!!!!!!!
        //ya lo hago mientras se rellena el formulario 
        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
        //subir nickname a database para que quede registrado tambien
        //subir email de nickname
        if (checkisempresaid.getAttribute('checked') == 'checked') {
            firebase.database().ref('empresausers/' + user).set({
                email: email,
                verificado: false
            });
            loginempresa();
        } else {
            firebase.database().ref('users/' + user).set({
                email: email
            });
            const promise1 = auth.signInWithEmailAndPassword(email, pass);
            promise1.catch(e => console.log(e.message));
        }

        //login ya de paso TODO: ver lo de la confrmación de email por un email que le ha llegado

    }

}

function loginempresa() {
    var useroremailempresa = txtempresa.value;
    var correodeempresa = database.ref('empresausers/' + useroremailempresa);
    correodeempresa.on('value',
        function (data) {
            if (data.val() != null) {
                var user = data.val();
                useroremailempresa = user.email;
                var passempresa = txtpasswordempresa.value;
                const promise1 = auth.signInWithEmailAndPassword(useroremailempresa, passempresa);
                promise1.catch(e => console.log(e.message));
                irapaginadeempresa();
            } else {
                alert('¡El usuario no existe!, si quiere registrarse haga clic en: "Ir a registro"');
            }
        },
        function (err) {
            alert('Error en el proceso de login!!   Por favor, pruebe de nuevo o revise su conexión a internet');
            console.log(err);
        });

}

function irapaginadeempresa() {
    paginadeempresa();
}
/*|||||||||||||||||||||||||||||||
        UTILIDADES
|||||||||||||||||||||||||||||*/
function esperaranick() {
    if (nick == null) {
        function asyncSqrt(callback) {
            setTimeout(function () {
                callback();
            }, 100);
        }
        asyncSqrt(function () {
            esperaranick();
        });
    } else {
        principal();
    }
}

function nicknamedeemail(email) {
    var ref = database.ref('users/');
    ref.on('value',
        function (data) {
            var users = data.val();
            nicknames = Object.keys(users);
            for (var i = 0; i < nicknames.length; i++) {
                var nickname = nicknames[i];
                var emaildenickname = users[nickname].email;
                if (emaildenickname == email) {
                    nick = nickname;
                }
            }
        },
        function (err) {
            alert('Ha habido un error en la conexión al servidor, por favor revise su conexión o pruebe más tarde');
            console.log(err);
        }
    );
}

function emaildenickname(useroremail) {
    var correodenickname = database.ref('users/' + useroremail);
    correodenickname.on('value',
        function (data) {
            if (data.val() != null) {
                var user = data.val();
                emaildenickname = user.email;
            } else {
                alert('¡El usuario no existe!, si quiere registrarse haga clic en: "Ir a registro"');
            }
        },
        function (err) {
            alert('Error en el proceso de login!!   Por favor, pruebe de nuevo o revise su conexión a internet');
            console.log(err);
        });
}

function check() {
    if (checkisempresaid.getAttribute('checked') == 'checked') {
        //descheckearlo y adaptar a registro normal
        textousuariooempresa.innerHTML = 'Usuario';
        checkisempresaid.removeAttribute('checked');
        console.log(textousuariooempresa, checkisempresaid.getAttribute('checked'));
    } else if (checkisempresaid.getAttribute('checked') == null) {
        //checkearlo y añadir al filtrogeneral
        textousuariooempresa.innerText = 'Nombre de Empresa';
        checkisempresaid.setAttribute('checked', 'checked');
        console.log(textousuariooempresa.innerHTML, checkisempresaid.getAttribute('checked'));
    }
}
//adaptar página para el registro
function registroadapta() {
    regolog = 'reg';
    for (var i = 0; i < inpus.length; i++) {
        inpus[i].classList.remove('hide');
    }
    addclass([btnLogin, useroremailarea, btnRegadapta], 'hide');
    removeclass([btnReturntoLogin, btnSignUp, txtEmail, divdecheck], ['hide', 'invalid']);
}
//ahora a la inversa
function returntologin() {
    regolog = 'log';
    for (var i = 0; i < inpus.length; i++) {
        addclass([inpus[i]], 'hide');
    }
    removeclass([btnLogin, useroremailarea, btnRegadapta], 'hide');
    addclass([btnReturntoLogin, btnSignUp, divdecheck], 'hide');
}

function quitaradvertenciainput(string) {
    if (string == 'txtuseroremail' || string == 'txtemail' || string == 'txtuser' || string == 'txtpassword') {
        document.getElementById(string).classList.remove('invalid');
        document.getElementById(string).classList.remove('valid');
    }
}

function quienvaantes(string, fcorreo, fnick) {
    var pos1 = 0;
    var pos2 = 0;
    for (var i = 0; i < string.length; i++) {
        for (var j = 0; j < fcorreo.length; j++) {
            if (fcorreo.charAt(j) == string.charAt(i)) {
                if (i > pos1 && pos1 == 0) {
                    pos1 = i;
                }
            }
        }
        if (fnick == string.charAt(i)) {
            if (i > pos2 && pos2 == 0) {
                pos2 = i;
            }
        }
    }
    if (pos1 > pos2 && pos2 != 0) {
        //va después el símbolo de correo
        return 'filtronick';
    } else if (pos1 < pos2 && pos1 != 0) {
        //va antes el swímbolo de correo que otra cosa
        return 'filtrocorreo';
    } else if (pos2 > pos1 && pos1 == 0) {
        return 'filtronick';
    } else if (pos1 > pos2 && pos2 == 0) {
        return 'filtrocorreo';
    } else if (pos1 == 0 && pos2 == 0) {
        return 'nickpermitimos';
    }
}

function contiene(string, strbuscado) {
    for (var i = 0; i < string.length; i++) {
        if (strbuscado.indexOf(string.charAt(i)) != -1) {
            return true;
        }
    }
    return false;
}

function charRemoveAt(str, p) {
    return str.substring(0, p) + str.substring(p + 1);
}

function espaciosporbarrabaja(string) {
    return string.split(" ").join("_");
}

/*|||||||||||||||||||||||||||||||
    Progreso de la barrita
|||||||||||||||||||||||||||||*/
function loginrellenado(str1, str2) {
    if (str1 == 1) {
        logina = 1;
    } else if (str1 == 0) {
        logina = 0
    };
    if (str2 == 1) {
        loginb = 1;
    } else if (str2 == 0) {
        loginb = 0
    };
    if (logina + loginb == 2) {
        removeclass([btnLogin, barrita], ['disabled', 'width-50pc']);
        addclass(barrita, 'width-100pc');
    } else if (logina + loginb == 1) {
        removeclass(barrita, ['width-0pc', 'width-100pc']);
        addclass(barrita, 'width-50pc');
        addclass(btnLogin, 'disabled');
    } else {
        removeclass(barrita, 'width-50pc');
        addclass(barrita, 'width-0pc');
    }
}

function registrorellenado(str1, str2, str3) {
    if (str1 == 1) {
        rega = 1;
    } else if (str1 == 0) {
        rega = 0
    };
    if (str2 == 1) {
        regb = 1;
    } else if (str2 == 0) {
        regb = 0
    };
    if (str3 == 1) {
        regc = 1;
    } else if (str3 == 0) {
        regc = 0;
    }
    if (rega + regb + regc == 3) {
        removeclass([btnSignUp, barritareg], ['disabled', 'width-66pc']);
        addclass(barritareg, 'width-100pc');
    } else if (rega + regb + regc == 2) {
        addclass(btnSignUp, 'disabled');
        removeclass(barritareg, ['width-100pc', 'width-33pc']);
        addclass(barritareg, 'width-66pc');
    } else if (rega + regb + regc == 1) {
        removeclass(barritareg, ['width-0pc', 'width-66pc']);
        addclass(barritareg, 'width-33pc');
    } else {
        removeclass(barritareg, 'width-33pc');
        addclass(barritareg, 'width-0pc');
    }
}
var useroremailtype;
/*|||||||||||||||||||||||||||||||
  Control de Usuario o email
|||||||||||||||||||||||||||||*/
function filtrouseroremail(string) {
    //Se añaden los caracteres válidos
    var out = '';
    var filtronick = '_';
    var filtrocorreo = '@.-';
    var filtropermitidosgeneral = 'abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ1234567890_@.-';
    if (string != '') {
        switch (quienvaantes(string, filtrocorreo, filtronick)) {
            case 'filtrocorreo':
                //es email y prohibimos los demás caracteres
                out = filtroemail(string);
                useroremailtype = 'filtrocorreo';
                break;
            case 'filtronick':
                useroremailtype = 'filtronick';
                out = filtronickenvivo(string);
                break;
            case 'nickpermitimos':
                //meter filtro para que no entre mierda
                useroremailtype = 'nickpermitimos';
                for (var i = 0; i < string.length; i++) {
                    if (filtropermitidosgeneral.indexOf(string.charAt(i)) != -1) {
                        out += string.charAt(i);
                    } else {
                        charRemoveAt(string, i);
                    }
                }
                break;
        }
    } else {
        //el campo está vacio
        loginrellenado(0, '_');
    }
    validaruseroremail(out);
    return out;
}

function validaruseroremail(string) {
    var num = string.length;
    if (num != 0) {
        if (useroremailtype == 'filtrocorreo') {
            //es email 
            if (validarEmail(string)) {
                //es buen email
                spanuseroremail.setAttribute('data-succes', 'Email válido');
                removeclass(txtuseroremail, 'invalid');
                addclass(txtuseroremail, 'valid');
                loginrellenado(1, '_');
            } else {
                //es email pero es un mal email
                spanuseroremail.setAttribute('data-error', 'Email erróneo');
                removeclass(txtuseroremail, 'valid');
                addclass(txtuseroremail, 'invalid');
                loginrellenado(0, '_');
            }
        }
        if (useroremailtype == 'filtronick') {
            //es nick y prohibimos los demás caracteres epeciales
            if (num < 4 && 0 < num) {
                removeclass(txtuseroremail, 'valid');
                addclass(txtuseroremail, 'invalid');
                spanuseroremail.setAttribute('data-error', 'Nombre de usuario demasiado corto');
                loginrellenado(0, '_');
            }
            if (num > 4) {
                removeclass(txtuseroremail, 'invalid');
                addclass(txtuseroremail, 'valid');
                loginrellenado(1, '_');
            }
        }
        if (useroremailtype == 'nickpermitimos') {
            //es nick pero no prohibimos
            if (string.length < 4) {
                removeclass(txtuseroremail, 'valid');
                addclass(txtuseroremail, 'invalid');
                spanuseroremail.setAttribute('data-error', 'Nombre de usuario demasiado corto');
                loginrellenado(0, '_');
            }
            if (string.length >= 5) {
                removeclass(txtuseroremail, 'invalid');
                addclass(txtuseroremail, 'valid');
                loginrellenado(1, '_');
            }
        }
    } else {
        //el campo está vacio
        spanuseroremail.setAttribute('data-error', 'Campo vacío');
        removeclass(txtuseroremail, ['invalid', 'valid']);
        addclass(txtuseroremail, 'invalid');
        loginrellenado(0, '_');
    }
}
/*|||||||||||||||||||||||||||||||
        Control de Nick
|||||||||||||||||||||||||||||*/
function filtronickenvivo(string) { //solo letras, numeros y _  
    var out = '';
    var filtro = 'abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ1234567890_'; //Caracteres validos
    for (var i = 0; i < string.length; i++) {
        if (filtro.indexOf(string.charAt(i)) != -1) {
            out += string.charAt(i);
        } else if (string.charAt(i) == ' ') {
            out += '_';
        }
    }
    if (regolog == 'reg') {
        if (string.length > 4) {
            removeclass(txtuser, 'invalid');
            addclass(txtuser, 'valid');
            comprobarsiusuarioexiste(out);
        }
        if (string.length < 5) {
            removeclass(txtuser, 'valid');
            addclass(txtuser, 'invalid');
            spannick.setAttribute('data-error', 'Nombre de usuario demasiado corto');
            registrorellenado('_', 0, '_');
        }
        if (string.length == 0) {
            removeclass(txtuser, ['valid', 'invalid']);
        }
    } else {
        if (string.length > 4) {
            comprobarsiusuarioexiste(out);
        }
    }
    return out;
}

function comprobarsiusuarioexiste(string) {
    var privatestrings = string.toLowerCase();
    var nicks = database.ref('badusernames/' + privatestrings);
    nicks.on('value',
        function (data) {
            if (data.val() != null) {
                /* var nick = data.val(); */
                if (regolog == 'log') {
                    removeclass(txtuseroremail, 'valid');
                    addclass(txtuseroremail, 'invalid');
                    spanuseroremail.setAttribute('data-error', 'Usuario no permitido')
                    loginrellenado(0, '_');
                } else if (regolog == 'reg') {
                    removeclass(txtuser, 'valid');
                    addclass(txtuser, 'invalid');
                    spannick.setAttribute('data-error', 'Usuario no permitido')
                    registrorellenado('_', 0, '_');
                }
            } else {
                var nicks = database.ref('users/' + string);
                nicks.on('value',
                    function (data) {
                        if (data.val() != null) {
                            if (regolog == 'log') {
                                removeclass(txtuseroremail, 'invalid');
                                addclass(txtuseroremail, 'valid');
                                loginrellenado(1, '_');
                            } else if (regolog == 'reg') {
                                removeclass(txtuser, 'valid');
                                addclass(txtuser, 'invalid');
                                spannick.setAttribute('data-error', 'Usuario no disponible')
                                registrorellenado('_', 0, '_');
                            }
                        } else {
                            if (regolog == 'log') {
                                removeclass(txtuseroremail, 'invalid');
                                addclass(txtuseroremail, 'valid');
                                spanuseroremail.setAttribute('data-succes', 'Usuario correcto')
                                loginrellenado(1, '_');
                            } else if (regolog == 'reg') {
                                removeclass(txtuser, 'invalid');
                                addclass(txtuser, 'valid');
                                spannick.setAttribute('data-success', 'Usuario disponible')
                                registrorellenado('_', 1, '_');
                            }

                        }
                    },
                    function (err) {
                        alert('Error en el proceso de login!!   Por favor, pruebe de nuevo o revise su conexión a internet');
                        console.log(err);
                    });
            }
        },
        function (err) {
            var parte = '';
            if (regolog == 'reg') {
                parte = 'registro';
            } else {
                parte = 'login';
            }
            alert('Error en el ' + parte + ', pruebe a comprobar su conexión a internet y pruebe de nuevo');
            console.log(err);
        });
}
/*|||||||||||||||||||||||||||||||
        Control de Email
|||||||||||||||||||||||||||||*/
function filtroemail(string) {
    var out = '';
    var filtro = 'abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ1234567890@.-'; //Caracteres validos
    for (var i = 0; i < string.length; i++) {
        if (filtro.indexOf(string.charAt(i)) != -1) {
            out += string.charAt(i);
        } else {
            charRemoveAt(string, i);
        }
    }
    return out;
}

function validarEmail(valor) {
    if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(valor)) {
        if (regolog == 'log') {
            removeclass(txtuseroremail, 'invalid');
            addclass(txtuseroremail, 'valid');
            loginrellenado(1, '_');
        }
        if (regolog == 'reg' && txtEmail.innerText == '') {
            removeclass(txtEmail, 'invalid');
            addclass(txtEmail, 'valid');
            registrorellenado(1, '_', '_');
        }
        return true;
    } else {
        if (regolog == 'log') {
            removeclass(txtuseroremail, 'valid');
            addclass(txtuseroremail, 'invalid');
            loginrellenado(0, '_');
        }
        if (regolog == 'reg') {
            removeclass(txtEmail, 'valid');
            addclass(txtEmail, 'invalid');
            registrorellenado(0, '_', '_');
        }
        return false;
    }
}

function logout() {
    firebase.auth().signOut();
}

/*|||||||||||||||||||||||||||||||
     Control de contraseña
|||||||||||||||||||||||||||||*/
function filtropass(string) {
    var out = '';
    var losespaciosss = 0;
    //Se añaden los caracteres válidos
    var filtro = 'abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ1234567890_@#.*'; //Caracteres validos
    for (var i = 0; i < string.length; i++) {
        if (filtro.indexOf(string.charAt(i)) != -1) {
            out += string.charAt(i);
        } else if (string.charAt(i) == ' ') {
            if (losespaciosss == 0) alert('Los espacios van a ser sustituidos por barras espaciadoras por su seguridad'), losespaciosss++;
            out += '_';
        }
    }
    return out;
}

function password(string) {
    var num = string.length;
    if (0 < num <= 6) {
        removeclass(txtpassword, 'valid');
        addclass(txtpassword, 'invalid');
        if (regolog = 'log') {
            loginrellenado('_', 0);
        }
        if (regolog = 'reg') {
            registrorellenado('_', '_', 0)
        }
    }
    if (num == 0) {
        removeclass(txtpassword, ['valid', 'invalid']);
        if (regolog = 'log') {
            loginrellenado('_', 0);
        }
        if (regolog = 'reg') {
            registrorellenado('_', '_', 0)
        }
    }
    if (string.length > 6) {
        removeclass(txtpassword, 'invalid');
        addclass(txtpassword, 'valid');
        if (regolog = 'log') {
            loginrellenado('_', 1);
        }
        if (regolog = 'reg') {
            registrorellenado('_', '_', 1)
        }
    }
}

function setuser(firebaseUser) {
    user = firebaseUser;
}

function getuser() {
    return user;
}

function getnick() {
    return nick;
}

function irapaginaprincipal() {
    esperaranick();
}
// Añadir un listener en tiempo real a el usuario de firebase
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        provider = firebaseUser.providerData[0].providerId;
        if (provider == 'google.com' || provider == 'facebook.com') {
            nicknamedeemail(firebaseUser.providerData[0].email);
        } else {
            nicknamedeemail(firebaseUser.email);
        }
        console.log(firebaseUser);
        setuser(firebaseUser);
        var ref = database.ref('empresausers/');
        ref.on('value',
            function (data) {
                var users = data.val();
                empresas = Object.keys(users);
                for (var i = 0; i < empresas.length; i++) {
                    var empresa = empresas[i];
                    var emaildenickname = users[empresa].email;
                    if (emaildenickname == firebaseUser.email) {
                        setempresaname(empresa);
                        irapaginadeempresa();
                    } else if (checkisempresaid.getAttribute('checked') == null) {
                        irapaginaprincipal();
                        removeclass(btnLogout, 'hide');
                        addclass(btnLogin, 'hide');
                    }
                }
            },
            function (err) {
                console.log(err);
            }
        );
    } else {
        console.log('no logueado');
        btnLogout.classList.add('hide');
        btnLogin.classList.remove('hide');
    }
});
var empresanombre;
function setempresaname(empresa){
    console.log(empresa);
    empresanombre = empresa;
}
function getempresaname(){
    return empresanombre;
}