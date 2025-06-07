
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

 // У файлі з кнопками "Додати до кошика"
window.addEventListener("click", (event) => {
  if (event.target.hasAttribute("data-cart")) {
    let card = event.target.closest(".card");
    let productId = card.querySelector('.id').innerText;
    
    // Перевіряємо, чи товар вже є в кошику
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existingItem = cart.find(item => item.id === productId);
    
    if (!existingItem) {
      // Додаємо новий товар тільки якщо його немає
      let product_info = {
        title: card.querySelector(".name").innerText,
        imgSrc: card.querySelector(".card-img").getAttribute("src"),
        desc: card.querySelector('.describtion').innerText,
        price: +card.querySelector('.price').innerText,
        id: productId
      }
      cart.push(product_info);
    } else {
      // Якщо товар вже є, просто додаємо ще один екземпляр
      cart.push(existingItem);
    }
    
    counter++;
    localStorage.setItem("count", counter);
    localStorage.setItem("cart", JSON.stringify(cart));
    cart_counter.innerHTML = counter;
  }
});
});

document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('searchForm');
    const searchInput = searchForm.querySelector('input[type="search"]');

    // Створюємо кнопку-хрестик
    const clearButton = document.createElement('span');
    clearButton.innerHTML = '&times;';
    clearButton.style.cursor = 'pointer';
    clearButton.style.fontSize = '28px';
    clearButton.style.position = 'absolute';
    clearButton.style.right = '65px';
    clearButton.style.top = '5px';
    clearButton.style.color = '#A58B71';
    clearButton.title = 'Очистити пошук';
    searchForm.style.position = 'relative';
    searchForm.appendChild(clearButton);

    const allCards = document.querySelectorAll('.card');

    // Основна функція фільтрації
    function filterCards(query) {
        const q = query.trim().toLowerCase();
        allCards.forEach(card => {
            const name = card.querySelector('.name').textContent.toLowerCase();
            if (name.includes(q)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Live-пошук при наборі
    searchInput.addEventListener('input', () => {
        filterCards(searchInput.value);
    });

    // Форма: блокування перезавантаження
    searchForm.addEventListener('submit', function (e) {
        e.preventDefault();
    });

    // Очистити пошук
    clearButton.addEventListener('click', function () {
        searchInput.value = '';
        filterCards('');
    });
});