
function goToCart() {
  window.location.href = "corb_page.html";
}
function goToHome() {
  window.location.href = "homepage1.html";
}

function goToThings() {
  window.location.href = "things_page.html";
}
function goToCorb(){
  window.location.href = "corb_page_order.html";
}


let cards = document.querySelectorAll(".card")
let btn_bye = document.querySelectorAll(".btn-bye")
let cart_counter = document.querySelector(".cart-counter")

document.addEventListener("DOMContentLoaded", () => {
  cart_counter.innerHTML = localStorage.getItem("count") || 0;

  let counter = +localStorage.getItem("count") || 0;

  window.addEventListener("click", (event) => {
    if (event.target.hasAttribute("data-cart")) {
      counter++;
      localStorage.setItem("count", counter);
      cart_counter.innerHTML = counter;

      let card = event.target.closest(".card")
        

      let product_info = {
          title: card.querySelector(".name").innerText,
          imgSrc: card.querySelector(".card-img").getAttribute("src"),
          desc: card.querySelector('.describtion').innerText,
          price: +card.querySelector('.price').innerText,
          id: card.querySelector('.id').innerText
      }

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(product_info);
      localStorage.setItem("cart", JSON.stringify(cart));   
     }
  });
});
