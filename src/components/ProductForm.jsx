import { postProducts } from '../api/productsAPI'
import { useMutation, useQueryClient } from 'react-query'

export function Productform() {
  //permite interactuar con el contexto
  const queryClient = useQueryClient()

  //permite crear,modificar, eliminar
  const addProductM = useMutation({
    mutationFn: postProducts, //funcion a ejecutar
    onSuccess: () => {
      console.log('producto added :)')
      queryClient.invalidateQueries('products')
    }
  })

  const handleSubmmit = e => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const produc = Object.fromEntries(formData)
    addProductM.mutate({ ...produc, inStock: true })
  }

  return (
    <form onSubmit={handleSubmmit}>
      <input type='text' placeholder='name' name='name' />
      <input type='number' placeholder='price' name='price' />
      <input type='text' placeholder='description' name='description' />
      <button>Add Product</button>
    </form>
  )
}
