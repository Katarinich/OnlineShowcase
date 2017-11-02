import Proxy from './Proxy'

class AccountProxy extends Proxy {
  constructor(parameters = {}) {
    super('categories', parameters)
  }
}

export default AccountProxy
