const updateUserLogin = (state, action) => {
  if (!action.isLoggedIn) {
    localStorage.removeItem("Auth");
  }
  return {
    ...state,
    isLoggedIn: action.isLoggedIn,
    name: action.isLoggedIn ? action.name : ""
  };
};

const loadUserData = (state, { user, playlist }) => {
  return { ...state, ...user, playlist: playlist };
};

export default function userReducer(state, action) {
  switch (action.type) {
    case "UPDATE_USER_LOGIN":
      return updateUserLogin(state, action.payload);
    case "UPDATE_USER_DATA":
      return loadUserData(state, action.payload);
    case "ADD_TO_WATCHLATER":
      if (state.watchlater.some((video) => video._id === action.payload._id)) {
        return state;
      } else {
        return {
          ...state,
          watchlater: state.watchlater.concat(action.payload)
        };
      }
    case "REMOVE_FROM_WATCHLATER":
      return {
        ...state,
        watchlater: state.watchlater.filter(
          (video) => video._id !== action.payload._id
        )
      };
    case "ADD_TO_LIKED_VIDEOS":
      if (state.liked.some((video) => video._id === action.payload._id)) {
        return state;
      } else {
        return {
          ...state,
          liked: state.liked.concat(action.payload)
        };
      }
    case "REMOVE_FROM_LIKED_VIDEOS":
      return {
        ...state,
        liked: state.liked.filter((video) => video._id !== action.payload._id)
      };
    case "ADD_TO_HISTORY":
      if (state.history.some((video) => video._id === action.payload._id)) {
        state.history = state.history.filter(
          (video) => video._id !== action.payload._id
        );
        return {
          ...state,
          history: state.history.concat(action.payload)
        };
      } else
        return {
          ...state,
          history: state.history.concat(action.payload)
        };
    case "CLEAR_HISTORY":
      return {
        ...state,
        history: []
      };
    case "CREATE_PLAYLIST":
      const playlist_new = {
        _id: action.payload.playlistId,
        name: action.payload.playlistName,
        videos: []
      };
      return {
        ...state,
        playlist: state.playlist.concat(playlist_new)
      };
    case "REMOVE_PLAYLIST":
      return {
        ...state,
        playlist: state.playlist.filter(
          (playlist1) => playlist1.name !== action.payload.name
        )
      };
    case "ADD_TO_PLAYLIST":
      const index = state.playlist.indexOf(action.payload.playlist);
      console.log(state);
      if (
        state.playlist[index].videos?.some(
          (video) => video._id === action.payload._id
        )
      )
        return state;
      else {
        state.playlist[index].videos = state.playlist[index].videos.concat(
          action.payload.video
        );
        state.playlist[index].videos = state.playlist[index].videos.filter(
          (x, i, a) => a.indexOf(x) === i
        );
        return state;
      }

    case "REMOVE_FROM_PLAYLIST":
      const index_remove = state.playlist.indexOf(action.payload.playlist);
      console.log(state.playlist[index_remove].videos);
      state.playlist[index_remove].videos = state.playlist[
        index_remove
      ].videos.filter(
        (video1) => video1._id !== Object.values(action.payload.video)[0]._id
      );
      return state;
    default:
      break;
  }
}
