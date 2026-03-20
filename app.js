const tabla = document.getElementById("tabla");

const mallas = ["Alpha 10","Alpha 20","Bravo 10","Charlie 1","Ranger","Shell","Pia"];
const situaciones = ["ST","MT","GT","TAC"];
const estados = ["Disponible","No Disponible"];

/* 🔥 TIEMPO REAL */
db.collection("unidades").onSnapshot(snapshot => {
  tabla.innerHTML = "";
  snapshot.forEach(doc => {
    renderFila(doc.id, doc.data());
  });
});

function crearUnidad() {
  db.collection("unidades").add({
    malla: "",
    unidad: "",
    estado: "Disponible",
    situacion: "ST",
    avisos: "",
    notas: ""
  });
}

function renderFila(id, data) {
  const tr = document.createElement("tr");

  // contador
  const total = data.avisos
    ? data.avisos.split(",").filter(a => a.trim()).length
    : 0;

  tr.innerHTML = `
    <td><input value="${data.malla}" onchange="update('${id}','malla',this.value)"></td>
    <td><input value="${data.unidad}" onchange="update('${id}','unidad',this.value)"></td>
    <td>
      <select onchange="update('${id}','estado',this.value)">
        ${estados.map(e => `<option ${e===data.estado?'selected':''}>${e}</option>`)}
      </select>
    </td>
    <td>
      <select onchange="update('${id}','situacion',this.value)">
        ${situaciones.map(s => `<option ${s===data.situacion?'selected':''}>${s}</option>`)}
      </select>
    </td>
    <td>
      <textarea onchange="update('${id}','avisos',this.value)">${data.avisos}</textarea>
    </td>
    <td>${total}</td>
    <td>
      <textarea onchange="update('${id}','notas',this.value)">${data.notas}</textarea>
    </td>
  `;

  tabla.appendChild(tr);
}

function update(id, campo, valor) {
  db.collection("unidades").doc(id).update({
    [campo]: valor
  });
}

/* 🎯 FILTROS */
function filtrar(tipo) {
  db.collection("unidades").onSnapshot(snapshot => {
    tabla.innerHTML = "";
    snapshot.forEach(doc => {
      const data = doc.data();
      if (tipo === "ALL" || data.situacion === tipo) {
        renderFila(doc.id, data);
      }
    });
  });
}
