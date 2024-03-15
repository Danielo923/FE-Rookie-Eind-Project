let sort = "Alle Producten";
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
    let bestellingen;
    console.log(sort);
    if (localStorage.getItem("data")) {
        data = JSON.parse(localStorage.getItem("data"));
    } else {
        data = await producten();
    }
    if (localStorage.getItem("bestellingen")) {
        bestellingen = JSON.parse(localStorage.getItem("bestellingen"));
    } else {
        console.log("Nog geen bestellingen gedaan");
    }
    const alleProducten = document.getElementById('producten');
    alleProducten.innerHTML = '';
    if (sort === "Alle Producten") {
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
            <button class="border-green" id="button${i}" class="addButton" onclick="edit(${item.id})">
            Edit</button>
            <button class="border-red" id="button${i}" class="addButton" onclick="deleteItem(${item.id})">
            Delete</button>
            </div>
        `;
            alleProducten.appendChild(listItem);
        }
    }
    if (sort === "Bestellingen") {
        for (let i = 0; i < bestellingen.length; i++) {
            const items = document.createElement('div');
            items.classList.add('bestellingen');
            items.innerHTML = `
            <h1 class="title">Bestelling ${i + 1}</h1>
            `;
            for (let j = 0; j < bestellingen[i].length; j++) {
                const item = bestellingen[i][j];
                const listItem = document.createElement('div');
                listItem.classList.add('bestellingen-items');
                listItem.innerHTML = `
                <div>
                    <img src="${item.foto}" class="image" alt="Foto of ${item.naam}"></td>
                </div>
                <div>
                    <p>${item.naam} | ${item.beschrijving}</p>
                </div>
                <div>
                    <h2>${item.prijs}</h2>
                </div>
                `;
                items.appendChild(listItem);
            }
            alleProducten.appendChild(items);
        }
    }
}
function sorteer1() {
    sort = "Alle Producten";
    getproducten();
}
function sorteer2() {
    sort = "Bestellingen";
    getproducten();
}
async function resetProducten() {
    localStorage.removeItem("data");
    await producten();
    getproducten();
}
function create() {
    const data = JSON.parse(localStorage.getItem("data"));
    const item = {};
    for (let i = 0; i < data.length + 1; i++) {
        if (data.find(items => items.id === i + 1) === undefined) {
            item.id = i + 1;
            break;
        }
    }
    console.log(item.id);
    item.naam = "In Progress";
    item.prijs = 0;
    item.beschrijving = "In Progress";
    item.foto = "img/";
    item.disabled = true;
    data.push(item);
    localStorage.setItem("data", JSON.stringify(data));
    getproducten();
}
function generateNewId() {
    const data = JSON.parse(localStorage.getItem("data"));
    return data.length + 1;
}
function edit(id) {
    window.location.href = `edit.html?id=${id}`;
}
function deleteItem(id) {
    let data;
    if (localStorage.getItem("data")) {
        data = JSON.parse(localStorage.getItem("data"));
    } else {
        throw new Error('No data available');
    }
    for (let i = 0; i < data.length; i++) {
        if (data[i].id === id) {
            console.log(i);
            console.log(id);
            data.splice(i, 1);
        }
    }
    console.log(data);
    localStorage.setItem('data', JSON.stringify(data));
    getproducten();
}
document.addEventListener("keydown", function (event) {
    if (event.key === "c") {
        console.log("clear");
        localStorage.clear();
        getproducten();
    }
});
getproducten();