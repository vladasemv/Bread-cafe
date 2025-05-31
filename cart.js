cart_counter = document.querySelector(".cart-counter");
let card_container = document.querySelector(".card-container");

let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
let countItems = localStorage.getItem("count");
cart_counter.innerHTML = countItems;
let totalSetPrice = 0;
let totalPrice = document.querySelector(".price")

cartItems.forEach((item) => {
  let cartItemHTML = `<div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${item.imgSrc}" class="img-fluid rounded-start" alt="..." style="width: 160px; position: relative; top: 100px;">
    </div>
    <div class="col-md-8">
      <div class="card-body" style="background-color: #F5E9DA; width: 650px; height: 280px; border-radius: 20px; position: relative; left: 30px;">
        <h5 class="card-title" style="color: #A58B71; font-size: 27px; position: relative; left: 240px; top: 60px;">${item.title}</h5>
        <p class="card-text" style="color: #A58B71; font-size: 17px; position: relative; left: 240px; top: 25px;">${item.desc}</p>
        <p class="card-text" style=" color: #CBAE92; font-size: 23px; position: relative; left: 240px; top: 20px;"><small class="text-muted" data-price="${item.price}">${item.price}</small></p>
       <div class="input-group">
        <input type="text" class="form-control" style=" position: relative; left: 130px;" placeholder="Amount" value="1">
        <button class="btn btn-outline-secondary" style=" position: relative; bottom: 10px; left: 130px; height: 50px; background-color: #FFFFFF; color: #A58B71; border: 3px solid #FFF8F0; width: 30px; border-radius: 20px;" type="button" data-action = "minus">-</button>
        <button class="btn btn-outline-secondary" style=" position: relative; bottom: 10px; left: 130px; height: 50px; background-color: #FFFFFF; color: #A58B71; border: 3px solid #FFF8F0; width: 30px; border-radius: 20px;" type="button" data-action = "plus">+</button>
       </div>
      </div>
    </div>
  </div>
  </div>`;

      totalSetPrice += +item.price;
  card_container.insertAdjacentHTML("beforeend", cartItemHTML);


});

document.querySelectorAll("[data-action='minus']").forEach(btn => {
  btn.addEventListener("click", () => {
    const input = btn.closest(".input-group").querySelector(".form-control");
    const currentValue = parseInt(input.value);

    let newValue = Math.max(1, parseInt(input.value) - 1);
    input.value = newValue;

    const priceElement = btn.closest(".card").querySelector(".text-muted");
    const unitPrice = parseFloat(priceElement.dataset.price);
    priceElement.innerText = (unitPrice * newValue).toFixed(2);
    if(currentValue != 1){
      totalSetPrice -= unitPrice;
    totalPrice.innerText = totalSetPrice;
    } 
    
  });
});

document.querySelectorAll("[data-action='plus']").forEach(btn => {
  btn.addEventListener("click", () => {
    const input = btn.closest(".input-group").querySelector(".form-control");
    let newValue = parseInt(input.value) + 1;
    input.value = newValue;

    const priceElement = btn.closest(".card").querySelector(".text-muted");
    const unitPrice = parseFloat(priceElement.dataset.price);
    priceElement.innerText = (unitPrice * newValue).toFixed(2);
    totalSetPrice += unitPrice;
    totalPrice.innerText = totalSetPrice;
  });
});

totalPrice.innerText = totalSetPrice;