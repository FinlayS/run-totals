import React, {Component} from 'react'
import { getNasa } from "../src/server"

export default class extends Component {
  static async getInitialProps() {

    const data = await getNasa();
    console.log(data.url)
    return {
      title: data.title,
      imageUrl: data.url,
      explanation: data.explanation
    }
  }

  render() {
    return (
      <div>
        <div>
          {this.props.title}
        </div>

        <div>
          <iframe width="420" height="345" src={this.props.imageUrl}>
          </iframe>
        </div>

        <div>
          {this.props.explanation}
        </div>

      </div>
    )
  }

}