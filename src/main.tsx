import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ConfigProvider, theme } from 'antd'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // Données "stale" après 1 minute (à revalider en arrière-plan)
      refetchOnWindowFocus: true,
      refetchOnMount: false,
      retry: 3
    }
  }

})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
              theme={{
          // Ici, vous définissez votre thème personnalisé
          // Utilisez le mode sombre si vous préférez !
          algorithm: theme.darkAlgorithm, // Pour activer le mode sombre
          token: {
            // Couleurs principales
           // Couleurs principales pour le mode sombre (personnalisées)
            colorPrimary: '#1890ff', // Un bleu vif pour les éléments interactifs
            colorLink: '#1890ff',     // Les liens en bleu
            colorSuccess: '#52c41a',  // Vert classique pour le succès
            colorWarning: '#faad14',  // Jaune pour l'avertissement
            colorError: '#f5222d',    // Rouge classique pour l'erreur
            colorInfo: '#1890ff',     // Bleu pour l'information

            // Fond des éléments (Cartes, Table)
            colorBgContainer: '#2b2b2b', // Un gris très foncé pour le fond des cartes et des composants. Moins rouge que ce que vous avez.
            colorBgElevated: '#3a3a3a', // Un gris légèrement plus clair pour les popovers, dropdowns etc.

            // Texte
            colorText: '#e0e0e0', // Texte clair sur fond sombre
            colorTextSecondary: '#b0b0b0', // Texte secondaire plus clair

            // Bordures
            colorBorderSecondary: '#4a4a4a', // Bordures discrètes

            // Rayon des bordures (pour un look plus moderne si vous voulez)
            borderRadius: 8, // Des coins un peu plus arrondis pour les cartes et boutons
          },
          components: {
            Card: {
              headerBg: '#212121', // Fond de l'en-tête de la carte (plus foncé que le corps)
              // cardPadding: '16px 24px', // Ex: pour ajuster le padding interne si nécessaire
            },
            // Vous pouvez aussi styliser les boutons ici si vous le souhaitez
            // Button: {
            //   // defaultBg: 'transparent',
            //   // defaultBorderColor: '#606060',
            //   // defaultColor: '#e0e0e0',
            // },
          },
        }}>
        <App />
      </ConfigProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
)
