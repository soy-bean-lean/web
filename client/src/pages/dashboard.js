import React from "react";
import "../pages/style/dashboard.css";

function Home() {
  return (
    <div className="main">
      <div className="progress">
        <div className="progressBar">
          <div className="progressColour">
           
          </div>
        </div>
      </div>

      <div className="Charts">
        <div className="chart1">chart1</div>
        <div className="chart2">chart2</div>
      </div>

    <div className="OnGoing">
    <div className="ONG" >ongoing</div>

    </div>
    </div>
  );
}

export default Home;
