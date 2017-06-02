import GlobalRoute from 'routes/Global'

describe('(Route) Global', () => {
  it('returns a route configuration object', () => {
    expect(typeof GlobalRoute({})).to.equal('object')
  })

  it('has a path \'global\'', () => {
    expect(GlobalRoute({}).path).to.equal('global')
  })
})