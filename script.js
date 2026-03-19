let datos = JSON.parse(localStorage.getItem("unidades")) || [
  {malla:"Alpha 10", unidad:"A-10", tipo:"ST", estado:"Disponible", tac:"ST-1", aviso:"-"}
];

function guardar() {
  localStorage.setItem("unidades", JSON.stringify(datos));
}

function render() {
  let tabla = document.getElementById("tabla");
  tabla.innerHTML = `
<tr>
<th>Malla</th><th>Unidad</th><th>Tipo</th>
<th>Estado</th><th>TAC</th><th>Aviso</th>
</tr>`;

  datos.forEach((d, i) => {
    tabla.innerHTML += `
<tr>
<td><input value="${d.malla}" onchange="editar(${i}, 'malla', this.value)"></td>
<td><input value="${d.unidad}" onchange="editar(${i}, 'unidad', this.value)"></td>

<td>
<select onchange="editar(${i}, 'tipo', this.value)">
<option ${d.tipo=="ST"?"selected":""}>ST</option>
<option ${d.tipo=="MT"?"selected":""}>MT</option>
<option ${d.tipo=="GT"?"selected":""}>GT</option>
</select>
</td>

<td>
<select onchange="editar(${i}, 'estado', this.value)">
<option ${d.estado=="Disponible"?"selected":""}>Disponible</option>
<option ${d.estado=="En servicio"?"selected":""}>En servicio</option>
<option ${d.estado=="Indisponible"?"selected":""}>Indisponible</option>
</select>
</td>

<td><input value="${d.tac}" onchange="editar(${i}, 'tac', this.value)"></td>
<td><input value="${d.aviso}" onchange="editar(${i}, 'aviso', this.value)"></td>

</tr>`;
  });
}

function editar(i, campo, valor) {
  datos[i][campo] = valor;
  guardar();
}

function agregarFila() {
  datos.push({malla:"Nueva", unidad:"-", tipo:"ST", estado:"Disponible", tac:"-", aviso:"-"});
  guardar();
  render();
}

render();
