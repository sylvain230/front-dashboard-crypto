import TokenMetadata from "@/interfaces/TokenMetadata";
import { getAllCoins } from "@/services/token";
import { useQuery } from "@tanstack/react-query";

export const useAssetsOptions = () => {
        const { data: tokens, isLoading } = useQuery<TokenMetadata[], Error> ({
        queryKey: ['coins'],
        queryFn: () => getAllCoins()
    });

    const options = tokens?.map(asset => ({
        value: asset.symbol,
        label: asset.name
    })) || []

    return { options , isLoading }
}