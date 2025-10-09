import { useContext } from "react"; 
import { authContext, IAuthContext } from './AuthContext'; 

// Ce fichier consomme le contexte.

export const useAuth = (): IAuthContext => {
    // 1. Appel du contexte.
    const context = useContext(authContext);

    // 2. Vérification pour s'assurer que le hook est bien enveloppé dans le provider
    if(context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    // 3. Retour du context
    return context;
}