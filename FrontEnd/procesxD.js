let url = 'http://localhost:4077/';

const busqueda = () => {

  const inputCed = document.getElementById('Document').value

  const data = {
    "Documento": inputCed,
  }

  fetch(url + 'consultar2/' + inputCed, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then((res) => {
    if (res.status == 400) {
      alert('Error comprobando - Usario no encontrado')
    } else {
      alert('Usuario encontrado OK')
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
      <td>
      <button onclick="deleteUser(${data[i].documento})">Eliminar</button>
      </td>
     </tr>`
  }
  document.getElementById('data').innerHTML = body
}

//Elimina usuario por id
const deleteUser = (id) => {
    console.log(id);
  
    fetch(url + 'borrar', {
      method: 'DELETE',
      body: JSON.stringify({ 'documento': id }),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      if (res.status == 500) {
        alert('Error interno')
      } else {
        alert('Usuario eliminado')
  
        fetch(url + 'consultar', {
          method: 'GET'
        })
          .then(response => response.json())
          .then(data => mostrarData2(data))
          .catch(error => console.log(error))
      }
    })
  
  }

  const mostrarData2 = (data) => {
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
document.getElementById("busqueda")
  .addEventListener("click", function (event) {
    event.preventDefault();
    busqueda()
  });

  