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
    document.getElementById("pre").innerHTML = JSON.stringify(data);
    // return data;
    let paises = data.filter(pais => {
      return pais.deaths > 10000
    });
    console.log(paises);
  } catch (err) {
    console.error(`Error: ${err}`);
  }
};


$(document).ready(function(){
  console.log(getTotal);
  console.log(getTotal());
  getTotal();
});


let alumnos = [
  { nombre: "Juan", edad: 24 },
  { nombre: "Pedro", edad: 19 },
  { nombre: "Maria", edad: 22 },
  { nombre: "Jose", edad: 28 },
  { nombre: "Diego", edad: 18 },
];
let mayorA20 = alumnos.filter((alumno) => {
  return alumno.edad > 20;
}); 


const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
            barThickness: "flex"
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});




