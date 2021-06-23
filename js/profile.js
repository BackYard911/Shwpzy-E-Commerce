
const logoutElm = document.querySelector("#logoutBtn");
const loggedUser = JSON.parse(localStorage.getItem("logged_user"));
const ordersTable = document.querySelector('.table > .tableBody');
const BASE_URL = "http://localhost:8000/api/";



(async () => {

  /// get orders 
 const response = await fetch(BASE_URL+"orders", {
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
    <td>${order.date}</td>
    <td>${order.price}EGP</td>
  </tr>
      `;
});
ordersTable.innerHTML=ordersElms;

})();


async function logout() {
    await fetch(BASE_URL+"logout", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${loggedUser.token}`,
        },
        method: "GET",
      });
      const result = await response.json();
  console.log(result);
      location.replace("./auth.html");
    
  }

logoutElm.addEventListener("submit", async (e) => {
    e.preventDefault();
    await logout();
  });

