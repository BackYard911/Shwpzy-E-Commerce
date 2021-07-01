const checkIsLogged = async () => {
  const BASE_URL = "https://powerful-crag-63009.herokuapp.com/api/validate";
  const loggedUser = JSON.parse(localStorage.getItem("logged_user"));

  if (!loggedUser) {
    location.replace("./auth.html");
  } else {
    const response = await fetch(BASE_URL, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${loggedUser.token}`,
      },
      method: "GET",
    });
    const result = await response.json();
    if (result.message !== "validated") {
      localStorage.removeItem("logged_user")
      location.replace("./auth.html");
    }
  }
};

(async () => {
  await checkIsLogged();
})();
