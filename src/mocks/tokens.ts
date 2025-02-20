import LabelValue from "@/interfaces/CodeLabelValue";

export const mockedToken = new Promise<LabelValue[]>(resolve => resolve([
    {
        label: "Bitcoin",
        value: "BTC"
    },
    {
        label: "Ethereum",
        value: "ETH"
    }
]))
