let url = 'http://localhost:4077/';

const busqueda = () => {

  const inputCed = document.getElementById('Document').value

  const data = {
    "Documento": inputCed,
  }

  console.log(inputCed)

  fetch(url + 'consultar2/' + inputCed, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then((res) => {
    if (res.status == 400) {
      alert('Error comprobando - Usario no encontrado')
    } else {
      alert('Usuario encontrado con Exito')
      res.json().then(data => mostrarData(data))
    }
  })
}

const mostrarData = (data) => {
  let i
  let body = ""
  for (i = 0; i < data.length; i++) {
    body += `<tr>
      <td>${data[i].documento}</td>
      <td>${data[i].nombres}</td>
      <td>${data[i].direccion}</td>
      <td>${data[i].telefono}</td>
     </tr>`
  }
  document.getElementById('data').innerHTML = body
}


//Corre al dar click consultar
document.getElementById("consultar")
  .addEventListener("click", function (event) {
    event.preventDefault();
    busqueda()
  });