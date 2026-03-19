function cambiarEstado(btn, estado) {
  let fila = btn.parentNode.parentNode;
  let celda = fila.cells[3];

  celda.className = estado;

  if (estado === "disponible") celda.innerText = "Disponible";
  if (estado === "servicio") celda.innerText = "En servicio";
  if (estado === "indisponible") celda.innerText = "Indisponible";
}

function filtrar() {
  let input = document.getElementById("search").value.toLowerCase();
  let filas = document.querySelectorAll("#tabla tr");

  filas.forEach((fila, i) => {
    if (i === 0) return;
    let texto = fila.innerText.toLowerCase();
    fila.style.display = texto.includes(input) ? "" : "none";
  });
}
