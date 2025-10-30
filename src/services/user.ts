import { httpClient } from "@/api/httpClient";
import Credentials from "@/interfaces/credentials/Credentials";

// --- 1. Fonction de Mutation ---
export const loginUser = async (credentials: Credentials) => {
    const { data } = await httpClient.post('/auth/login', credentials);

    // Le backend enverra le JWT dans un cookie, donc la réponse JSON peut être vide
    // ou contenir les informations de l'utilisateur (LoginResponse DTO).
    return data;
};