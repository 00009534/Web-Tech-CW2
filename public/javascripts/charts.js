
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
      data: [3, 8, 5]
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
