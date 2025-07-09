import ChartDataPoint from "@/interfaces/ChartDataPoint";

export const mockedChartData = new Promise<ChartDataPoint[]> (resolve => resolve([
    {
        date: "2015-10-10",
        value: 10
    },
        {
        date: "2015-10-20",
        value: 20
    }
]))