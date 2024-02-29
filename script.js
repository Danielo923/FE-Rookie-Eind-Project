async function producten() {
    try {
        const response = await fetch('producten.json');
        if (!response.ok) {
            throw new Error('Failed to fetch heroes');
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
            <td><img class="top3-hero-image" src="${item.foto}" alt="Foto of ${item.naam}"></td>
            <td class="top3-hero-name">${item.naam} | ${item.beschrijving}</td>
            <td><h2 class="hero-placement">${i + 1}</h2></td>
        `;
        alleProducten.appendChild(listItem);
    }
}
document.addEventListener("keydown", function (event) {
    if (event.key === "c") {
        console.log("clear");
        localStorage.clear();
        getproducten();
    }
});
getproducten();