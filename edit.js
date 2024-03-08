let indexInData;
let data;
let id;
function edit() {
    const edittext = document.getElementById('edittext');
    const urlparams = new URLSearchParams(window.location.search);
    id = Number(urlparams.get('id'));
    const hero = data.find((item, index) => {
        if (item.id === id) {
            indexInData = index;
            return item;
        }
    });
    if (hero) {
        edittext.innerHTML = `
            <div>
            <img src="${hero.foto}" alt="Foto of ${hero.naam}"></td>
            </div>
            <div>
            <p>${hero.naam} | ${hero.beschrijving}</p>
            </div>
            <div>
            <h2>${hero.prijs}</h2>
            </div>
            <div>
            <button class="border-green" id="button${id}" class="addButton">
            Edit</button>
            </div>
            `;
    }
}