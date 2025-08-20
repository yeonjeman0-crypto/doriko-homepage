// Global error handling composable
export const useErrorHandler = () => {
  const errors = ref<Array<{
    id: string
    message: string
    type: 'error' | 'warning' | 'info'
    timestamp: Date
    context?: string
  }>>([])

  const isLoading = ref(false)
  const loadingText = ref('')

  // Add error to the error list
  const addError = (
    message: string,
    type: 'error' | 'warning' | 'info' = 'error',
    context?: string
  ) => {
    const error = {
      id: `error-${Date.now()}-${Math.random()}`,
      message,
      type,
      timestamp: new Date(),
      context
    }
    
    errors.value.push(error)
    
    // Auto-remove after 5 seconds for non-critical errors
    if (type !== 'error') {
      setTimeout(() => {
        removeError(error.id)
      }, 5000)
    }
    
    // Log to console for debugging
    console[type](`[${context || 'App'}] ${message}`, error)
    
    return error.id
  }

  // Remove specific error
  const removeError = (id: string) => {
    const index = errors.value.findIndex(error => error.id === id)
    if (index > -1) {
      errors.value.splice(index, 1)
    }
  }

  // Clear all errors
  const clearErrors = () => {
    errors.value = []
  }

  // Loading state management
  const setLoading = (loading: boolean, text = '로딩 중...') => {
    isLoading.value = loading
    loadingText.value = text
  }

  // Async operation wrapper with error handling
  const withErrorHandling = async <T>(
    operation: () => Promise<T>,
    options: {
      loadingText?: string
      errorMessage?: string
      context?: string
    } = {}
  ): Promise<T | null> => {
    const { 
      loadingText: customLoadingText = '처리 중...',
      errorMessage = '작업 중 오류가 발생했습니다.',
      context = 'Operation'
    } = options

    try {
      setLoading(true, customLoadingText)
      const result = await operation()
      return result
    } catch (error) {
      const message = error instanceof Error ? error.message : errorMessage
      addError(message, 'error', context)
      return null
    } finally {
      setLoading(false)
    }
  }

  // Handle network errors specifically
  const handleNetworkError = (error: Error) => {
    if (!navigator.onLine) {
      addError('인터넷 연결을 확인해주세요.', 'warning', 'Network')
    } else if (error.message.includes('fetch')) {
      addError('서버와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.', 'error', 'Network')
    } else {
      addError('네트워크 오류가 발생했습니다.', 'error', 'Network')
    }
  }

  // Form validation error handler
  const handleValidationError = (field: string, message: string) => {
    addError(`${field}: ${message}`, 'warning', 'Validation')
  }

  // Global error handler setup
  const setupGlobalErrorHandler = () => {
    if (process.client) {
      // Handle unhandled promise rejections
      window.addEventListener('unhandledrejection', (event) => {
        event.preventDefault()
        const error = event.reason
        const message = error instanceof Error ? error.message : '예상치 못한 오류가 발생했습니다.'
        addError(message, 'error', 'Unhandled Promise')
      })

      // Handle JavaScript errors
      window.addEventListener('error', (event) => {
        addError(event.message, 'error', 'JavaScript Error')
      })

      // Handle network status changes
      window.addEventListener('online', () => {
        addError('인터넷 연결이 복구되었습니다.', 'info', 'Network')
        setTimeout(() => {
          clearErrors()
        }, 2000)
      })

      window.addEventListener('offline', () => {
        addError('인터넷 연결이 끊어졌습니다.', 'warning', 'Network')
      })
    }
  }

  // Initialize error handler on mount
  onMounted(() => {
    setupGlobalErrorHandler()
  })

  return {
    errors: readonly(errors),
    isLoading: readonly(isLoading),
    loadingText: readonly(loadingText),
    addError,
    removeError,
    clearErrors,
    setLoading,
    withErrorHandling,
    handleNetworkError,
    handleValidationError
  }
}