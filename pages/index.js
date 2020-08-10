import React from 'react'
import RunList from "./runList";

const Home = () => {
    return (
      <div>
        <div>
          <main style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
            <h1>Run totals</h1>
          </main>
          <RunList />
        </div>
      </div>
    )
}

export default Home
