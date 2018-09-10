import React from 'react'

import Form from './form.js'
import List from './list.js'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      result: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(todo) {
    this.setState({
      result: this.state.result.concat([todo.value])
    })
  }
  render() {
    return (
      <div>
        <Form onTodoSubmit={this.handleSubmit}/>
        <List result={this.state.result} />
      </div>
    )
  }
}

export default App
