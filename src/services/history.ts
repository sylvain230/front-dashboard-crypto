import ChartDataPoint from "@/interfaces/ChartDataPoint"
import { mockedChartData } from "@/mocks/chartData"

export const getHistory = async (): Promise<ChartDataPoint[]> => {
     //return await get("https://api.coinpaprika.com/v1/tickers")
     return mockedChartData
}