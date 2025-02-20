import { Navigate, Route, Routes as ReactRouterRoutes } from "react-router-dom"
import ErrorPage from "./error/ErrorPage"
import Token from "@/routes/token/Token"

const Routes = () => {

    return(
        <ReactRouterRoutes>
            <Route
            path={"/"}
            element={<Navigate to={"/"} replace />}
            errorElement={<ErrorPage />}
            />
            <Route
            path="token" 
            element={<Token />}
            errorElement={<ErrorPage />}
            />
        </ReactRouterRoutes>
    )
}

export default Routes