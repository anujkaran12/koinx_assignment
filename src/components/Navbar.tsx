import { Moon, Sun } from 'lucide-react'
import brandLogo from '../assets/brandLogo.png'
import { useTheme } from '../context/useTheme'

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <nav className="flex h-12 w-full items-center justify-between bg-kx-surface px-5 md:px-14">
      <img className="block w-20" src={brandLogo} alt="Koinx logo" />
      <button
        className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-kx-border text-kx-text"
        type="button"
        onClick={toggleTheme}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      >
        {isDark ? <Sun size={16} /> : <Moon size={16} />}
      </button>
    </nav>
  )
}
