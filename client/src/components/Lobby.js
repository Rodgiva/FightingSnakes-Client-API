import { useState } from "react";
import { ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";

const Lobby = (props) => {
  // const webSocketUrl = "ws://localhost:8080";
  const webSocketUrl = `wss://fightingsnakes-wsserver.onrender.com`;
  const webSocket = new WebSocket(webSocketUrl);
  const [users, setUsers] = useState([]);
  const [challenger, setChallenger] = useState("");
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  // next feature: display to the challenger a waiting widget
  const challenge = (user, opponent) => {
    webSocket.send(
      JSON.stringify({ req: "challenge", challengers: { user, opponent } })
    );
  };

  const challengeConfirm = (data) => {
    !data
      ? setChallenger("")
      : webSocket.send(
          JSON.stringify({
            req: "createInstance",
            challengers: { challenger, username },
          })
        );
  };

  webSocket.onopen = () => {
    if (!users.includes(username)) {
      webSocket.send(JSON.stringify({ req: "username", username }));
    }

    webSocket.onmessage = (msg) => {
      const data = JSON.parse(msg.data);

      if (data.res === "users") {
        setUsers(data.users);
      }

      if (data.res === "challenged") {
        if (data.challengers.opponent === username) {
          setChallenger(data.challengers.user);
        }
      }

      if (data.res === "instanceCreated") {
        if (
          data.challengers.challenger === username ||
          data.challengers.challenged === username
        ) {
          webSocket.close();
          navigate("/game", {
            state: {
              serverId: data.serverId,
              port: data.port,
              challengers: data.challengers,
            },
          });
        }
      }
    };
  };

  window.onbeforeunload = () => {
    webSocket.send(JSON.stringify({ req: "close", username }));
  };

  return (
    <>
      <h1>Lobby</h1>
      <ListGroup variant="flush">
        {users.map((user) => {
          if (user !== username) {
            return (
              <div key={user}>
                <ListGroup.Item
                  action
                  onClick={() => {
                    challenge(username, user);
                  }}
                >
                  {user}
                </ListGroup.Item>
              </div>
            );
          }
        })}
      </ListGroup>
      <Popup challenger={challenger} getData={challengeConfirm} />
    </>
  );
};

export default Lobby;
