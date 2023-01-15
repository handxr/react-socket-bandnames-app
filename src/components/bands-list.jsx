import React, { useEffect, useState } from "react";
import { SocketContext } from "../context/socket-context";

export const BandsList = () => {
  const { socket } = React.useContext(SocketContext);

  const [bands, setBands] = useState([]);

  const handleNameChange = (e, id) => {
    const newName = e.target.value;
    setBands((bands) =>
      bands.map((band) => {
        if (band.id === id) {
          band.name = newName;
        }
        return band;
      })
    );
  };

  const handleBlur = (id, name) => {
    socket.emit("change-band-name", { id, newName: name });
  };

  const handleVote = (id) => {
    socket.emit("vote-band", id);
  };

  const handleRemoveBand = (id) => {
    socket.emit("remove-band", id);
  };

  const createRows = () => {
    return bands.map((band) => (
      <tr key={band.id}>
        <td>
          <button
            className="btn btn-primary"
            onClick={() => handleVote(band.id)}
          >
            +1
          </button>
        </td>
        <td>
          <input
            type="text"
            className="form-control"
            value={band.name}
            onChange={(e) => handleNameChange(e, band.id)}
            onBlur={() => handleBlur(band.id, band.name)}
          />
        </td>
        <td>
          <h3>{band.votes}</h3>
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => handleRemoveBand(band.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  };

  useEffect(() => {
    socket.on("current-bands", (bands) => {
      setBands(bands);
    });
  }, [socket]);

  return (
    <>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Votes</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{createRows()}</tbody>
      </table>
    </>
  );
};
