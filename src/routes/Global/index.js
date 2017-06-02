import Global from './components/Global'

//Sync route definition
export default (store) =>  ({
  path: 'Global',
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */

      /*  Return getComponent   */
      cb(null, Global)

    /* Webpack named bundle   */
    }, 'global')

  }
})
