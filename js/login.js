let loginbutton = document.getElementById("loginbutton")
let loginMessage = document.getElementById("loginMessage")

loginbutton.onclick = ()=> {
login()
}

function login () 
{    
    let password = document.getElementById("password")
    let user = document.getElementById("usuario")


    if (password.value === "1234")  {
        let nombreusuario = (user.value)
        window.location ="wallet.html"

    /*Guardo nombre de usuario en LocalStorage para tomarlo luego en el otro HTML/JS */
        localStorage.setItem("Username",nombreusuario)

    } 

    /*Uso de operador AND*/
        
    password.value !== "1234" && (password.value = "")
    password.value !== "1234" && (errorPassword())

}

function errorPassword () {

    Swal.fire({
        title:'Contraseña Incorrecta',
        text:'Para entrar la contraseña es 1234 :) Solo de Prueba para el proyecto',
        icon: 'warning',
        confirmButtonText: 'Retry',
    })

}