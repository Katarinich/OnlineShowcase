import Proxy from './Proxy'

class ProductsProxy extends Proxy {
  constructor(parameters = {}) {
    super('products', parameters)
  }
}

export default ProductsProxy
