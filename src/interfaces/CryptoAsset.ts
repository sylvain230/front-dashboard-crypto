export default interface CryptoAsset {
    id: string; // necessaire pour les tableaux Ant Design 
    name: string;
    amount: number; // 0.5 BTC
    usdValue: number; // 3000.00 $
    percentageOfPortfolio: number;
    trend24h: number;
}