import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, createContext } from "react";
import Auth from "./auth/Auth";
import Login from "./components/Login";
import Lobby from "./components/Lobby";
import Game from "./components/Game";

export const AppContext = createContext();

function App() {
  const [token, setToken] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AppContext.Provider
      value={{ token, setToken, username, setUsername, password, setPassword }}
    >
      <div className="App">
        <Routes>
          <Route path="/" element={<Login title="Login" />} />
          <Route path="/register" element={<Login title="Register" />} />
          <Route
            path="/lobby"
            element={
              <Auth>
                <Lobby />
              </Auth>
            }
          />
          <Route
            path="/game"
            element={
              <Auth>
                <Game />
              </Auth>
            }
          />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
