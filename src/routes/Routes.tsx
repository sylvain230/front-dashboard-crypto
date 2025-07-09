import { Navigate, Route, Routes as ReactRouterRoutes } from "react-router-dom"
import ErrorPage from "./error/ErrorPage"
import Dashboard from "@/routes/dashboard/Dashboard"
import AddTransaction from "./transaction/add-transaction/addTransaction"

const Routes = () => {

    return(
        <ReactRouterRoutes>
            <Route
                path={"dashboard"}
                element={<Dashboard/>}
                errorElement={<ErrorPage/>}
            />
            <Route
                path={"/"}
                element={<Navigate to={"/"} replace />}
                errorElement={<ErrorPage />}
            />
            <Route
                path="dashboard/transaction" 
                element={<AddTransaction />}
                errorElement={<ErrorPage />}
            />
            <Route
                path="/wallet-details"
            />
        </ReactRouterRoutes>
    )
}

export default Routes