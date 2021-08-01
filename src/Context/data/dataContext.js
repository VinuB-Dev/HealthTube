import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState
} from "react";
import reducer from "./dataReducer";
import axios from "axios";

export const VideoContext = createContext();

export function VideoProvider({ children }) {
  const [data, setData] = useState([]);
  const [state, dispatch] = useReducer(reducer, {
    watchlater: [],
    liked: [],
    history: [],
    playlists: []
  });
  useEffect(() => {
    document.title = "HealthTube";
    loadVideos();
  }, []);

  const loadVideos = async () => {
    const response = await axios.get(
      "https://HealthTube.bravesoldier.repl.co/videos"
    );
    console.log(response.data.videos);
    setData(response.data.videos);
  };

  const ModalChange = () => {
    return useModal(!modal);
  };
  const [modal, useModal] = useState(0);
  const Filteredvideos = data;
  return (
    <VideoContext.Provider
      value={{ Filteredvideos, state, dispatch, modal, useModal, ModalChange }}
    >
      {children}
    </VideoContext.Provider>
  );
}

export function useVideo() {
  return useContext(VideoContext);
}
