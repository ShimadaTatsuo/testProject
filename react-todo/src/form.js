import React from 'react'

export default class Form extends React.Component {
  constructor() {
    super()
    this.handleTodoSubmit = this.handleTodoSubmit.bind(this)
    this.valueChange = this.valueChange.bind(this)
    this.object = {
      value: ''
    }
  }
  handleTodoSubmit(e) {
    this.props.onTodoSubmit(this.object)
  }
  valueChange(e) {
    this.object.value = e.target.value
  }
  render() {
    return(
      <div>
        <input type="text" onChange={this.valueChange} />
        <button onClick={this.handleTodoSubmit}>submit</button>
      </div>
    )
  }
}