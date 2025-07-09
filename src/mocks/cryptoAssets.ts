import CryptoAsset from "@/interfaces/CryptoAsset";

export const mockedCryptoAssets = new Promise<CryptoAsset[]>(resolve => (resolve([
    {
        id: "btc",
        name: "Bitcoin",
        amount: 2,
        usdValue: 3000.00,
        percentageOfPortfolio: 17,
        trend24h: -10
    }
])))