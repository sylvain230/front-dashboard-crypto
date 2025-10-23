import { httpClient } from "@/api/httpClient"
import ChartDataPoint from "@/interfaces/ChartDataPoint"

/**
 * Retourne la liste de tous les assets d'une personne. 
 * @returns { CryptoAsset[] } Une promise contenant le résumé du wallet.
 */
export const getAllCryptoAssets = async (userId?: number): Promise<ChartDataPoint[]> => {
    const response = await httpClient.get(`v1/resume/${userId}`, { withCredentials : true })
    return response.data
}
