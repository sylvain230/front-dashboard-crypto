import { Navigate, Route, Routes as ReactRouterRoutes } from "react-router-dom"
import ErrorPage from "./error/ErrorPage"
import Dashboard from "@/routes/dashboard/Dashboard"
import LoginPage from "./login/LoginPage"
import { ProtectedRoute } from "@/auth/ProtectedRoute"

const Routes = () => {

    return(
        <ReactRouterRoutes>

            {/* 1. Routes Publiques */}
            {/* Le login est accessible à tous. */}
            <Route path="/login" element={<LoginPage />} errorElement={<ErrorPage />} />

            {/* 2. Groupe de Routes Protégées */}
            {/* Tous les éléments ENFANTS de cette Route seront affichés UNIQUEMENT si ProtectedRoute autorise l'accès. */}
            <Route element={<ProtectedRoute />}>
            
                {/* Index : Redirige vers le Dashboard si l'utilisateur est connecté */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />

                {/* Routes privées : */}
                <Route path="/dashboard" element={<Dashboard />} errorElement={<ErrorPage />} />
                {/* <Route path="/wallet-details" element={<WalletDetails />} errorElement={<ErrorPage />} /> */}

            </Route>

            {/* 3. Route 404 de Secours */}
            <Route path="*" element={<ErrorPage />} />
            
        </ReactRouterRoutes>
    )
}

export default Routes