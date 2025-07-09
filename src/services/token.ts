import LabelValue from "@/interfaces/CodeLabelValue"
import CryptoAsset from "@/interfaces/CryptoAsset"
import TokenInformation from "@/interfaces/TokenInformation"
import { mockedCryptoAssets } from "@/mocks/cryptoAssets"
import { mockedTokensInformations } from "@/mocks/tokenBodys"
import { mockedToken } from "@/mocks/tokens"

export const getTokens = async (): Promise<LabelValue[]> => {
     //return await get("https://api.coinpaprika.com/v1/tickers")
     return mockedToken
}

export const getInfosToken = async (token: string): Promise<TokenInformation> => {
    return mockedTokensInformations.then((res) => res.find(it => it.nom === token) as TokenInformation)
}

export const getAllCryptoAssets = async (): Promise<CryptoAsset[]> => {
    return mockedCryptoAssets
}