import React from 'react'
import { Pie, Line, Bar, defaults } from 'react-chartjs-2'

// Run command "npm install --save react-chartjs-2 chart.js" to install 


// defaults.global.tooltips.enabled = false
// defaults.global.legend.position = 'bottom'

const Show_graph = () => {
  return (
    <div>
      <Line
        data={{
          labels: ['20/04', '21/04', '22/04', '23/04', '24/04', '25/04'],
          title: "a",
          datasets: [
            {
              label: 'Humidity',
              data: [12, 19, 7, 5, 13, 10],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
            // {
            //   label: 'Quantity',
            //   data: [47, 52, 67, 58, 9, 50],
            //   backgroundColor: 'orange',
            //   borderColor: 'red',
            // },
          ],
        }}
        height={500}
        width={600}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
          legend: {
            labels: {
              fontSize: 25,
            },
          },
        }}
      />
    </div>
  )
}

export default Show_graph
 