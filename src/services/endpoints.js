const endpoints = {
  USER_SIGNUP: "/auth/signUp",
  USER_LOGIN: "/auth/login",
  GET_USER: "/auth/me",
  ADD_TASK: "/tasks",
  GET_TASKS: (query) => "/tasks" + (query ? `?${query}` : ""),
  DELETE_TASK: (id) => `/tasks/${id}`,
  UPDATE_TASK: (id) => `/tasks/${id}`,
};

export default endpoints;
