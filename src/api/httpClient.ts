import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

// 1. Définition du client global de TanStack Query
export const queryClient = new QueryClient({

});

// 2. Définition du client Axios
export const httpClient = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true
});