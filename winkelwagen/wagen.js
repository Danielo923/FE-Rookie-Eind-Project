function showCart() {
    const products = JSON.parse(localStorage.getItem("winkelmandje"));
    products.sort((a, b) => a.id - b.id);
    console.log(products);
    const alleProducten = document.getElementById('inhoud');
    alleProducten.innerHTML = '';
    for (let i = 0; i < products.length; i++) {
        const item = products[i];
        const listItem = document.createElement('div');
        listItem.classList.add('producten');
        listItem.innerHTML = `
        <td><img class="top3-hero-image" src="../${item.foto}" alt="Foto of ${item.naam}"></td>
        <td class="top3-hero-name">${item.naam} | ${item.beschrijving}</td>
        <td><h2 class="hero-placement">${item.prijs}</h2></td>
        `;
        alleProducten.appendChild(listItem);
    }
}
showCart();
