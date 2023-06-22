//fecth
//axios
import axios from 'axios'

const productsAPI = axios.create({
  baseURL: 'http://localhost:3000'
})

const getProducts = async () => {
  const res = await productsAPI.get('/products')
  console.log(res.data)
  return res.data
}

const postProducts = product => {
  productsAPI.post('/products', product)
}

const deleteProduct = id => {
  productsAPI.delete(`/products/${id}`)
}

const putProduct = product => {
  productsAPI.put(`/products/${product.id}`, product)
}

export { getProducts, postProducts, deleteProduct, putProduct }
//reactQuery
