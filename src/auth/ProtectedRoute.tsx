import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from './useAuth'; 
import { useEffect } from "react";

interface ProtectedRouteProps {
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = () => {

    // 1. Récupérer l'état d'authentification
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // 2. Logique de vérification et de redirection
    // On utilise useEffect pour effectuer la vérification aprés le premier rendu
    useEffect(() => {
        if(!isAuthenticated) {
            // Si non authentifié, rediriger l'utilisateur
            navigate('/login');
        }
    }, [isAuthenticated, navigate]); // Déclenchement si l'état change

    // 3. Rendu conditionnel
    if(isAuthenticated) {
        // Si authentifié, on affiche le contenu enfant (le Dashboard, etc.)
        // Si authentifié, Outlet rendra les composants enfants de la Route (Dashboard, WalletDetails).
        return <Outlet />; 
    }

    // On retourne null tant que l'état n'est pas chargé OU si on est en train de rediriger.
    return null;
}