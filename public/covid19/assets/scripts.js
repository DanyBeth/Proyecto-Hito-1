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
    /* return data; */
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
  {nombre: 'Juan', edad: 24},
  {nombre: 'Pedro', edad: 19},
  {nombre: 'Maria', edad: 22},
  {nombre: 'Jose', edad: 28},
  {nombre: 'Diego', edad: 18},
  ]
  let mayorA20 = alumnos.filter(alumno => {
  return alumno.edad > 20
  })