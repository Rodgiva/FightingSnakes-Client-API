import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Snake from "./Snake";
import Food from "./Food";

const Game = (props) => {
  const location = useLocation();
  const port = location.state.port;
  // const webSocketUrl = `ws://localhost:${port}`;
  const webSocketUrl = `wss://fightingsnakes-wsserver.onrender.com`;
  const username = localStorage.getItem("username");
  const [webSocketReady, setWebSocketReady] = useState(false);
  const [webSocket, setWebSocket] = useState(new WebSocket(webSocketUrl));
  const [gameOver, setGameOver] = useState("");
  const [begin, setBegin] = useState(true);
  const navigate = useNavigate();

  const [segmentsChallenger, setSegmentsChallenger] = useState([
    [9, 9],
    [9, 8],
  ]);

  const [segmentsChallenged, setSegmentsChallenged] = useState([
    [20, 20],
    [20, 21],
  ]);

  const [foodCoord, setFoodCoord] = useState([14, 14]);

  const status =
    location.state.challengers.challenger === localStorage.getItem("username")
      ? "challenger"
      : "challenged";

  const [input, setInput] = useState(
    status === "challenger" ? "right" : "left"
  );

  useEffect(() => {
    webSocket.onopen = () => {
      webSocket.send(JSON.stringify({ req: "init" }));
      setWebSocketReady(true);
    };
  }, []);

  setTimeout(() => {
    setBegin(false);
  }, 5000);

  const size = 600;
  const step = 20;

  webSocket.onmessage = (msg) => {
    const data = JSON.parse(msg.data);

    if (data.res === "init") {
      setFoodCoord(data.foodCoord);
    }

    if (data.res === "inputs") {
      const segments =
        status === "challenger" ? segmentsChallenger : segmentsChallenged;
      webSocket.send(
        JSON.stringify({
          req: "inputs",
          data: { status, input, segments },
        })
      );
    }

    if (data.res === "calculatedData") {
      if (data.foodEaten) {
        setFoodCoord(data.foodCoord);
      }

      if (data.status === "challenger") {
        setSegmentsChallenger(data.segments);
      } else if (data.status === "challenged") {
        setSegmentsChallenged(data.segments);
      }

      if (data.gameOver) {
        webSocket.close();
        if (data.status === status) {
          setGameOver("win");
        } else {
          setGameOver("lost");
        }
        setTimeout(() => {
          navigate("/lobby");
        }, 3000);
      }
    }
  };

  webSocket.onclose = function (event) {
    setWebSocketReady(false);
    setTimeout(() => {
      setWebSocket(webSocket);
    }, 1000);
  };

  // azerty keybord
  window.addEventListener("keydown", (e) => {
    switch (e.code) {
      case "ArrowUp":
      case "z":
        if (input !== "down") {
          setInput("up");
          break;
        }
      case "ArrowDown":
      case "s":
        if (input !== "up") {
          setInput("down");
          break;
        }
      case "ArrowLeft":
      case "q":
        if (input !== "right") {
          setInput("left");
          break;
        }
      case "ArrowRight":
      case "d":
        if (input !== "left") {
          setInput("right");
          break;
        }
    }
  });

  if (!webSocketReady) {
    if (gameOver === "win") {
      return (
        <>
          <h1>Game Over</h1>
        </>
      );
    } else if (gameOver === "lost") {
      return (
        <>
          <h1>You Win !</h1>
        </>
      );
    } else {
      return (
        <>
          <h1>Not connected to the server.</h1>
        </>
      );
    }
  } else {
    return (
      <>
        <h3 style={{ position: "absolute", top: "10px" }}>
          You are{" "}
          {status === "challenged" ? (
            <span style={{ color: "rgb(0, 220, 0)" }}>Green</span>
          ) : (
            <span style={{ color: "rgb(220, 0, 0)" }}>Red</span>
          )}
        </h3>
        <div
          className="game"
          style={{ width: size + 10 + "px", height: size + 10 + "px" }}
        >
          <Snake
            segments={segmentsChallenger}
            step={step}
            status={"challenger"}
          />
          <Snake
            segments={segmentsChallenged}
            step={step}
            status={"challenged"}
          />
          <Food foodCoord={foodCoord} step={step} />
        </div>
      </>
    );
  }
};

export default Game;
