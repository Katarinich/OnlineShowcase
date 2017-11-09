import Proxy from './Proxy'

class CategoresProxy extends Proxy {
  constructor(parameters = {}) {
    super('categories', parameters)
  }
}

export default CategoresProxy
