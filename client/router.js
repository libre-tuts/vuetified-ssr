import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = () => import('~/pages/home').then(m => m.default || m)
const Login = () => import('~/pages/login').then(m => m.default || m)
const Register = () => import('~/pages/register').then(m => m.default || m)
const ForgotPassword = () => import('~/pages/forgot-password').then(m => m.default || m)
const ResetPassword = () => import('~/pages/reset-password').then(m => m.default || m)
const ContactUs = () => import('~/pages/contact-us').then(m => m.default || m)
// const NotFound = () => import('~/pages/notfound').then(m => m.default || m)
// const Settings = () => import('~/pages/settings/index').then(m => m.default || m)
// const SettingsProfile = () => import('~/pages/settings/profile').then(m => m.default || m)
// const SettingsPassword = () => import('~/pages/settings/password').then(m => m.default || m)

const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register },
    { path: '/forgot-password', name: 'forgot-password', component: ForgotPassword },
    { path: '/reset-password/:token', name: 'password-reset', component: ResetPassword },
    { path: '/contact-us', name: 'contact-us', component: ContactUs }
    // { path: '*', name: 'notfound', component: NotFound }

    // { path: '/settings', component: Settings, children: [
    //   { path: '', redirect: { name: 'settings.profile' }},
    //   { path: 'profile', name: 'settings.profile', component: SettingsProfile },
    //   { path: 'password', name: 'settings.password', component: SettingsPassword }
    // ] }
]

const scrollBehavior = (to, from, savedPosition) => {
    if (savedPosition) {
        return savedPosition
    }

    let position = {}

    if (to.matched.length < 2) {
        position = { x: 0, y: 0 }
    } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
        position = { x: 0, y: 0 }
    } if (to.hash) {
        position = { selector: to.hash }
    }

    return position
}

export function createRouter () {
    return new Router({
        routes,
        scrollBehavior,
        mode: 'history'
    })
}
