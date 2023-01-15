import * as React from "react";

import { AddBand } from "./components/add-band";
import { BandChart } from "./components/band-chart";
import { BandsList } from "./components/bands-list";
import { SocketContext } from "./context/socket-context";

function App() {
  const { online } = React.useContext(SocketContext);

  return (
    <div className="container">
      <div className="alert">
        <p>
          Service status:{" "}
          {online ? (
            <span className="text-success">Online</span>
          ) : (
            <span className="text-danger">Offline</span>
          )}
        </p>
      </div>

      <h1>Band Names</h1>
      <hr />

      <div className="row">
        <div className="col">
          <BandChart />
        </div>
      </div>

      <div className="row">
        <div className="col-8">
          <BandsList />
        </div>
        <div className="col-4">
          <AddBand />
        </div>
      </div>
    </div>
  );
}

export default App;
