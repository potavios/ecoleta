// document
//     .querySelector("select[name=uf]")
//     .addEventListener("change", () => {
//         console.log("mudei")
//     })


function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
        .then(res => res.json())
        .then(statesUF => {
            for (uf of statesUF) {
                ufSelect.innerHTML += `<option value="${uf.id}">${uf.nome}</option>`

            }


        })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const urlCity =
        `http://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios?orderBy=nome`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(urlCity)
        .then(res => res.json())
        .then(cities => {
            citySelect

            for (city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }
            citySelect.disabled = false
        })
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


// Items de Coleta
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")
let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    // add or remove a class into html
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    //Verificar se existem itens selecionados, se sim pegá-los
    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId
        return itemFound
    })

    // se já estiver selecionado
    if (alreadySelected >= 0) {
        //tirar da seleção
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        selectedItems = filteredItems
    } else {
        selectedItems.push(itemId)
    }

    collectedItems.value = selectedItems

}