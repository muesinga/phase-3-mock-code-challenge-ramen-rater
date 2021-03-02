// write your code here
const ramenMenu = document.querySelector("div#ramen-menu")
const ramenDetail = document.querySelector("div#ramen-detail")
const ratingForm = document.querySelector("form#ramen-rating")

fetch ('http://localhost:3000/ramens')
    .then(resp => resp.json())
    .then(data => {
        data.forEach(ramenObj => {
            renderOneNoodle(ramenObj)
        })
    })

function renderOneNoodle(ramenObj) {
    const div = document.createElement('div')
    div.dataset.id = ramenObj.id

    div.innerHTML = `
    <img src=${ramenObj.image} class="detail-image" />
    `

    ramenMenu.append(div)
}

ramenMenu.addEventListener('click', function (event){
    fetch(`http://localhost:3000/ramens/${event.target.parentNode.dataset.id}`)
        .then(resp => resp.json())
        .then(ramenObj => {
            ramenDetail.querySelector('img.detail-image').src = ramenObj.image
            ramenDetail.querySelector("h2.name").textContent = ramenObj.name
            ramenDetail.querySelector("h3.restaurant").textContent = ramenObj.restaurant
            ratingForm.querySelector("input#rating").value = ramenObj.rating
            ratingForm.querySelector("textarea#comment").innerText = ramenObj.comment
            ratingForm.dataset.id = ramenObj.id
        })
})

ratingForm.addEventListener('submit', event => {
    event.preventDefault()
    const id = event.target.dataset.id
    fetch(`http://localhost:3000/ramens/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        body: JSON.stringify({rating:event.target.rating.value, comment:event.target.comment.value})
    })
    .then(response => response.json())
    .then(ramenObj => {
        ramenDetail.querySelector('img.detail-image').src = ramenObj.image
        ramenDetail.querySelector("h2.name").textContent = ramenObj.name
        ramenDetail.querySelector("h3.restaurant").textContent = ramenObj.restaurant
        ratingForm.querySelector("input#rating").value = ramenObj.rating
        ratingForm.querySelector("textarea#comment").innerText = ramenObj.comment
        ratingForm.dataset.id = ramenObj.id
    })
})
