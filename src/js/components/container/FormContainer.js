import React, { Component } from 'react'
import Input from '../presentational/Input'

class FormContainer extends Component {
  constructor() {
    super()
    this.state = {
      title: ''
    }
  }

  render() {
    return (
      <form id="article-form">
        <Input />
      </form>
    )
  }
}

export default FormContainer
