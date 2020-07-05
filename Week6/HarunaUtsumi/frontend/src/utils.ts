export const getUserName = (): string => {
  if (!localStorage.getItem("username")) {
    const username = window.prompt("What is your name?");
    localStorage.setItem("username", username);
    return username;
  }
  return localStorage.getItem("username");
};
