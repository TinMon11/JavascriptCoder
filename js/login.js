let loginbutton = document.getElementById("loginbutton")
let loginMessage = document.getElementById("loginMessage")
let userButton = document.getElementById("createUserButton")


loginbutton.onclick = ()=> {
login()
}


userButton.addEventListener("click", ()=>{
    nuevoUsuario()
}
)

function login () 
{    
    let user = document.getElementById("usuario").value
    let password = document.getElementById("password")
    let userPassword = findUser(arrayUsuarios).password
    let registrosUsuario = findUser(arrayUsuarios).registros

    
    if (password.value === userPassword)  {
        let nombreusuario = (user.value)
        console.log(registrosUsuario)
        window.location ="wallet.html"

    /*Guardo nombre de usuario y Registros de ese Usuario en LocalStorage para tomarlo luego en el otro HTML/JS */
        localStorage.setItem("Username",user)
        localStorage.setItem("Registros",JSON.stringify(registrosUsuario))
        

    } 

    /*Uso de operador AND*/
        
    password.value !== userPassword && (password.value = "")
    password.value !== userPassword && (errorPassword())

}

function errorPassword () {

    Swal.fire({
        title:'Wrong Password',
        text:'Try Again Later',
        icon: 'warning',
        confirmButtonText: 'Retry',
    })

}


async function nuevoUsuario () {


    const { value: nombreUsuario } = await Swal.fire({
        input: 'text',
        inputLabel: `Type Username`,
        inputPlaceholder: 'Your text here',
        showCancelButton: true,
        inputValidator: (value) => {
            if (!value) {
              return 'Please insert a Username!'
            }
          }
      })

      const { value: passwordUsuario } = await Swal.fire({
        input: 'text',
        inputLabel: `Type your password`,
        inputPlaceholder: 'Your text here',
        showCancelButton: true,

        inputValidator: (value) => {
            if (!value) {
              return 'You need to set up a password!'
            } 
           }
          })
         
          Swal.fire({
            title:'NEW USER CREATED',
            text:'You Can Login with your new user',
            icon: 'success',
            confirmButtonText: 'OK', })
          
        let nuevoUsuario = new Usuario (nombreUsuario, passwordUsuario, [])
        arrayUsuarios.push(nuevoUsuario)

}


function findUser(listado) {

    let user = document.getElementById("usuario").value

    let encontrado = listado.find((usuario)=>usuario.user===user);

    if(!encontrado)
    {
    Swal.fire({
        title:'User not found',
        text:'Try Again',
        icon: 'error',
        confirmButtonText: 'Retry',
        })
    } else {
    return encontrado
   }
}
