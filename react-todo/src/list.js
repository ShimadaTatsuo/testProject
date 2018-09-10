import React from 'react'

export default class List extends React.Component {
  render() {
    return(
      <div>
        {this.props.result.map((item, idx) => {
          return (
            <p key={idx}>{item}</p>
          )
        })}
      </div>
    )
  }
}