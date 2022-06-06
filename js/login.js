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
    password.value !== "1234" && (loginMessage.innerHTML =`Contraseña Incorrecta para el usuario ${user.value}`)

}