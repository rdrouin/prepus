/* eslint key-spacing:0 */
export default () => ({
  server_host: process.env.HOST || 's6ie1702.gel.usherbrooke.ca',
  server_port: process.env.PORT || 80,
  compiler_fail_on_warning : false,
  compiler_hash_type       : 'chunkhash',
  compiler_devtool         : null,
  compiler_stats           : {
    chunks : true,
    chunkModules : true,
    colors : true
  }
})
