import axios from "axios";
import { getAuthToken } from "../Utils";

export async function getUserData() {
  try {
    const response = await axios.get(
      "https://HealthTube.bravesoldier.repl.co/user",
      {
        headers: {
          Authorization: getAuthToken()
        }
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error;
      if (serverError && serverError.response) {
        return {
          ...serverError.response.data,
          status: serverError.response.status
        };
      }
    }
  }
}

export async function likedAdd(video) {
  try {
    const response = await axios.post(
      "https://HealthTube.bravesoldier.repl.co/user/likedadd",
      {
        video
      },
      {
        headers: {
          Authorization: getAuthToken()
        }
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error;
      if (serverError && serverError.response) {
        return {
          ...serverError.response.data,
          status: serverError.response.status
        };
      }
    }
  }
}

export async function likedRemove(video) {
  try {
    const response = await axios.post(
      "https://HealthTube.bravesoldier.repl.co/user/likedremove",
      {
        video
      },
      {
        headers: {
          Authorization: getAuthToken()
        }
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error;
      if (serverError && serverError.response) {
        return {
          ...serverError.response.data,
          status: serverError.response.status
        };
      }
    }
  }
}

export async function watchlaterAdd(video) {
  try {
    const response = await axios.post(
      "https://HealthTube.bravesoldier.repl.co/user/watchlateradd",
      {
        video
      },
      {
        headers: {
          Authorization: getAuthToken()
        }
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error;
      if (serverError && serverError.response) {
        return {
          ...serverError.response.data,
          status: serverError.response.status
        };
      }
    }
  }
}

export async function watchlaterRemove(video) {
  try {
    const response = await axios.post(
      "https://HealthTube.bravesoldier.repl.co/user/watchlaterremove",
      {
        video
      },
      {
        headers: {
          Authorization: getAuthToken()
        }
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error;
      if (serverError && serverError.response) {
        return {
          ...serverError.response.data,
          status: serverError.response.status
        };
      }
    }
  }
}

export async function historyAdd(video) {
  try {
    const response = await axios.post(
      "https://HealthTube.bravesoldier.repl.co/user/historyadd",
      {
        video
      },
      {
        headers: {
          Authorization: getAuthToken()
        }
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error;
      if (serverError && serverError.response) {
        return {
          ...serverError.response.data,
          status: serverError.response.status
        };
      }
    }
  }
}

export async function historyClear(video) {
  try {
    const response = await axios.post(
      "https://HealthTube.bravesoldier.repl.co/user/historyclear",
      {
        video
      },
      {
        headers: {
          Authorization: getAuthToken()
        }
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error;
      if (serverError && serverError.response) {
        return {
          ...serverError.response.data,
          status: serverError.response.status
        };
      }
    }
  }
}

export async function playlistAdd(name) {
  try {
    const response = await axios.post(
      "https://HealthTube.bravesoldier.repl.co/playlist/",
      {
        name
      },
      {
        headers: {
          Authorization: getAuthToken()
        }
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error;
      if (serverError && serverError.response) {
        return {
          ...serverError.response.data,
          status: serverError.response.status
        };
      }
    }
  }
}

export async function playlistVideoAdd(playlistId, videoId) {
  try {
    const response = await axios.post(
      "https://HealthTube.bravesoldier.repl.co/playlist/video",
      {
        playlistId,
        videoId
      },
      {
        headers: {
          Authorization: getAuthToken()
        }
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error;
      if (serverError && serverError.response) {
        return {
          ...serverError.response.data,
          status: serverError.response.status
        };
      }
    }
  }
}

export async function playlistVideoRemove(playlistId, videoId) {
  try {
    const response = await axios.post(
      "https://HealthTube.bravesoldier.repl.co/playlist/videoremove",
      {
        playlistId,
        videoId
      },
      {
        headers: {
          Authorization: getAuthToken()
        }
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error;
      if (serverError && serverError.response) {
        return {
          ...serverError.response.data,
          status: serverError.response.status
        };
      }
    }
  }
}

export async function playlistRemove(playlistId) {
  try {
    const response = await axios.delete(
      "https://HealthTube.bravesoldier.repl.co/playlist/" + playlistId,
      {
        headers: {
          Authorization: getAuthToken()
        }
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error;
      if (serverError && serverError.response) {
        return {
          ...serverError.response.data,
          status: serverError.response.status
        };
      }
    }
  }
}
