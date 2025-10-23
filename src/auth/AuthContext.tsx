import { queryClient } from "@/api/httpClient";
import LoginResponse from "@/interfaces/credentials/LoginResponse";
import { createContext, useMemo, useState } from "react";

// Ce fichier définit le contrat (IAuthContext), le contexte (authContext), et le fournisseur (AuthProvider).

export interface IAuthContext {
    user: LoginResponse | null; 
    isAuthenticated: boolean;
    login: (userData: LoginResponse) => void;
    logout: () => void;
}

// 1. Création du contexte
export const authContext = createContext<IAuthContext | undefined>(undefined);

// 2. Le composant Provider
// On définit une interface de props vide si le composant n'attend pas d'autres props
// Sinon, on utilise React.FC sans générique pour simplifier :
export const AuthProvider : React.FC<React.PropsWithChildren> = ({ children }) => {
    // État principal : l'utilisateur connecté ou null
    const [user, setUser] = useState<LoginResponse | null>(null);

    // Fonction de connexion : mise à jour de l'état
    const login = (userData: LoginResponse) => {
        setUser(userData);
    };

    // Fonction de déconnexion : vide l'état
    const logout = () => {
        // Action 1 : Vider l'état de l'utilisateur
        setUser(null);

        // Action 2 : Vider le cache de TanStack Query pour effacer toutes les données précédentes
        queryClient.clear();

        // Action 3 : Redirection
        window.location.href = '/login';

    };

    // La valeur exposée par le contexte
    const contextValue = useMemo(() => ({
        user,
        isAuthenticated: !!user, // Propriété calculée
        login,
        logout,
    }), [user]);

    // Retourne le provider
    return <authContext.Provider value={contextValue}>
        {children}
    </authContext.Provider>
    
};