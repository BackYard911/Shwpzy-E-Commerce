const logoutElm = document.querySelector("#logoutBtn");
const loggedUser = JSON.parse(localStorage.getItem("logged_user"));
const ordersTable = document.querySelector(".table > .tableBody");
const BASE_URL = "https://powerful-crag-63009.herokuapp.com/api/";

(async () => {
  /// get orders
  const response = await fetch(BASE_URL + "orders", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${loggedUser.token}`,
    },
    method: "GET",
  });
  const orders = await response.json();
  console.log(orders);
  let ordersElms = "";
  //display orders
  orders.forEach((order) => {
    ordersElms += `
    <tr> 
    <td>${order.id}</td>
    <td>${order.created_at.split("T")[0]}</td>
    <td>${order.total}EGP</td>
  </tr>
      `;
  });
  ordersTable.innerHTML = ordersElms;
})();

async function logout() {
 const response= await fetch(BASE_URL + "logout", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${loggedUser.token}`,
    },
    method: "POST",
  });
  const result = await response.json();
  console.log(result);
  localStorage.removeItem("logged_user");
  location.replace("./auth.html");
}

logoutElm.addEventListener("click", async (e) => {
  e.preventDefault();
  await logout();
});
