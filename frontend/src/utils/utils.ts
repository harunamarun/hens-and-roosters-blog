const getUserName = (): string => {
  if (!localStorage.getItem("username")) {
    // eslint-disable-next-line no-alert
    const username = window.prompt("What is your name?");
    localStorage.setItem("username", username);
    return username;
  }
  return localStorage.getItem("username");
};

export default getUserName;
