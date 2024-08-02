//let url = 'http://localhost:4077/';
let url = "https://node-seis.onrender.com/";

//Envia los datos para permitir acceso
const comprobar = () => {
  const inputUser = document.getElementById("user").value;
  const inputPsw = document.getElementById("psw").value;

  const data = {
    usuario: inputUser,
    pasword: inputPsw,
  };

  fetch(url + "login", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.status == 400) {
      alert(
        "Micro mercado San Francisco - Usario no registrado, por favor verifica"
      );
    } else {
      alert("Micro mercado San Francisco----> Bienvenido");
      window.location.href = "menu1.html";
    }
  });
};

//Corre al dar click enviar
document.getElementById("enviar").addEventListener("click", function (event) {
  event.preventDefault();
  comprobar();
});
