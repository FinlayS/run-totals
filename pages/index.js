import React, {Component} from 'react'
import RunList from "./runList";

export default class extends Component {

  render() {
    return (
      <div>
        <div>
          <h1>Run totals</h1>
        </div>
        <div>
          <RunList></RunList>
        </div>
      </div>
    )
  }
}
