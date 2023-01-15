import * as React from "react";
import { SocketContext } from "../context/socket-context";

export const AddBand = () => {
  const { socket } = React.useContext(SocketContext);

  const nameRef = React.useRef();

  const addBand = (name) => {
    socket.emit("add-band", { name });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    addBand(name);
    nameRef.current.value = "";
  };

  return (
    <>
      <h3>Add Band</h3>

      <form>
        <input
          className="form-control"
          type="text"
          placeholder="Band name"
          ref={nameRef}
        />
        <button
          type="submit"
          className="btn btn-primary mt-2"
          onClick={handleSubmit}
        >
          Add
        </button>
      </form>
    </>
  );
};
