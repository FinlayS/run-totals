import React, {Component} from 'react'
import { getNasa } from "../src/server"
import { getTotals } from "../utils/get-totals";

export default class extends Component {
  static async getInitialProps() {

    const data = await getNasa();
    console.log("LAPS", getTotals());
    // console.log(data.url)
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
          <img src={this.props.imageUrl}/>
        </div>

        <div>
          {this.props.explanation}
        </div>

      </div>
    )
  }

}