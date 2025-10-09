import './App.css'
import Routes from "@/routes/Routes"
import { AuthProvider } from './auth/AuthContext'
import { BrowserRouter } from 'react-router-dom'

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
