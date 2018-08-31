import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AppStateContext from '../../appState'
import InspectObject from 'components/InspectObject'
import './index.sass'

export default class Page extends Component {

  static propTypes = {
    appState: PropTypes.shape({
      location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
        params: PropTypes.object.isRequired,
      })
    })
  }

}
