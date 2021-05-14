import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState
} from "react";
import { videos } from "../data/faker";
import reducer from "../Reducer/reducer";
export const VideoContext = createContext();

export function VideoProvider({ children }) {
  const [data, setData] = useState([]);
  const [state, dispatch] = useReducer(reducer, {
    watchlater: [],
    liked: [],
    history: [],
    playlists: [
      {
        id: 1,
        name: "playlist1",
        video: []
      }
    ]
  });
  useEffect(() => {
    document.title = "HealthTube";
    setData(videos);
  }, []);

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
