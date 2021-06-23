const cartProductsContainer = document.querySelector(".products-container");
const cartProducts = JSON.parse(localStorage.getItem("cart"));
const loggedUser = JSON.parse(localStorage.getItem("logged_user"));

const BASE_URL = "http://localhost:8000/api/products/";
(async () => {
  if (cartProducts) {
    cartProducts.forEach(async (pId) => {
      /// get product
      const response = await fetch(GET_PRODUCTS + pId, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${loggedUser.token}`,
        },
        method: "GET",
      });
      const product = await response.json();
      const productElm = document.createElement("div");
      productElm.className = "item";
      productElm.setAttribute("product-id", product.id);
      productElm.innerHTML = `
          <img src=${product.product_images[0].url} class="itemImage" />
                  <p class="productName">${product.title}</p>
                  <p class="itemDetails">
                    ${product.description}
                  </p>
                  <div class="flex">
                    <p class="price">${product.price}</p>
                    <input type="number" class="quantity" min="0" value="1" />
                  </div>
          `;
      cartProductsContainer.appendChild(productElm);
    });
  }
})();

const orderBtn = document.querySelector(".orderButton");

orderBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const total = document.querySelector(".totalCost").split(" ")[1];
  //   const userId = loggedUser.user.id;

  const productsElms = document.querySelector(".items");
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
  const response = await fetch(BASE_URL, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(order),
  });
  const result = await response.json();
  if (result.message != "failed") {
    location.replace("./index.html");
  }
});
