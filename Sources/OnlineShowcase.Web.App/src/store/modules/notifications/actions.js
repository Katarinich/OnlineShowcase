import Proxy from '../../../proxies/NotificationsProxy'

export const create = (context, request) => {
  new Proxy().create(request)
}

export default {
  create
}
