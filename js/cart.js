const cartProductsContainer = document.querySelector(".products-container");
const cartProducts = JSON.parse(localStorage.getItem("cart"));
const loggedUser = JSON.parse(localStorage.getItem("logged_user"));

const BASE_URL = "http://localhost:8000/api/products/";
(async () => {
  if (cartProducts) {
    cartProducts.forEach(async (pId) => {
      /// get product
      const response = await fetch(BASE_URL + pId, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${loggedUser.token}`,
        },
        method: "GET",
      });
      const product = await response.json();
      const productElm = document.createElement("div");
      // productElm.className = "row";
      // productElm.setAttribute("product-id", product.id);
      productElm.innerHTML = `
          <div class="item" product-id="${product.id} col-sm-4">
          <img src=${product.product_images[0].url} class="itemImage" />
          <p class="productName">${product.title}</p>
          <p class="itemDetails">
            ${product.description}
          </p>
          <div class="flex">
            <p class="price">${product.price} egp</p>
            <input type="number" class="quantity" min="0" value="1" />
          </div>
          </div>
          `;
      cartProductsContainer.appendChild(productElm);
      const total = calculateCost();
      document.querySelector(".totalCost").innerText = `Total: ${total} EGP`;
      updateTotal();
    });
  }
})();

const orderBtn = document.querySelector(".orderButton");

orderBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const total = document.querySelector(".totalCost").innerText.split(" ")[1];
  //   const userId = loggedUser.user.id;

  const productsElms = document.querySelectorAll(".item");
  const order_products = [];
  productsElms.forEach((productsElm) => {
    const quantity = productsElm.querySelector(".quantity").value;
    if (quantity > 0) {
      const product_id = productsElm.getAttribute("product-id");
      order_products.push({ product_id, quantity });
    }
  });

  const order = {
    total,
    order_products,
  };
  const POST_ORDER = "http://localhost:8000/api/orders";
  console.log(order);
  const response = await fetch(POST_ORDER, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${loggedUser.token}`,
    },
    method: "POST",
    body: JSON.stringify(order),
  });
  const result = await response.json();
  if (result.message != "failed") {
    alert("Order has been placed");
    localStorage.removeItem("cart");
    location.replace("./index.html");
        
  }

});

function calculateCost(){
  let total = 0;
  const productsElms = document.querySelectorAll(".item");
  productsElms.forEach(function(productElm){
    const quantity = parseInt(productElm.querySelector(".quantity").value);
    const price = Number(productElm.querySelector(".price").innerText.split(" ")[0]);
    
    total += quantity * price;
  })
  return total.toFixed(2);
}

function updateTotal(){

  const quantitites = document.querySelectorAll(".quantity");
  console.log(quantitites);
  
  for (let i = 0; i<quantitites.length;i++){
    quantitites[i].addEventListener("mouseup",function(){
      const total = calculateCost();
      document.querySelector(".totalCost").innerText = `Total: ${total} EGP`;
    })
    quantitites[i].addEventListener("keyup",function(){
      const total = calculateCost();
      document.querySelector(".totalCost").innerText = `Total: ${total} EGP`;
    })
  }
}

