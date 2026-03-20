const mallas = [
  ...Array.from({length:10}, (_,i)=>`Alpha ${(i+1)*10}`),
  ...Array.from({length:10}, (_,i)=>`Bravo ${(i+1)*10}`),
  "Charlie 1","Charlie 2","Charlie 3",
  "Ocelot 10","Ocelot 20",
  "Bike 10","Bike 20",
  "Yankee","Roger",
  "Foxtrot 10","Foxtrot 20",
  "Mike 10","Mike 20",
  "Dogma 10","Dogma 20",
  "Victor 10","Victor 20",
  "Tiger 10","Tiger 20",
  "Ranger","Shell","Pia"
];

const situaciones = ["-", "ST", "MT", "GT", "TAC"];
const estados = ["Disponible", "No Disponible"];

function crearSelect(opciones) {
  const select = document.createElement("select");

  opciones.forEach(op => {
    const option = document.createElement("option");
    option.value = op;
    option.textContent = op;
    select.appendChild(option);
  });

  return select;
}

function crearFila() {
  const tr = document.createElement("tr");

  // MALLA
  let tdMalla = document.createElement("td");
  tdMalla.appendChild(crearSelect(mallas));

  // UNIDAD
  let tdUnidad = document.createElement("td");
  tdUnidad.innerHTML = `<input type="text" placeholder="Agentes...">`;

  // ESTADO
  let tdEstado = document.createElement("td");
  let selectEstado = crearSelect(estados);
  selectEstado.onchange = () => {
    selectEstado.className = selectEstado.value === "Disponible"
      ? "disponible"
      : "no-disponible";
  };
  tdEstado.appendChild(selectEstado);

  // SITUACION
  let tdSituacion = document.createElement("td");
  tdSituacion.appendChild(crearSelect(situaciones));

  // AVISOS
  let tdAvisos = document.createElement("td");
  let textarea = document.createElement("textarea");

  // CONTADOR
  let tdContador = document.createElement("td");
  tdContador.textContent = "0";

  textarea.oninput = () => {
    const texto = textarea.value;
    const count = texto.split(",").filter(t => t.trim() !== "").length;
    tdContador.textContent = count;
  };

  tdAvisos.appendChild(textarea);

  // NOTAS
  let tdNotas = document.createElement("td");
  tdNotas.innerHTML = `<textarea placeholder="Notas..."></textarea>`;

  tr.appendChild(tdMalla);
  tr.appendChild(tdUnidad);
  tr.appendChild(tdEstado);
  tr.appendChild(tdSituacion);
  tr.appendChild(tdAvisos);
  tr.appendChild(tdContador);
  tr.appendChild(tdNotas);

  return tr;
}

function añadirFila() {
  document.getElementById("bodyTabla").appendChild(crearFila());
}

// crear primera fila automática
añadirFila();
