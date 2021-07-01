const categoryId = parseInt(localStorage.getItem("catogoryId"));
// const categoryId = 1;
const loggedUser = JSON.parse(localStorage.getItem("logged_user"));
const productsContainer = document.querySelector('.products > .container > .row');
const GET_PRODUCTS =
  "https://powerful-crag-63009.herokuapp.com/api/products/filterByCategory/" + categoryId;



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
                        <div class="py-4 img-container">

                            <img src="${product.product_images[0].url}" class="img-fluid" alt="">
                        </div>
                        <div class="d-flex justify-content-around px-4">
                            <h3>${product.title}</h3>
                            <div class="product-price d-flex justify-content-center">
                                <h5>${product.price}</h5>
                                <p>EGP</p>
                            </div>
                        </div>
                        <div class="description">
                            <p>${product.description}</p>
                        </div>
                        <button id="addToCartBtn" class="btn rounded btn-grad">Add to Cart</button>
                    </div>
                </div>
        `;
  });
  productsContainer.innerHTML=productsElms;

  const pageProducts = document.querySelectorAll(".product");

  var myCart = [];

  if(localStorage.getItem("cart")!=null){
    myCart = JSON.parse(localStorage.getItem("cart"));
  }
  else{
    myCart = []
  }

for(let i = 0;i<pageProducts.length;i++){
  pageProducts[i].addEventListener("click",function(e){
    if(e.target.id === "addToCartBtn"){
    if(!myCart.includes(pageProducts[i].getAttribute("product-id"))){

      myCart.push(pageProducts[i].getAttribute("product-id"));
      localStorage.setItem("cart",JSON.stringify(myCart));
    }
    else{
      alert("Item already in cart");
    }
    }
  })
}


})();


console.log(categoryId);