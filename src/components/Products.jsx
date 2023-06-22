import { getProducts, deleteProduct, putProduct } from '../api/productsAPI'
import { useQuery, useMutation, useQueryClient } from 'react-query'

function Products() {
  // const query = useQuery()
  // query.isLoading //para saber si la consulta esta cargando
  // query.data //para saber si los datops estan
  // query.isError //para saber si nos respondio con un error
  const {
    isLoading,
    data: products,
    isError
  } = useQuery({
    queryKey: ['products'], //guarda en memoria cache
    queryFn: getProducts,
    select: products => products.sort((a, b) => b.id - a.id)
  })

  const queryClient = useQueryClient()
  const delProductM = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      console.log('producto eliminado :('),
        queryClient.invalidateQueries('products')
    }
  })
  const updateProdutM = useMutation({
    mutationFn: putProduct,
    onSuccess: () => {
      queryClient.invalidateQueries('products')
    }
  })

  if (isLoading) return <div>Loading...</div>
  else if (isError) return <div>Error...</div>

  return (
    <>
      <h1>products list</h1>
      {products.map(elm => {
        return (
          <div key={elm.id}>
            <h2>{elm.name}</h2>
            <p>{elm.description}</p>
            <button
              onClick={() => {
                delProductM.mutate(elm.id)
              }}>
              DELETE
            </button>
            <input
              onChange={e =>
                updateProdutM.mutate({
                  ...elm,
                  inStock: e.target.checked
                })
              }
              type='checkbox'
              checked={elm.inStock}
            />
            <label>inStock</label>
          </div>
        )
      })}
    </>
  )
}

export default Products
