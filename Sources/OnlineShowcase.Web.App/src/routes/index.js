export default [
  {
    path: '/',
    name: 'home.index',
    component: () => import('@/pages/Home/Index')
  },

  {
    path: '/login',
    name: 'login.index'
  },

  {
    path: '/aboutus',
    name: 'aboutus.index'
  },

  {
    path: '/contactus',
    name: 'contactus.index'
  },

  {
    path: '/logout',
    name: 'logout.index'
  },

  {
    path: '/products',
    children: [{
      path: 'new',
      name: 'products.new'
    }]
  },

  {
    path: '/categories',
    children: [{
      path: 'new',
      name: 'categories.new'
    }]
  }
]
