import TokenInformation from "@/interfaces/TokenInformation";

export const mockedTokensInformations = new Promise<TokenInformation[]> (resolve => resolve([
    {
        nom: "BTC",
        detenu: 0.5,
        reel: 60000,
        detenuEnDollars: 30000,
        pourcentagePortefeuille: 100,
        tendanceH24: +5
    },
    {
        nom: "ETH",
        detenu: 0.4,
        reel: 3854,
        detenuEnDollars: 1200,
        pourcentagePortefeuille: 100,
        tendanceH24: +5
    }
]))