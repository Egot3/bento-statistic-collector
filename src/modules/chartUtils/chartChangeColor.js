import { bg } from "./chartAddData"
import { bootstrapColorConverter } from "../bootsrapUtils/bootstrapColorConverter";

export const changeChartBg = (elementId, color, chart) => {
    bg[elementId-1] = bootstrapColorConverter(`$${color.trim()}`)
    chart.data.datasets[0].backgroundColor = bg;
    chart.update()
    console.log(bg)
}