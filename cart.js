let card_container = document.querySelector(".card-container");
let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
let totalSetPrice = 0;
let totalPrice = document.querySelector(".price");
let itemCards = {};
cart_counter = document.querySelector(".cart-counter");
let counter = parseInt(localStorage.getItem("count")) || 0;

// Групуємо товари за ID для підрахунку кількості
let groupedItems = {};
cartItems.forEach(item => {
  if (groupedItems[item.id]) {
    groupedItems[item.id].quantity += 1;
  } else {
    groupedItems[item.id] = {
      ...item,
      quantity: 1
    };
  }
});

// Створюємо карточки тільки для унікальних товарів
Object.values(groupedItems).forEach((item) => {
  const quantity = item.quantity;
  const unitPrice = parseFloat(item.price) || 0;
  const itemTotalPrice = (unitPrice * quantity).toFixed(2);
  
  let cartItemHTML = `<div class="cart-item" data-id="${item.id}">
    <div class="cart-item-image">
      <img src="${item.imgSrc}" alt="${item.title}">
    </div>
    <div class="cart-item-content">
      <h5 class="cart-item-title">${item.title}</h5>
      <p class="cart-item-description">${item.desc}</p>
      <p class="cart-item-price" data-price="${item.price}">${itemTotalPrice}</p>
      <div class="quantity-controls">
        <input type="text" class="quantity-input" placeholder="Amount" value="${quantity}">
        <button class="quantity-btn minus-btn" type="button" data-action="minus">-</button>
        <button class="quantity-btn plus-btn" type="button" data-action="plus">+</button>
      </div>
    </div>
  </div>`;

  card_container.insertAdjacentHTML("beforeend", cartItemHTML);
  
  const addedCard = card_container.lastElementChild;
  itemCards[item.id] = addedCard;
  totalSetPrice += (unitPrice * quantity);
});

// Оновлюємо загальну ціну
if (totalPrice) {
  totalPrice.innerText = totalSetPrice.toFixed(2);
}

// Функція для оновлення localStorage з новими кількостями
function updateCartInStorage() {
  let newCart = [];
  Object.values(groupedItems).forEach(item => {
    const cardElement = itemCards[item.id];
    if (cardElement) {
      const currentQuantity = parseInt(cardElement.querySelector(".quantity-input").value) || 1;
      // Додаємо товар стільки разів, скільки вказано в кількості
      for (let i = 0; i < currentQuantity; i++) {
        newCart.push({
          id: item.id,
          title: item.title,
          imgSrc: item.imgSrc,
          desc: item.desc,
          price: item.price
        });
      }
    }
  });
  localStorage.setItem("cart", JSON.stringify(newCart));
  localStorage.setItem("count", newCart.length);
}

// Обробники для кнопок мінус
document.querySelectorAll("[data-action='minus']").forEach(btn => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".cart-item");
    const itemId = card.dataset.id;
    const input = btn.closest(".quantity-controls").querySelector(".quantity-input");
    
    let currentValue = parseInt(input.value) || 1;
    
    if (currentValue > 1) {
      let newValue = currentValue - 1;
      input.value = newValue;

      // Оновлюємо групований об'єкт
      groupedItems[itemId].quantity = newValue;

      const priceElement = card.querySelector(".cart-item-price");
      const unitPrice = parseFloat(priceElement.dataset.price);
      priceElement.innerText = (unitPrice * newValue).toFixed(2);
      
      // Оновлюємо загальну ціну
      totalSetPrice -= unitPrice;
      if (totalPrice) {
        totalPrice.innerText = totalSetPrice.toFixed(2);
      }
      
      // Оновлюємо лічильник
      counter--;
      if (cart_counter) {
        cart_counter.innerHTML = counter;
      }
      
      // Оновлюємо localStorage
      updateCartInStorage();
    }
  });
});

// Обробники для кнопок плюс
document.querySelectorAll("[data-action='plus']").forEach(btn => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".cart-item");
    const itemId = card.dataset.id;
    const input = btn.closest(".quantity-controls").querySelector(".quantity-input");
    
    let currentQuantity = parseInt(input.value) || 1;
    let newValue = currentQuantity + 1;
    
    input.value = newValue;

    // Оновлюємо групований об'єкт
    groupedItems[itemId].quantity = newValue;

    const priceElement = card.querySelector(".cart-item-price");
    const unitPrice = parseFloat(priceElement.dataset.price);
    priceElement.innerText = (unitPrice * newValue).toFixed(2);
    
    // Оновлюємо загальну ціну
    totalSetPrice += unitPrice;
    if (totalPrice) {
      totalPrice.innerText = totalSetPrice.toFixed(2);
    }
    
    // Оновлюємо лічильник
    counter++;
    if (cart_counter) {
      cart_counter.innerHTML = counter;
    }
    
    // Оновлюємо localStorage
    updateCartInStorage();
  });
});