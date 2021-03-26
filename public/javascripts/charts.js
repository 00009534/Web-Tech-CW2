let employees = []
let marketingEmployees = []
let financeEmployees = []
let hrEmployees = []
onload = async () => {
  await getEmployees()
  drawChart()
}
async function getEmployees() {
  employees = await fetch('api/v1/get-employees')
      .then(res => res.json())
  marketingEmployees = employees.filter(emp => emp.department === 'marketing')
  financeEmployees = employees.filter(emp => emp.department === 'finance')
  hrEmployees = employees.filter(emp => emp.department === 'hr')
}

function drawChart() {
  const ctx = document.getElementById('employeeChart').getContext('2d');
  const chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      labels: ['Marketing', 'Finance', 'HR'],
      datasets: [{
        label: 'Number of employees',
        backgroundColor: ['#af98d4', '#4dfa87', '#faa94d'],
        borderColor: '#af98d4',
        data: [
          marketingEmployees.length,
          financeEmployees.length,
          hrEmployees.length]
      }]
    },

    // Configuration options go here
    options: {
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          stacked: true,
          gridLines: {
            display: true,
            color: 'rgba(255,99,132,0.2)'
          },
          ticks: {
            suggestedMin: 0,
            suggestedMax: 10
          }
        }],
        xAxes: [{
          gridLines: {
            display: false
          }
        }]
      },
      title: {
        display: true,
        text: 'Number of employees by departments'
      }
    }
  })
}

