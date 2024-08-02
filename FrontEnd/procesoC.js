let url = 'http://localhost:4077/';

//Primera consulta de datos
fetch(url + 'consultar', {
  method: 'GET'
})
  .then(response => response.json())
  .then(data => mostrarData(data))
  .catch(error => console.log(error))

//Concatena los datos a la tabla
const mostrarData = (data) => {
  let i
  let body = ""
  for (i = data.length-5; i < data.length; i++) {
    //for (i = 0; i < 5; i++) {
    body += `<tr>
      <td>${data[i].documento}</td>
      <td>${data[i].nombres}</td>
      <td>${data[i].direccion}</td>
      <td>${data[i].telefono}</td>
      </tr>`
  }
  document.getElementById('data').innerHTML = body
}
//Envia datos creados
const create = () => {
  const data = {
    "documento": document.getElementById('doc').value,
    "nombre": document.getElementById('name').value,
    "direccion": document.getElementById('dir').value,
    "telefono": document.getElementById('tel').value
  }

  fetch(url + 'crear', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    }
  },
  ).then((res) => {
    if (res.status == 500) {
      alert('error interno - Usuario no creado')
    } else {
      alert('Usuario Creado')

      fetch(url + 'consultar', {
        method: 'GET'
      })
        .then(response => response.json())
        .then(data => mostrarData(data))
        .catch(error => console.log(error))

    }

  }).catch((err) => {
    console.log(err);
  })

}

//Corre al dar click crear
document.getElementById("crear")
  .addEventListener("click", function (event) {
    event.preventDefault();
    create()
  });