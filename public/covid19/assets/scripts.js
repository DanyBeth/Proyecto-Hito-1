

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
    
    console.log(data);
    data.forEach(element => {
      table(element.location, element.confirmed, element.deaths);
      const ctx = document.querySelector('#chart').getContext('2d')
      totalCasesChart(ctx, element.location, element.confirmed, element.deaths)
    })
  } catch (err) {
    console.error(`Error: ${err}`);
  }
};

getTotal();


function totalCasesChart(ctx, paises, confirmados, muertes) {
  new Chart (ctx, {
    type: 'bar',
    data: {
      labels: paises,
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
          data: Math.floor((confirmados - muertes) * 0.7),
        },
        {
          label: 'Activos',
          data: Math.floor((confirmados - muertes) * 0.7),
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
        <td>modal</td>
      </tr>
      `
}