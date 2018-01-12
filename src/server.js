import { app, store, router } from './app.js'

const meta = app.$meta()
export default (context) => {
  router.push(context.url)
  return new Promise((resolve, reject) => {
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      // const preFetch = new Promise((resolve, reject) => {
      // })

      // call `asyncData()` on all matched route components
      Promise.all(matchedComponents.map(Component => {
        if (Component.preFetch) {
          return Component.preFetch({
            store,
            route: router.currentRoute
          })
        }
      })).then(() => {
        // After all preFetch hooks are resolved, our store is now
        // filled with the state needed to render the app.
        // When we attach the state to the context, and the `template` option
        // is used for the renderer, the state will automatically be
        // serialized and injected into the HTML as `window.__INITIAL_STATE__`.

        context.meta = meta
        context.state = store.state

        resolve(app)
      }).catch(reject)
    }, reject)
  })
}
