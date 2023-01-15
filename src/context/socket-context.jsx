import * as React from "react";
import { useSocket } from "../hooks/use-socket";

export const SocketContext = React.createContext();

export const SocketProvider = ({ children }) => {
  const { socket, online } = useSocket("http://localhost:8080");

  const memoedValues = React.useMemo(() => {
    return { socket, online };
  }, [socket, online]);

  return (
    <SocketContext.Provider value={memoedValues}>
      {children}
    </SocketContext.Provider>
  );
};
