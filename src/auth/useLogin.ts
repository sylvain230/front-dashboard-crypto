import { httpClient } from "@/api/httpClient";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import Credentials from "@/interfaces/credentials/Credentials"; 


// --- 1. Fonction de Mutation ---
const loginUser = async (credentials: Credentials) => {
    const { data } = await httpClient.post('/auth/login', credentials);

    // Le backend enverra le JWT dans un cookie, donc la réponse JSON peut être vide
    // ou contenir les informations de l'utilisateur (LoginResponse DTO).
    return data;
};


// --- 2. Hook Personnalisé ---
export const useLogin = () => {
  // 1. On récupère les fonctions et l'état de notre contexte global
  const { login } = useAuth();
  const navigate = useNavigate();
    return useMutation({
        mutationFn: loginUser,

        // Les callbacks sont le coeur de notre architecture
        onSuccess: (data) => {
      // 2. Le cookie est déjà dans le navigateur. On met juste l'état de React à jour.
      login(data);

      // 3. Redirection vers la page principale ou le dashboard
      navigate('/');

        },

        onError: (error) => {
            // Ici, vous gérez les messages d'erreur à afficher à l'utilisateur
            console.error('Login failed:', error);
        }
    });
};