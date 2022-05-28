let loginbutton = document.getElementById("loginbutton")

loginbutton.onclick = ()=> {
login()
}

function login () 
{    
    let password = document.getElementById("password")
    let user = document.getElementById("usuario")

    if (password.value === "1234")  {
        let nombreusuario = (user.value)
        window.location="index.html"

    /*Guardo nombre de usuario en LocalStorage para tomarlo luego en el otro HTML/JS */
        localStorage.setItem("Username",nombreusuario)

    } else {
        password = "";
        alert (`Contraseña Incorrecta para el usuario ${user.value}`);
    }
}