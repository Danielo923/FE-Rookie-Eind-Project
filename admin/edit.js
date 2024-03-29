function getproducten() {
    if (localStorage.getItem("data")) {
        let data = JSON.parse(localStorage.getItem("data"));
        return data;
    } else {
        throw new Error('No data available');
    }
}
async function edit() {
    let data = await getproducten();
    const edittext = document.getElementById('edittext');
    const urlparams = new URLSearchParams(window.location.search);
    const id = Number(urlparams.get('id')); // Declare id variable here
    const indexInData = data.findIndex(item => item.id === id);

    if (indexInData !== -1) { // Check if the item with given id exists
        const pal = data[indexInData];
        edittext.innerHTML = `
            <div>
            <label for="naam">Name</label>
            <input type="text" id="naam" name="naam" value="${pal.naam}">
            </div>
            <div>
            <label for="prijs">Price</label>
            <input type="number" id="prijs" name="prijs" value="${pal.prijs}">
            </div>
            <div>
            <label for="beschrijving">Description</label>
            <input type="text" id="beschrijving" name="beschrijving" value="${pal.beschrijving}">
            </div>
            <div>
            <label for="foto">Picture</label>
            <input type="text" id="foto" name="foto" value="${pal.foto}">
            </div>
            <div>
            <img id="photo-preview" src="${pal.foto}" alt="Foto of ${pal.naam}">
            </div>
            <div>
            <button class="border-green" class="addButton" onclick="saveChanges(${pal.id})">
            Edit</button>
            </div>
            `;
    } else {
        edittext.innerHTML = "Product not found";
    }
}
function saveChanges(id) {
    let existingProducts = JSON.parse(localStorage.getItem('data')) || [];
    const index = existingProducts.findIndex(item => item.id === id);
    existingProducts[index].naam = document.getElementById('naam').value;
    if (existingProducts[index].naam != "In Progress") {
        existingProducts[index].disabled = false;
    } else {
        existingProducts[index].disabled = true;
    }
    existingProducts[index].prijs = document.getElementById('prijs').value;
    existingProducts[index].beschrijving = document.getElementById('beschrijving').value;
    existingProducts[index].foto = document.getElementById('foto').value;
    localStorage.setItem('data', JSON.stringify(existingProducts));
    window.location.href = 'admin.html';
}

function updateImage() {
    var input = document.getElementById('foto');
    var img = document.getElementById('photo-preview');
    img.src = input.value;
}

document.addEventListener("keyup", function () {
    updateImage();
});
edit();