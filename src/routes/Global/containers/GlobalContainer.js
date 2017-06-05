import { connect } from 'react-redux'


import Global from '../components/Global'


const mapStateToProps = (state) => ({
  global : state.global
})

export default connect(mapStateToProps)(Global)