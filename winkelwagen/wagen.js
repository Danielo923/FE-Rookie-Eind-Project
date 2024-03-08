let totaal = 0;
function showCart() {
    let itemNumber = -1;
    totaal = 0;
    let products = "Winkelmandje is leeg";
    products = JSON.parse(localStorage.getItem("winkelmandje"));
    products.sort((a, b) => a.id - b.id);
    const alleProducten = document.getElementById('inhoud');
    alleProducten.innerHTML = '';
    for (let i = 0; i < products.length; i++) {
        itemNumber++;
        const item = products[i];
        const listItem = document.createElement('div');
        listItem.classList.add('producten');
        listItem.innerHTML = `
        <img class="top3-hero-image" src="../${item.foto}" alt="Foto of ${item.naam}"></td>
        <p>${item.naam} | ${item.beschrijving}</p>
        <h2 class="hero-placement">${item.prijs}</h2>
        <h3 id="button${i}" class="deleteButton" onclick="deleteCartItems(${item.id})">Delete</h3>
        `;
        alleProducten.appendChild(listItem);
        totaal += item.prijs;
    }
    if (products.length <= 0) {
        alleProducten.innerHTML = `Winkelmandje is leeg`;
        console.log("hallo");
    }
    checkForCart();
}
showCart();
function showCost() {
    const totalCost = document.getElementById('totaal');
    if (totalCost) {
        totalCost.innerHTML = `Totaal: ${totaal} Credits`;
    }
}
showCost();
function deleteCartItems(id) {
    let cart = JSON.parse(localStorage.getItem("winkelmandje"));
    for (let i = 0; i < cart.length; i++) {
        if (parseInt(cart[i].id, 10) === id) {
            cart.splice(i, 1);
            break;
        }
    }
    localStorage.setItem("winkelmandje", JSON.stringify(cart));
    showCart();
    showCost();
    if (cart.length <= 0) {
        localStorage.removeItem("winkelmandje");
    }
    checkForCart();
}
function checkForCart() {
    if (localStorage.getItem("winkelmandje")) {
        const retdot = document.getElementById("retDot");
        retdot.innerHTML = `
        <img src="../web_fotos/wagen-wit.png" alt="cart" class="winkelwagen">
        <h1 class="dot"></h1>
        `;
    } else {
        const retdot = document.getElementById("retDot");
        retdot.innerHTML = `    
        <img src="../web_fotos/wagen-wit.png" alt="cart" class="winkelwagen">
        `;
    }
}
function emptyCart() {
    if (localStorage.getItem("winkelmandje")) {
        window.location.href = "order-confirmation.html"; 
        localStorage.removeItem("winkelmandje");
    }
}