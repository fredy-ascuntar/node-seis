//let url = 'http://localhost:4077/';
let url = "https://node-seis.onrender.com/";
const busqueda = () => {
  const inputCed = document.getElementById("Document").value;

  const data = {
    Documento: inputCed,
  };

  fetch(url + "consultar2/" + inputCed, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.status == 400) {
      alert("Error comprobando - Usario no encontrado");
    } else {
      alert("Usuario encontrado OK");
      res.json().then((data) => mostrarData(data));
    }
  });
};

const mostrarData = (data) => {
  let i;
  let body = "";
  for (i = 0; i < data.length; i++) {
    body += `<tr>
      <td>${data[i].documento}</td>
      <td>${data[i].nombres}</td>
      <td>${data[i].direccion}</td>
      <td>${data[i].telefono}</td>
      <td>
        <button onclick="ponerData('${data[i].documento}', '${data[i].nombres}', '${data[i].direccion}', '${data[i].telefono}')">Editar?</button>
      </td>
     </tr>`;
  }
  document.getElementById("data").innerHTML = body;
};

//Coloca los datos en los inputs
const ponerData = (doc, name, dir, tel) => {
  const inputDoc = document.getElementById("doc");
  const inputName = document.getElementById("name");
  const inputDir = document.getElementById("dir");
  const inputTel = document.getElementById("tel");

  inputDoc.value = doc;
  inputName.value = name;
  inputDir.value = dir;
  inputTel.value = tel;
};

//Envia los datos editados
const editar = () => {
  const data = {
    documento: document.getElementById("doc").value,
    nombre: document.getElementById("name").value,
    direccion: document.getElementById("dir").value,
    telefono: document.getElementById("tel").value,
  };

  fetch(url + "editar", {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.status == 500) {
      alert("Error editando");
    } else {
      alert("Editado con exito");

      fetch(url + "consultar", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => mostrarData2(data))
        .catch((error) => console.log(error));
    }
  });
};

const mostrarData2 = (data) => {
  let body = "";
  body += `<tr>
      <td>${data[0].documento}</td>
      <td>${data[0].nombres}</td>
      <td>${data[0].direccion}</td>
      <td>${data[0].telefono}</td>
     </tr>`;

  document.getElementById("data").innerHTML = body;
};

//Corre al dar click consultar
document
  .getElementById("modificar1")
  .addEventListener("click", function (event) {
    event.preventDefault();
    busqueda();
  });

//Corre al dar click editar
document
  .getElementById("modificar2")
  .addEventListener("click", function (event) {
    event.preventDefault();
    editar();
  });
