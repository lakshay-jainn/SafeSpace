type LogoutFunction = () => void;

let logoutFunction: LogoutFunction | null = null;

export const setLogout = (fn: LogoutFunction) => {
  logoutFunction = fn;
};

export const logout = () => {
  if (logoutFunction) logoutFunction();
};
