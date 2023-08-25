import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/user/account/LoginPage.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/user/account/RegisterPage.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/user/account/ProfilePage.vue')
  },
  {
    path:'/profile/edit',
    name:'profileEdit',
    component:()=> import('../views/user/account/EditProfile.vue')
  },
  {
    path:'/change/password',
    name:'changePassword',
    component:()=> import('../views/user/account/ChangePassword.vue')
  },
  {
    path: '/post',
    name: 'post',
    component: ()=> import('../views/user/post/PostPage.vue')
  },
  {
    path: '/add/post',
    name: 'AddPost',
    component: ()=> import('../views/user/post/AddPostPage.vue')
  },
  {
    path: '/post/detail/:id',
    name: 'viewPost',
    component: ()=>import('../views/user/post/ViewPost.vue')
  },
  {
    path: '/post/edit/:id',
    name: 'viewEdit',
    component: ()=>import('../views/user/post/EditPostPage.vue')
  },
  {
    path: '/view/route/:id',
    name: 'routeViewPost',
    component: ()=>import('../views/user/post/RouteViewPost.vue')
  },
  {
    path: '/list/category',
    name: 'categoryList',
    component: ()=>import('../views/user/category/CategoryListPage.vue')
  },
  {
    path: '/add/category',
    name: 'categoryAdd',
    component: ()=>import('../views/user/category/AddCategoryPage.vue')
  },
  {
    path: '/edit/category/:id',
    name: 'categoryEdit',
    component: ()=>import('../views/user/category/EditCategoryPage.vue')
  },
  {
    path: '/list/playList',
    name:'playListPage',
    component: ()=>import('./../views/user/playlist/playlistPage.vue')
  },
  {
    path:'/add/playlist',
    name:'addPlaylist',
    component: ()=>import('./../views/user/playlist/addPlaylist.vue')
  },
  {
    path:'/edit/playlist/:id',
    name:'editPlaylist',
    component: ()=>import('./../views/user/playlist/editPlaylist.vue')
  },
  {
    path:'/item/playlist/:id',
    name:'playlistItem',
    component: ()=>import('./../views/user/playlist/playlistItem.vue')
  },
  {
    path:'/add/item/playlist/:id',
    name:'addPlaylistItem',
    component:()=>import('./../views/user/playlist/addPlaylistItem.vue')
  },
  {
    path:'/users/list',
    name:'listPage',
    component:()=>import('./../views/user/userList/listPage.vue')
  },
  {
    path:'/view/profile/:id',
    name:'ViewProfile',
    component:()=>import('./../views/user/userList/ViewProfile.vue')
  },
  {
    path:'/list/message',
    name:'MessageList',
    component:()=>import('./../views/user/message/ListPage.vue')
  },
  {
    path:'/send/message/:reply_id',
    name:'sendMessage',
    component:()=>import('./../views/user/message/sendMessagePage.vue')
  },
  {
    path:'/view/message/:id',
    name:'viewMessage',
    component:()=>import('./../views/user/message/viewMessage.vue')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next)=>{
  if (to.name=='login' || to.name== 'register') {
    next();
  }else{
    if (localStorage.getItem('token')=='null') {
      next('/login');
    }else{
      next();
    }
    
  }
  
})

export default router
