import { LanguageProvider } from './lib/i18n'
import HomePage from './routes/index'

function App() {
  return (
    <LanguageProvider>
      <HomePage />
    </LanguageProvider>
  )
}

export default App
