import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import Products from './components/Products'
import { Productform } from './components/ProductForm'

function App() {
  const queryClient = new QueryClient()
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <h1>HOLA REACTs</h1>
        <Productform />
        <Products />
      </QueryClientProvider>
    </>
  )
}

export default App
