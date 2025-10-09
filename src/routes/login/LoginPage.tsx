// Importation du hook RHF, le moteur de notre formulaire
import { useForm } from 'react-hook-form';
// Importation de l'interface des données attendues par l'API
import Credentials from '@/interfaces/credentials/Credentials';
// Notre hook personnalisé qui gère l'appel API et la mise à jour du contexte
import { useLogin } from '@/auth/useLogin';


const LoginPage = () =>  {
    // 1. Initialisation de RHF
    // Le hook est typé avec <Credentials> pour que TS connaisse les champs.
    const {
        register, // Fonction pour lier les inputs
        handleSubmit, // Enveloppeur pour gérer la soumission et la validation
        formState: { isSubmitting } // État pour le feedback utilisateur (UX)
    } = useForm<Credentials>();

    // 2. Intégration de la logique API
    // La page délègue l'appel API à notre hook personnalisé (Séparation des préoccupations).
    const { mutate } = useLogin();

    // 3. La fonction de soumission
    // Elle est appelée UNIQUEMENT par handleSubmit si le formulaire est valide.
    const onSubmit = (data: Credentials) => {
        mutate(data);
    }

    return (
        <div className="login-container">
            <h1>Connexion sécurisée</h1>

            {/* Raccordement du formulaire */}
            {/* handleSubmit(onSubmit) est le pattern standard RHF */}
            <form onSubmit={handleSubmit(onSubmit)}>

                { /* 1. Champ Username */
                /* {...register("username")} lie l'input au state interne de RHF */ }
                <input
                    type="text"
                    placeholder="Nom d'utilisateur"
                    {...register("username")}
                />

                { /* 2. Champ password 
                /* Le bouton est désactivé pendant l'envoi pour éviter les doubles clics. */ }
                <input
                    type="password"
                    placeholder="Mot de passe"
                    {...register("password")}
                />

                { /* 3. Bouton de soumission */ }
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Connexion n cours" : "Se connecter"}
                </button>
            </form>

        </div>
    )
};

export default LoginPage