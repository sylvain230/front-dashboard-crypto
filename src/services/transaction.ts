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

export const putTransaction = async (transaction : Transaction): Promise<Transaction> => {
     const response = await httpClient.put(`v1/transactions`, transaction, { withCredentials : true })
     return response.data
}

export const getAllTransactions = async (): Promise<Transaction[]> => {
     const response = await httpClient.get(`v1/transactions`, { withCredentials : true})
     return response.data
}

export const deleteTransaction = async (id: string) => {
     await httpClient.delete(`v1/transactions/${id}`, { withCredentials : true})
} 