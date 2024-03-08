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
            <button class="border-green" id="button${i}" class="addButton">
            Edit</button>
            <button class="border-red" id="button${i}" class="addButton" onclick="deleteItem(${item.id})">
            Delete</button>
            </div>
        `;
        alleProducten.appendChild(listItem);
    }
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

getproducten();