class Usuario{
    //constructor
    constructor(nombre, email, foto){
        this.nombre = nombre;
        this.email = email;
        this.foto = foto;
    }

    mostrar(){
        return `
        <div class = "card">
            <img src = "${this.foto}" alt = "${this.nombre}">
            <h3>${this.nombre}</h3>
            <p>${this.email}</p>      
        </div>
        `;
    }
}


class UsuarioConRole extends Usuario {
    constructor(nombre, email, foto, rol) {
        super(nombre, email, foto);
        this.rol = rol;
    }

    mostrar(){
        return `
        <div class = "card">
            <img src = "${this.foto}" alt = "${this.nombre}">
            <h3>${this.nombre} - ${this.rol}</h3>
            <p>${this.email}</p>      
        </div>
        `;
    }
}
//funcion flecha para renderizar
const renderUsuarios = (usuarios) => {
    const contenedor = document.getElementById("Usuarios");
    contenedor.innerHTML = usuarios.map(u => u.mostrar()).join("");
}

const obtenerUsuarios = async (cantidad = 5) => {
    try {
        const respuesta = await fetch(`https://randomuser.me/api/?results=${cantidad}`);
        const datos = await respuesta.json();
        const roles = ["Administrador", "Editor", "Suscriptor", "Colaborador", "Autor"];
        let listaUsuarios = [];

        datos.results.forEach((u, i) => {
            //usuario normal
            if (i % 2 === 0){
                listaUsuarios.push(new Usuario(u.name.first, u.email, u.picture.medium));
            } else {
                listaUsuarios.push(new UsuarioConRole(u.name.first + " " + u.name.last, u.email, u.picture.medium, roles[i % roles.length]));
            }
            
        });
        renderUsuarios(listaUsuarios);
    } catch (error) {
        console.error("Ocurrio un error al obtener los usuarios", error);
    }
}


const boton = document.getElementById("btnCargar");
boton.addEventListener("click", () => obtenerUsuarios(3))
