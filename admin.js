async function getproducten() {
    let data;
    if (localStorage.getItem("data")) {
        data = JSON.parse(localStorage.getItem("data"));
    } else {
        throw new Error('No data available');
    }
    const alleProducten = document.getElementById('producten');
    alleProducten.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const listItem = document.createElement('div');
        listItem.classList.add('producten');
        listItem.innerHTML = `
            <div>
            <img src="${item.foto}" alt="Foto of ${item.naam}"></td>
            </div>
            <div>
            <p>${item.naam} | ${item.beschrijving}</p>
            </div>
            <div>
            <h2>${item.prijs}</h2>
            </div>
            <div>
            <button id="button${i}" class="addButton" onclick="addProductToCart(${item.id})">
            Toevoegen aan winkelmandje</button>
            </div>
        `;
        alleProducten.appendChild(listItem);
    }
}
getproducten();