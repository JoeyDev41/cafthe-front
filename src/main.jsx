// Point d'entrée de l'application React
// createRoot monte le composant App dans la div #root du fichier index.html
// StrictMode aide à détecter les problèmes pendant le développement

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
