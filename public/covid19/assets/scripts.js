var chart2;

const getTotal = async (jwt) => {
  try {
    const response = await fetch("http://localhost:3000/api/total", {
      method: "GET",
      headers: {
        "user-agent": "vscode-restclient",
        "content-type": "application/json",
        "accept": "application/json",
        "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkxlYW5uZSBHcmFoYW0iLCJ1c2VybmFtZSI6IkJyZXQiLCJpYXQiOjE1OTY1MDY4OTN9.KDSlP9ALDLvyy0Jfz52x8NePUejWOV_mZS6cq4-JZXs"
      },
    });
    const { data } = await response.json();
    let ubicacion = []
    let confirmados = []
    let muertes = []
    let recuperados = []
    let activos = []
    const ctx = document.getElementById('Chart')
    
    data.forEach((element, i) => {
      table(element.location, element.confirmed, element.deaths);
      if (i<10) {
        ubicacion.push(element.location);
        confirmados.push(element.confirmed);
        muertes.push(element.deaths);
        recuperados.push(Math.floor((element.confirmed - element.deaths) * 0.7));
        activos.push(Math.floor((element.confirmed - element.deaths) * 0.3));
      }
    })
    totalCasesChart(ctx, ubicacion, confirmados, muertes, recuperados, activos);

  } catch (err) {
    console.error(`Error: ${err}`);
  }
};

getTotal();

const getCountry = async (paises) => {
  try {
    const response = await fetch(`http://localhost:3000/api/countries/${paises}`, {
      method: "GET",
      headers: {
        "user-agent": "vscode-restclient",
        "content-type": "application/json",
        "accept": "application/json",
        "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkxlYW5uZSBHcmFoYW0iLCJ1c2VybmFtZSI6IkJyZXQiLCJpYXQiOjE1OTY1MDY4OTN9.KDSlP9ALDLvyy0Jfz52x8NePUejWOV_mZS6cq4-JZXs"
      }
    })
    const { data } = await response.json();
    /* let chartModal = document.getElementById("chartModal")
    chartModal.innerHTML = ""
    chartModal.innerHTML = '<canvas id="Chart2" width="400" height="400"></canvas>' */
    const ctx2 = document.getElementById('Chart2').getContext("2d");
    let ubicacion = data.location
    let confirmados = data.confirmed
    let muertes = data.deaths
    let recuperados = data.recovered
    let activos = data.active
    ubicationCasesChart(ctx2, ubicacion, confirmados, muertes, recuperados, activos)
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

const totalCasesChart = (ctx, ubicacion, confirmados, muertes, recuperados, activos) => {
  new Chart (ctx, {
    type: 'bar',
    data: {
      labels: ubicacion,
      datasets: [
        {
          label: 'Confirmados',
          data: confirmados,
        },
        {
          label: 'Muertes',
          data: muertes,
        },
        {
          label: 'Recuperados',
          data: recuperados
        },
        { 
          label: 'Activos',
          data: activos,
        }
      ]
    }
  })
}

function table(paises, confirmados, muertes){
  let cuerpoTabla = document.getElementById("tbody")
  cuerpoTabla.innerHTML += `
      <tr>
        <td>${paises}</td>
        <td>${confirmados}</td>
        <td>${muertes}</td>
        <td>${Math.floor((confirmados - muertes) * 0.7)}</td>
        <td>${Math.floor((confirmados - muertes) * 0.3)}</td>
        <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onclick="getCountry('${paises}')">
        Más información
      </button></td>
      </tr>
      `
}

function ubicationCasesChart(ctx2, ubicacion, confirmados, muertes, recuperados, activos) {
  if (chart2) {
    chart2.destroy();
  }
  chart2 = new Chart (ctx2, {
    type: 'polarArea',
    data: {
      labels: [
        'Confirmados',
        'Muertes',
        'Recuperados',
        'Activos'
      ],
      datasets: [{
        label: `${ubicacion}`,
        data: [confirmados, muertes, recuperados, activos],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)',
          'rgb(255, 205, 86)',
          'rgb(201, 203, 207)',
          'rgb(54, 162, 235)'
        ]
      }]
    }
  })
}