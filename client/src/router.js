import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Users from './views/Users.vue';
import Organizations from './views/Organizations.vue';
import Profile from './views/Profile.vue';
import Feed from './views/Feed.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home/:id',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'feed',
          name: 'feed',
          component: Feed
        },
        {
          path: 'users',
          name: 'users',
          component: Users
        },
        {
          path: 'organizations',
          name: 'organizations',
          component: Organizations
        },
        {
          path: 'profile',
          name: 'profile',
          component: Profile
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
