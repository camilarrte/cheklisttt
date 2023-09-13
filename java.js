let cuerpo = document.querySelector("body")
let contenedortareas = document.querySelector(".tareas")
let boton = document.querySelector("button.agregar")
let botonborrar = document.querySelector("button.borrar")
let comenzardesde = 3
let tareas = []
console.log("mira lo que hay", cuerpo);

botonborrar.addEventListener("click", function (evento){
    evento.preventDefault()
    borrar("class")
    contenedortareas.innerHTML= ""
    const defaults = {
        spread: 360,
        ticks: 50,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["star"],
        colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
      };
      
      function shoot() {
        confetti({
          ...defaults,
          particleCount: 40,
          scalar: 1.2,
          shapes: ["star"],
        });
      
        confetti({
          ...defaults,
          particleCount: 10,
          scalar: 0.75,
          shapes: ["circle"],
        });
      }
      
      setTimeout(shoot, 0);
      setTimeout(shoot, 100);
      setTimeout(shoot, 200);
})




cuerpo.addEventListener("click", function (evento) {
    console.log("hiciste click en", evento);
    if (evento.target.tagName == "INPUT" && evento.target.type == "checkbox") {
        evento.target.remove()
        console.log("el id del input es", evento.target.id);
        let id = evento.target.id
        document.querySelector("label[for=" + id + "]").remove()
        document.querySelector("." + id).remove()
        evento.target.remove()
        guardartodo()
        if(contenedortareas.children.length == 0){
            const defaults = {
                spread: 360,
                ticks: 50,
                gravity: 0,
                decay: 0.94,
                startVelocity: 30,
                shapes: ["star"],
                colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
              };
              
              function shoot() {
                confetti({
                  ...defaults,
                  particleCount: 40,
                  scalar: 1.2,
                  shapes: ["star"],
                });
              
                confetti({
                  ...defaults,
                  particleCount: 10,
                  scalar: 0.75,
                  shapes: ["circle"],
                });
              }
              
              setTimeout(shoot, 0);
              setTimeout(shoot, 100);
              setTimeout(shoot, 200);
        }
    }
})

boton.addEventListener("click", function (evento) {
    let texto = document.querySelector("#texto")
    console.log("mira el etxto que estaba en el input", texto.value);
    comenzardesde

    if (texto.value == "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No introducir texto vacio!',
            footer: '<a href="">Why do I have this issue?</a>'
        })
        return
    }

    let contenedor = document.createElement("div")
    let tarea = `<div class="tarea${comenzardesde}">
    <input type="checkbox" id="tarea${comenzardesde}">
    <label for="tarea${comenzardesde}">${texto.value}</label>
   </div>`
    contenedor.innerHTML = tarea
    tareas.push({
        "id": `tarea${comenzardesde}`,
        "tarea": `${texto.value}`
    }
    )
    comenzardesde = comenzardesde + 1
    contenedortareas.appendChild(contenedor)

    guaradar("class", JSON.stringify(tareas))
})

console.log(
    recuperar("class")
);

let tareasarealizar = recuperar("class")
console.log("tareasarealizar", tareasarealizar)
if (tareasarealizar != null) {
    let tareajasom = JSON.parse(tareasarealizar)
    console.log(tareajasom);
    tareajasom.map(
        function (tarea) {
            let contenedor = document.createElement("div")
            let texto = `<div class="${tarea.id}">
            <input type="checkbox" id="${tarea.id}">
            <label for="${tarea.id}">${tarea.tarea}</label>
            </div>`
            contenedor.innerHTML = texto
            contenedortareas.appendChild(contenedor)
        }
    )
}

console.log("que tiene el contenedor tareas?", contenedortareas.children);
function guardartodo() {
    const nuevastareas = []
        for (const clave of contenedortareas.children) {
            console.log("clave", clave.className);
            console.log("texto", clave.children[1]?.textContent);
            nuevastareas.push(
                {
                    "id": `${clave.className}`,
                    "tarea": `${clave.children[1]?.textContent}`
                }
            )
        }
    guaradar("class", JSON.stringify(nuevastareas))

}