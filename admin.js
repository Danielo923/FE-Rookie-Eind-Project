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
function edit(id) {
    window.location.href = `edit.html?id=${id}`;
}
function deleteItem(id) {
    let number = `${id}`;
    let data;
    if (localStorage.getItem("data")) {
        data = JSON.parse(localStorage.getItem("data"));
    } else {
        throw new Error('No data available');
    }
    for (let i = 0; i < data.length; i++) {
        console.log(data[i].id);
        if (data[i].id === number) {
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