const getData = async (jwt) => {
  try {
    const fetchOptions = {
      method: "GET",
      headers: {
        "user-agent": "vscode-restclient",
        "content-type": "application/json",
        accept: "application/json",
        authorization: `Bearer ${jwt}`,
      },
    };
    const [response1, response2, response3] = await Promise.all(
      [
        fetch("http://localhost:3000/api/confirmed", fetchOptions),
        fetch("http://localhost:3000/api/deaths", fetchOptions),
        fetch("http://localhost:3000/api/recovered", fetchOptions),
      ],
    );
    let  data1 = await response1.json();
    let  data2 = await response2.json();
    let  data3 = await response3.json();
    let ctx3 = document.getElementById("Chart3");
    chileCasesChart(ctx3, data1, data2, data3);
    toggleChartAndChart3('Chart','Chart3')
  } catch (err) {
    localStorage.clear();
    console.error(`Error: ${err}`);
  }
};

const init = async () => {
  const token = localStorage.getItem("jwt-token");
  if (token) {
    getPosts(token);
  }
};
init();

$("#js-form").submit(async (event) => {
  event.preventDefault();
  const email = document.getElementById("js-input-email").value;
  const password = document.getElementById("js-input-password").value;
  const JWT = await postData(email, password);
  getPosts(JWT);
});

const postData = async (email, password) => {
  try {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
    });
    const { token } = await response.json();
    localStorage.setItem("jwt-token", token);
    return token;
  } catch (err) {
    console.error(`Error: ${err}`);
  }
};

let chileCasesChart = (ctx3, data1, data2, data3) => {
  new Chart(ctx3, {
    type: 'line',
    data: {
      labels: data1.data.map(item => item.date),
      datasets: [
        {
          label: 'Confirmados',
          data: data1.data.map(item => item.total),
          fill: false,
          borderColor: 'rgb(255, 99, 132)',
          tension: 0.1
        },
        {
          label: 'Muertes',
          data: data2.data.map(item => item.total),
          fill: false,
          borderColor: 'rgb(255, 159, 64)',
          tension: 0.1
        },
        {
          label: 'Recuperados',
          data: data3.data.map(item => item.total),
          fill: false,
          borderColor: 'rgb(255, 205, 86)',
          tension: 0.1
        }
      ]
    }
  })
}

const toggleChartAndChart3 = (Chart, Chart3) => {
  $(`#${Chart}`).toggle();
  $(`#${Chart3}`).toggle();
};

document.getElementById("cerrar-sesion").addEventListener("click", function() {
    localStorage.clear();
    window.location.reload();
});
