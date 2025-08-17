import { createRouter, createWebHistory } from '@ionic/vue-router';

const routes = [
  	/* **** Layouts **** */
    {
		path: '/',
		redirect: '/login'
    },
    {
		path: '/no-internet',
		name: 'No internet',
		component: () => import('../views/layouts/noInternetPage.vue')
    },
	/* **** Layouts **** */

	/* **** Upkeep **** */
	{
		path: '/mantenimiento',
		name: 'UpkeepPage',
		component: () => import('../views/layouts/upkeep.vue')
    },
	/* **** Upkeep **** */

	/* **** Update **** */
	{
		path: '/actualizar',
		name: 'UpdatedPage',
		component: () => import('../views/layouts/updated.vue')
    },
	/* **** Update **** */

	/* **** Users **** */
	{
		path: '/login',
		name: 'Login',
		component: () => import('../views/users/loginPage.vue')
    },
    {
		path: '/registro',
		name: 'RegisterPage',
		component: () => import('../views/users/registerPage.vue')
    },
    {
		path: '/recuperar-contrasena',
		name: 'RecoverPasswordPage',
		component: () => import('../views/users/recoverPasswordPage.vue')
    },
	{
		path: '/home',
		name: 'Home',
		component: () => import('../views/users/homePage.vue')
    },
	{
		path: '/perfil',
		name: 'Profile',
		component: () => import('../views/users/profilePage.vue')
    },
	/* **** Users **** */
]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
})

export default router;