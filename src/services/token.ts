import LabelValue from "@/interfaces/CodeLabelValue"
import CryptoAsset from "@/interfaces/CryptoAsset"
import TokenInformation from "@/interfaces/TokenInformation"
import { get } from "."
import { mockedTokensInformations } from "@/mocks/tokenBodys"
import { mockedToken } from "@/mocks/tokens"

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
export const getAllCryptoAssets = async (userId: string): Promise<CryptoAsset[]> => {
    return await get<CryptoAsset[]>(`v1/resume/${userId}`)
}
