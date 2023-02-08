const request = new XMLHttpRequest();
request.open('GET', 'https://127.0.0.1:5000/emp', true);

request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
        const data = JSON.parse(this.response);
        const contenedor = document.getElementById('contenedor');
        contenedor.setAttribute('class', 'card-group, pt-4');

        data.forEach((emp) => {
          console.log(emp.name);
          console.log(emp.email);
        });
      } else {
        console.log('Ha ocurrido un error conc ódigo ' + request.status);
      }
    }

  request.send();