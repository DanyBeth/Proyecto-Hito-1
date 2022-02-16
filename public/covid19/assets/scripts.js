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
    let cuerpoTabla = document.getElementById("tbody")
    data.forEach(element => {
      cuerpoTabla.innerHTML += `
      <tr>
        <td>${element.location}</td>
        <td>${element.confirmed}</td>
        <td>${element.deaths}</td>
        <td>${Math.floor((element.confirmed - element.deaths) * 0.7)}</td>
        <td>${Math.floor((element.confirmed - element.deaths) * 0.3)}</td>
        <td>modal</td>
      </tr>
      `
    });
  } catch (err) {
    console.error(`Error: ${err}`);
  }
};

getTotal();


