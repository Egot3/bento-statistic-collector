import { Chart } from "chart.js/auto"

const graph = document.getElementById("graph")
export let bg = []


export const myChart = new Chart(
    graph,
    {
        type:'bar',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Star count',
                    data: [],
                    backgroundColor:bg
                }
            ]
        }
    }
)


export const chartAddData = (label, newData) => {
    bg.push(`$yellow-500`)
    myChart.data.datasets[0].backgroundColor = bg;
    myChart.data.labels.push(label);
    myChart.data.datasets[0].data.push(newData);
    myChart.update();
}