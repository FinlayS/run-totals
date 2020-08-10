import React from 'react'
import Runs from "../components/runs/runs";

const Home = () => {
    return (
      <div>
        <div>
          <main style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
            <h1>Run totals</h1>
          </main>
          <Runs />
        </div>
      </div>
    )
}

export default Home
