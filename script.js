function filtrar() {
  let input = document.getElementById("search").value.toLowerCase();
  let filas = document.querySelectorAll("#tabla tr");

  filas.forEach((fila, i) => {
    if (i === 0) return;
    let texto = fila.innerText.toLowerCase();
    fila.style.display = texto.includes(input) ? "" : "none";
  });
}
