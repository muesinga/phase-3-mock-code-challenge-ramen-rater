// write your code here
const ramenMenu = document.querySelector("div#ramen-menu")

function renderAllRamens() {
fetch ('http://localhost:3000/ramens')
    .then(resp => resp.json())
    .then(data => {
        data.forEach(ramenObj => {
            renderOneNoodle(ramenObj)
        })
    })
}

function renderOneNoodle(ramenObj) {
    const div = document.createElement('div')
    div.dataset.id = ramenObj.id

    div.innerHTML = `
    <img src=${ramenObj.image} class="detail-image" />
    `

    ramenMenu.append(div)
}

ramenMenu.addEventListener('click', function (event){
    const name = event.target.parentNode.dataset.id.name
    const restaurant = event.target.parentNode.dataset.id.restaurant
    const image = event.target.parentNode.dataset.id.image
    fetch(`http://localhost:3000/ramens/${event.target.parentNode.dataset.id}`)
        .then(resp => resp.json())
        .then(data => console.log(data))
    console.log(name)
})


renderAllRamens()