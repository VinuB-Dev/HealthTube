import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { VideoProvider } from "./Context/data/dataContext";
import { UserProvider } from "./Context/user/userContext";
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Router>
      <VideoProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </VideoProvider>
    </Router>
  </StrictMode>,
  rootElement
);
