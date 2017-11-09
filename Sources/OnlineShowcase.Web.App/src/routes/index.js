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
    name: 'aboutus.index',
    component: () => import('@/pages/AboutUs/Index')
  },

  {
    path: '/contactus',
    name: 'contactus.index',
    component: () => import('@/pages/ContactUs/Index')
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
  },

  {
    path: '/categories/:categoryId',
    component: () => import('@/pages/Home/Index')
  }
]
