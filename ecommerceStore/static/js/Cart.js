const updateBtns = document.getElementsByClassName("update-cart");

for (let i = 0; i < updateBtns.length; i++) {
  updateBtns[i].addEventListener("click", () => {
    let btn = updateBtns[i];
    let productId = btn.dataset.product;
    let action = btn.dataset.action;
    console.log(productId, action);

    console.log("user", user);

    if (user === "AnonymousUser") {
      addCookieItem(productId, action);
    } else {
      updateUserOrder(productId, action);
    }
  });
}

function addCookieItem(productId, action) {
  if (action == "add") {
    if (cart[productId] == undefined) {
      cart[productId] = { quantity: 1 };
    } else {
      cart[productId]["quantity"] += 1;
    }
  }

  if (action == "remove") {
    cart[productId]["quantity"] -= 1;

    if (cart[productId]["quantity"] <= 0) {
      console.log("remove item");
      delete cart[productId];
    }
  }

  console.log("cart: ", cart);
  document.cookie = "cart=" + JSON.stringify(cart) + ";domain=;path=/";
  window.location.reload();
}

function updateUserOrder(productId, action) {
  console.log("User logged in");

  const url = "/update_item/";

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken,
    },
    body: JSON.stringify({
      productId,
      action,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("data", data);
      window.location.reload();
    });
}
