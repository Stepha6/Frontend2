// js/historiaMedica.js
async function obtenerHistoriaMedica(patientId) {
  try {
    const response = await fetch(`http://localhost:8000/historia-medica/paciente/${patientId}`);
    if (!response.ok) {
      throw new Error('No se pudo obtener la historia médica');
    }
    const data = await response.json();
    mostrarHistoriaEnPantalla(data);
  } catch (error) {
    console.error(error);
    alert("Error obteniendo la historia médica");
  }
}

function mostrarHistoriaEnPantalla(historia) {
  const contenedor = document.getElementById("resultado-historia");
  contenedor.innerHTML = "";

  if (!historia.entries || historia.entries.length === 0) {
    contenedor.innerHTML = "<p>No hay registros médicos.</p>";
    return;
  }

  historia.entries.forEach((entry, i) => {
    const div = document.createElement("div");
    div.classList.add("registro");
    div.innerHTML = `
      <h3>Registro ${i + 1}</h3>
      <p><strong>Fecha:</strong> ${entry.date || "Desconocida"}</p>
      <p><strong>Diagnóstico:</strong> ${entry.diagnosis || "No especificado"}</p>
      <p><strong>Tratamiento:</strong> ${entry.treatment || "No especificado"}</p>
    `;
    contenedor.appendChild(div);
  });
}
