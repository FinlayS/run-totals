import React, {Component} from 'react'
import { getTotals } from "../utils/get-totals";
import { getPace} from "../utils/get-pace";
import { getRunList } from "../utils/getRuns";
import RunList from "./runList";

export default class extends Component {
  static async getInitialProps() {

    getRunList()

    const allTimes = getTotals({})

    const totalPace = getPace(
      allTimes.totalTimeSecs,
      allTimes.totalDistance
    )

    const activePace = getPace(
      allTimes.activeTimeSeconds,
      allTimes.activeDistance
    )

    console.log('index-allTimes',allTimes)

    return {
      title: "Run totals",
      totalTime: allTimes.totalTime,
      totalDistance: allTimes.totalDistance,
      totalAveragePace: totalPace,
      activeTime: allTimes.activeTime,
      activeDistance: allTimes.activeDistance,
      activeAveragePace: activePace
    }
  }

  render() {
    return (
      <div>
        <div>
          <h1>{this.props.title}</h1>
        </div>

        <div>
          <RunList></RunList>
        </div>

        <div>
          Total Distance {this.props.totalDistance}, Total Time {this.props.totalTime}, Total ave Pace {this.props.totalAveragePace},
        </div>

        <div>
          Active Distance {this.props.activeDistance}, Active Time {this.props.activeTime}, Active ave Pace {this.props.activeAveragePace},
        </div>
      </div>
    )
  }

}