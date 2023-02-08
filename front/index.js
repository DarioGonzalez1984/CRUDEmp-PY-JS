//Traer todos los registros desde la API y renderizar tabla
fetch("http://127.0.0.1:5000/emp")
  .then((response) => response.json())
  .then((data) => {
    
    var table = document.createElement("table");
    var headerRow = document.createElement("tr");
    var header0 = document.createElement("th");
    header0.textContent = "ID";
    var header1 = document.createElement("th");
    header1.textContent = "Nombre";
    var header2 = document.createElement("th");
    header2.textContent = "Email";
    var header3 = document.createElement("th");
    header3.textContent = "Teléfono";
    var header4 = document.createElement("th");
    header4.textContent = "Dirección";
    var header5 = document.createElement("th");
    header5.textContent = "Acciones";
    headerRow.appendChild(header0);
    headerRow.appendChild(header1);
    headerRow.appendChild(header2);
    headerRow.appendChild(header3);
    headerRow.appendChild(header4);
    headerRow.appendChild(header5);
    table.appendChild(headerRow);
    data.forEach((item) => {
      var row = document.createElement("tr");
      var idCell = document.createElement("td");
      idCell.textContent = item.id;
      const recordId = item.id;
      var nameCell = document.createElement("td");
      nameCell.textContent = item.name;
      var emailCell = document.createElement("td");
      emailCell.textContent = item.email;
      var phoneCell = document.createElement("td");
      phoneCell.textContent = item.phone;
      var addressCell = document.createElement("td");
      addressCell.textContent = item.address;
      var editButton = document.createElement("button");
      editButton.textContent = "Editar";

      editButton.addEventListener("click", function() {
        window.location.href = "editEmp.html?id=" + recordId;
      });
//evento que asigna id a la función editar y redirige a pagina de edición
      var deleteButton = document.createElement("button");
      deleteButton.textContent = "Borrar";
//evento que asigna id para la función borrar y elimina el registro.
      deleteButton.addEventListener("click", function() {
        // window.location.href = "deleteEmp.html?id=" + recordId;

        fetch("http://127.0.0.1:5000/delete/" + recordId, {
          method: "DELETE"
        })
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              alert("Record deleted successfully!");
            } else {
              alert("Error deleting record");
            }
          });
      });
      // ... agrega más columnas aquí si es necesario
      row.appendChild(idCell);
      row.appendChild(nameCell);
      row.appendChild(emailCell);
      row.appendChild(phoneCell);
      row.appendChild(addressCell);
      row.appendChild(editButton);
      row.appendChild(deleteButton);
      table.appendChild(row);
    });
    document.getElementById("table-container").appendChild(table);
  })
  // .then((json) => console.log(json));


//Pasar datos del form a la API creando un empleado nuevo

// Obtener los datos del formulario
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('newEmpForm');
 
// Capturar el evento de submit del formulario
newEmpForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Obtener los valores de los campos del formulario
  const name = newEmpForm.elements.name.value;
  const email = newEmpForm.elements.email.value;
  const phone = newEmpForm.elements.phone.value;
  const address = newEmpForm.elements.address.value;

  // Crear un objeto con los datos del formulario
  const data = { name, email, phone, address };

  // Configurar la petición a la API
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  // Realizar la petición a la API
  fetch('http://127.0.0.1:5000/create', options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
});
});

