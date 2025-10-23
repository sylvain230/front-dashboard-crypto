import { httpClient } from "@/api/httpClient"
import ChartDataPoint from "@/interfaces/ChartDataPoint"
import Transaction from "@/interfaces/Transaction"

export const getPortfolioHistoryByUserId = async (): Promise<ChartDataPoint[]> => {
     const response = await httpClient.get(`v1/resume/chart/user`, { withCredentials : true})
     return response.data
}

export const postTransaction = async (transaction : Transaction): Promise<Transaction> => {
     const response = await httpClient.post(`v1/transactions`, transaction, { withCredentials : true })
     return response.data
}