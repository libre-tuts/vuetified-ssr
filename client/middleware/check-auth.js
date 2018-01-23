export default async ({ store }) => {
    if (!store.getters['auth/check'] && store.getters['auth/token']) {
        await store.dispatch('auth/fetchUser')
    }
}
