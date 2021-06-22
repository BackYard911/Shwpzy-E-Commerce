// const categoryId = parseInt(localStorage.getItem("categoryId"));
const categoryId = 1;
const loggedUser = JSON.parse(localStorage.getItem("logged_user"));
const productsContainer = document.querySelector('.products > .container > .row');
const GET_PRODUCTS =
  "http://localhost:8000/api/products/filterByCategory/" + categoryId;



(async () => {

    /// get products 
   const response = await fetch(GET_PRODUCTS, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${loggedUser.token}`,
    },
    method: "GET",
  });
  const products = await response.json();
  console.log(products);
  let productsElms = "";
  //display products
  products.forEach((product) => {
    productsElms += `
        <div class="col-md-4">
                    <div class="product" product-id=${product.id}>
                        <div class="py-4">

                            <img src="images/electronicsProducts/camera.jpeg" class="img-fluid" alt="">
                        </div>
                        <div class="d-flex justify-content-around">
                            <h3>${product.title}</h3>
                            <div class="product-price d-flex justify-content-center">
                                <h5>${product.price}</h5>
                                <p>EGP</p>
                            </div>
                        </div>
                        <div class="description">
                            <p>${product.description}</p>
                        </div>
                    </div>
                </div>
        `;
  });
  productsContainer.innerHTML=productsElms;
})();
