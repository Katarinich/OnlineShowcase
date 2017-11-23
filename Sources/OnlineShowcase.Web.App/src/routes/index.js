const withPrefix = (prefix, routes) =>
  routes.map(route => {
    route.path = prefix + route.path
    return route
  })

const routes = [
  {
    path: '/',
    name: 'home.index',
    component: () => import('@/pages/Home/Index')
  },

  {
    path: '/access_token=:token',
    component: () => import('@/pages/Home/Index')
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

  ...withPrefix('/categories', [
    {
      path: '/:categoryId',
      name: 'category.show',
      component: () => import('@/pages/Home/Index')
    },
    {
      path: '/new',
      name: 'categories.new'
    }
  ]),

  ...withPrefix('/products', [
    {
      path: '/:productId',
      name: 'product.show',
      component: () => import('@/pages/Product/Index')
    },
    {
      path: '/new',
      name: 'products.new'
    }
  ])
]

export default routes
