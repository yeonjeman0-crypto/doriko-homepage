// Dark mode composable with system preference detection
export const useDarkMode = () => {
  const isDark = ref(false)
  const colorMode = useColorMode()

  // Theme options
  const themes = ['light', 'dark', 'system'] as const
  type Theme = typeof themes[number]

  const currentTheme = ref<Theme>('system')

  // Initialize theme from localStorage or system preference
  const initializeTheme = () => {
    if (process.client) {
      const saved = localStorage.getItem('doriko-theme') as Theme
      if (saved && themes.includes(saved)) {
        currentTheme.value = saved
      }
      
      updateTheme()
    }
  }

  // Update theme based on current selection
  const updateTheme = () => {
    if (!process.client) return

    let shouldBeDark = false

    switch (currentTheme.value) {
      case 'dark':
        shouldBeDark = true
        break
      case 'light':
        shouldBeDark = false
        break
      case 'system':
      default:
        shouldBeDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        break
    }

    isDark.value = shouldBeDark
    colorMode.preference = shouldBeDark ? 'dark' : 'light'
    
    // Update document class for CSS
    if (shouldBeDark) {
      document.documentElement.classList.add('dark')
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.setAttribute('data-theme', 'light')
    }
  }

  // Set theme and save to localStorage
  const setTheme = (theme: Theme) => {
    currentTheme.value = theme
    localStorage.setItem('doriko-theme', theme)
    updateTheme()
  }

  // Toggle between light and dark
  const toggleTheme = () => {
    const newTheme = isDark.value ? 'light' : 'dark'
    setTheme(newTheme)
  }

  // Listen for system preference changes
  const watchSystemPreference = () => {
    if (!process.client) return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e: MediaQueryListEvent) => {
      if (currentTheme.value === 'system') {
        updateTheme()
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    
    onUnmounted(() => {
      mediaQuery.removeEventListener('change', handleChange)
    })
  }

  // Initialize on client
  onMounted(() => {
    initializeTheme()
    watchSystemPreference()
  })

  return {
    isDark: readonly(isDark),
    currentTheme: readonly(currentTheme),
    themes,
    setTheme,
    toggleTheme,
    updateTheme
  }
}