export default function reducer(state, action) {
  switch (action.type) {
    case "ADD_TO_WATCHLATER":
      if (state.watchlater.some((video) => video.id === action.payload.id)) {
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
          (video) => video.id !== action.payload.id
        )
      };
    case "ADD_TO_LIKED_VIDEOS":
      if (state.liked.some((video) => video.id === action.payload.id)) {
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
        liked: state.liked.filter((video) => video.id !== action.payload.id)
      };
    case "ADD_TO_HISTORY":
      if (state.history.some((video) => video.id === action.payload.id)) {
        state.history = state.history.filter(
          (video) => video.id !== action.payload.id
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
        id: state.playlists.length + 1,
        name: action.payload,
        video: []
      };
      return {
        ...state,
        playlists: state.playlists.concat(playlist_new)
      };
    case "REMOVE_PLAYLIST":
      return {
        ...state,
        playlists: state.playlists.filter(
          (playlist1) => playlist1.name !== action.payload.name
        )
      };
    case "ADD_TO_PLAYLIST":
      const index = state.playlists.indexOf(action.payload.playlist);
      if (
        state.playlists[index].video.some(
          (video) => video.id === action.payload.id
        )
      )
        return state;
      else {
        state.playlists[index].video = state.playlists[index].video.concat(
          action.payload.video
        );
        state.playlists[index].video = state.playlists[index].video.filter(
          (x, i, a) => a.indexOf(x) === i
        );
        return state;
      }

    case "REMOVE_FROM_PLAYLIST":
      const index_remove = state.playlists.indexOf(action.payload.playlist);
      state.playlists[index_remove].videos = state.playlists[
        index_remove
      ].video.filter(
        (video1) => video1.id !== Object.values(action.payload.video)[0].id
      );
      return state;
    default:
      break;
  }
}
