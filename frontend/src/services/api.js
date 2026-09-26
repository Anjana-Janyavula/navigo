import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:8010/api",

  timeout: 30000,

  headers: {
    "Content-Type": "application/json"
  }
});

export const getApiErrorMessage = (error) => {
  if (error?.response?.data) {
    const detail = error.response.data.detail;

    if (typeof detail === "string") {
      return detail;
    }

    if (Array.isArray(detail)) {
      return detail
        .map((item) => item.msg || item.message)
        .filter(Boolean)
        .join("; ");
    }
  }

  if (error?.code === "ERR_NETWORK") {
    return "Backend is offline or unreachable. Start the API server on http://localhost:8010 and try again.";
  }

  if (error?.message) {
    return error.message;
  }

  return "Could not create profile";
};

export const createUser = (profile) =>
  api.post("/users", profile).then((r) => r.data);

export const sendChat = (payload) =>
  api.post("/chat", payload).then((r) => r.data);

export const getTimetable = () =>
  api.get("/timetable").then((r) => r.data);

export const getMap = () =>
  api.get("/navigation/map").then((r) => r.data);

export const getRoute = (payload) =>
  api.post("/navigation/route", payload)
    .then((r) => r.data);

export const health = () =>
  api.get("/health").then((r) => r.data);

export default api;