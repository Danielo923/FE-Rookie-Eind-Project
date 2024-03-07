let click = 0;
async function producten() {
    try {
        const response = await fetch('producten.json');
        if (!response.ok) {
            throw new Error('Failed to fetch pals');
        }
        const data = await response.json();
        localStorage.setItem("data", JSON.stringify(data));
        return data;
    } catch (error) {
        console.error('Error fetching heroes:', error);
        throw error;
    }
}
async function getproducten() {
    let data;
    if (localStorage.getItem("data")) {
        data = JSON.parse(localStorage.getItem("data"));
    } else {
        data = await producten();
    }
    const alleProducten = document.getElementById('producten');
    alleProducten.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const listItem = document.createElement('div');
        listItem.classList.add('producten');
        listItem.innerHTML = `
            <img class="top3-hero-image" src="${item.foto}" alt="Foto of ${item.naam}"></td>
            <p>${item.naam} | ${item.beschrijving}</p>
            <h2 class="hero-placement">${item.prijs}</h2>
            <button id="button${i}" class="addButton" onclick="addProductToCart(${item.id})">
            Toevoegen aan winkelmandje</button>
        `;
        alleProducten.appendChild(listItem);
    }
    checkForCart();
}
function addProductToCart(id) {
    const product = JSON.parse(localStorage.getItem("data"));
    let winkelmandje = [];
    if (localStorage.getItem("winkelmandje")) {
        winkelmandje = JSON.parse(localStorage.getItem("winkelmandje"));
    }
    if (!winkelmandje.includes(product[id - 1])) {
        winkelmandje.push(product[id - 1]);
    }
    localStorage.setItem("winkelmandje", JSON.stringify(winkelmandje));
}
function checkForCart() {
    if (localStorage.getItem("winkelmandje")) {
        console.log(localStorage.getItem("winkelmandje").length);
        const retdot = document.getElementById("retDot");
        retdot.innerHTML = `
        <img src="web_fotos/wagen-wit.png" alt="cart" class="winkelwagen">
        <h1 class="dot"></h1>
        `;
    } else {
        const retdot = document.getElementById("retDot");
        retdot.innerHTML = `    
        <img src="web_fotos/wagen-wit.png" alt="cart" class="winkelwagen">
        `;
    }
}

document.addEventListener("keydown", function (event) {
    if (event.key === "c") {
        console.log("clear");
        localStorage.clear();
        getproducten();
    }
});
function reload() {
    click++;
    if (click === 3) {
        localStorage.clear();
        getproducten();
        console.log("clear");
        click = 0;
    }
    if (click > 0 && click < 2) {
        setTimeout(function () {
            click = 0;
            console.log(click);
        }, 3000);
    }
}
getproducten();