import LabelValue from "@/interfaces/CodeLabelValue"
import CryptoAsset from "@/interfaces/CryptoAsset"
import TokenInformation from "@/interfaces/TokenInformation"
import { mockedTokensInformations } from "@/mocks/tokenBodys"
import { mockedToken } from "@/mocks/tokens"
import { httpClient } from "@/api/httpClient"

export const getTokens = async (): Promise<LabelValue[]> => {
     //return await get("https://api.coinpaprika.com/v1/tickers")
     return mockedToken
}

export const getInfosToken = async (token: string): Promise<TokenInformation> => {
    return mockedTokensInformations.then((res) => res.find(it => it.nom === token) as TokenInformation)
}

/**
 * Retourne la liste de tous les assets d'une personne. 
 * @returns { CryptoAsset[] } Une promise contenant le résumé du wallet.
 */
export const getAllCryptoAssets = async (): Promise<CryptoAsset[]> => {
    const response = await httpClient.get(`v1/resume`, { withCredentials : true })
    return response.data
}
