import React, { Component } from 'react'

const newData = {
  data: 'data from HOC...'
}

const MyHOC = ComposedComponent => class extends Component {
  componentDidMount() {
    this.setState({
      data: newData.data
    })
  }
  render() {
    return <ComposedComponent {...this.props} {...this.state} />
  }
}

const MyComponent = (props) => {
  return <div>{props.data}</div>
}

export default MyHOC(MyComponent)
