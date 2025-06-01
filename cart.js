
let card_container = document.querySelector(".card-container");
let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
let totalSetPrice = 0;
let totalPrice = document.querySelector(".price");
let idArray = [];
let itemCards = {};
cart_counter = document.querySelector(".cart-counter");
let counter = parseInt(localStorage.getItem("count")) || 0;

let savedQuantities = JSON.parse(localStorage.getItem("quantities")) || {};

cartItems.forEach((item) => {
  if (!idArray.includes(item.id)) {
    idArray.push(item.id);
    
    // Встановлюємо початкову кількість
    if (!savedQuantities[item.id]) {
      savedQuantities[item.id] = 1;
    }
    
    // Отримуємо чисту кількість як число
    const quantity = parseInt(savedQuantities[item.id]) || 1;
    const unitPrice = parseFloat(item.price) || 0;
    const itemTotalPrice = (unitPrice * quantity).toFixed(2);
    
    // let cartItemHTML = `<div class="card mb-3" style="max-width: 540px;" data-id="${item.id}">
    // <div class="row g-0">
    //   <div class="col-md-4">
    //     <img src="${item.imgSrc}" class="img-fluid rounded-start" alt="...">
    //   </div>
    //   <div class="col-md-8">
    //     <div class="card-body">
    //       <h5 class="card-title">${item.title}</h5>
    //       <p class="card-text">${item.desc}</p>
    //       <p class="card-text"><small class="text-muted" data-price="${item.price}">${itemTotalPrice}</small></p>
    //      <div class="input-group">
    //       <input type="number" class="form-control" placeholder="Amount" value="${quantity}" min="1">
    //       <button class="btn btn-outline-secondary" type="button" data-action="minus">-</button>
    //       <button class="btn btn-outline-secondary" type="button" data-action="plus">+</button>
    //      </div>
    //     </div>
    //   </div>
    // </div>
    // </div>`;

          let cartItemHTML =  `<div class="cart-item" data-id="${item.id}">
  <div class="cart-item-image">
    <img src="${item.imgSrc}" alt="${item.title}">
  </div>
  <div class="cart-item-content">
    <h5 class="cart-item-title">${item.title}</h5>
    <p class="cart-item-description">${item.desc}</p>
    <p class="cart-item-price" data-price="${item.price}">${itemTotalPrice}</p>
    <div class="quantity-controls">
      <input type="text" class="quantity-input" placeholder="Amount" value="1">
      <button class="quantity-btn minus-btn" type="button" data-action="minus">-</button>
      <button class="quantity-btn plus-btn" type="button" data-action="plus">+</button>
    </div>
  </div>
</div>`;

    card_container.insertAdjacentHTML("beforeend", cartItemHTML);
    
    const addedCard = card_container.lastElementChild;
    const input = addedCard.querySelector(".quantity-input");
    input.value = quantity;
    
    itemCards[item.id] = addedCard;
    totalSetPrice += (unitPrice * quantity);
    
  } else {
    const existingCard = itemCards[item.id];
    const input = existingCard.querySelector(".quantity-input");
    let currentQuantity = parseInt(input.value) || 1;
    let newValue = currentQuantity + 1; 
    
    savedQuantities[item.id] = newValue;
    localStorage.setItem("quantities", JSON.stringify(savedQuantities));
    
    input.value = newValue;
    
    const priceElement = existingCard.querySelector(".cart-item-price");
    const unitPrice = parseFloat(priceElement.dataset.price);
    priceElement.innerText = (unitPrice * newValue).toFixed(2);
    
    totalSetPrice += unitPrice;
  }
});

// Збережемо кількості
localStorage.setItem("quantities", JSON.stringify(savedQuantities));

document.querySelectorAll("[data-action='minus']").forEach(btn => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".cart-item");
    const itemId = card.dataset.id;
    const input = btn.closest(".quantity-controls").querySelector(".quantity-input");
    
    let currentValue = parseInt(input.value) || 1;
    
    // Перевіряємо, чи можемо зменшити (якщо більше 1)
    if (currentValue > 1) {
      let newValue = currentValue - 1;
      
      // Оновлюємо кількості
      savedQuantities[itemId] = newValue;
      localStorage.setItem("quantities", JSON.stringify(savedQuantities));

      input.value = newValue;

      const priceElement = card.querySelector(".cart-item-price");
      const unitPrice = parseFloat(priceElement.dataset.price);
      priceElement.innerText = (unitPrice * newValue).toFixed(2);
      
      // Оновлюємо загальну ціну та лічильник
      totalSetPrice -= unitPrice;
      totalPrice.innerText = totalSetPrice.toFixed(2);
      counter--;
      localStorage.setItem("count", counter);
      cart_counter.innerHTML = counter;
    }
    // Якщо currentValue === 1, нічого не робимо
  });
});

document.querySelectorAll("[data-action='plus']").forEach(btn => {
  btn.addEventListener("click", () => {
    counter++;
    localStorage.setItem("count", counter);
    cart_counter.innerHTML = counter;

    const card = btn.closest(".cart-item");
    const itemId = card.dataset.id;
    const input = btn.closest(".quantity-controls").querySelector(".quantity-input");
    
    let currentQuantity = parseInt(input.value) || 1;
    let newValue = currentQuantity + 1;
    
    // Оновлюємо збережені кількості
    savedQuantities[itemId] = newValue;
    localStorage.setItem("quantities", JSON.stringify(savedQuantities));
    
    // Встановлюємо нове значення
    input.value = newValue;

    const priceElement = card.querySelector(".cart-item-price");
    const unitPrice = parseFloat(priceElement.dataset.price);
    priceElement.innerText = (unitPrice * newValue).toFixed(2);
    totalSetPrice += unitPrice;
    totalPrice.innerText = totalSetPrice.toFixed(2);
  });
});

