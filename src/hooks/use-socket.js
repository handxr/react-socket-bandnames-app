import * as React from "react";
import io from "socket.io-client";

export const useSocket = (serverPath) => {
  const [online, setOnline] = React.useState(false);

  const socket = React.useMemo(
    () =>
      io.connect(serverPath, {
        transports: ["websocket"],
      }),
    [serverPath]
  );

  React.useEffect(() => {
    setOnline(socket.connected);
  }, [socket]);

  React.useEffect(() => {
    socket.on("connect", () => {
      setOnline(true);
    });
  }, [socket]);

  React.useEffect(() => {
    socket.on("disconnect", () => {
      setOnline(false);
    });
  }, [socket]);

  return { socket, online };
};
