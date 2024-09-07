
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'aos/dist/aos.css';
import { DarkContextProvider } from './Context/darkContext.jsx'


createRoot(document.getElementById('root')).render(
  <>
    <DarkContextProvider>
      <App />
    </DarkContextProvider>
  </>,
)
