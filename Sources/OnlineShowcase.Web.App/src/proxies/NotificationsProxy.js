import Proxy from './Proxy'

class NotificationsProxy extends Proxy {
  constructor(parameters = {}) {
    super('notifications', parameters)
  }
}

export default NotificationsProxy
