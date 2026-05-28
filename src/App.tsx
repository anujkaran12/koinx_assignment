import { Navbar } from './components/Navbar'
import { TaxHarvestingPage } from './pages/TaxHarvestingPage'
import { PortfolioProvider } from './context/PortfolioProvider'
import { ThemeProvider } from './context/ThemeProvider'

function App() {
  return (
    <ThemeProvider>
      <PortfolioProvider>
        <div className="min-h-screen bg-kx-bg font-sans text-kx-text">
          <Navbar />
          <TaxHarvestingPage />
        </div>
      </PortfolioProvider>
    </ThemeProvider>
  )
}

export default App
