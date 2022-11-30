// write your code here

// Grab DOM Elements
const imageDiv = document.querySelector('#ramen-menu')
const form = document.querySelector('#new-ramen')
const updateForm = document.querySelector('#edit-ramen')


// fetches first ramen data 
fetch (`http://localhost:3000/ramens/${1}`)
.then(resp => resp.json())
.then(ramenData => renderFirstRamen(ramenData))

// renders the first ramen details as the default when the page loads
function renderFirstRamen(ramenData) {
    console.log(ramenData)
    let defaultImage = document.querySelector('.detail-image')
    defaultImage.src = ramenData.image
    let defaultName = document.querySelector('.name')
    defaultName.textContent = ramenData.name
    let defaultRestaurant = document.querySelector('.restaurant')
    defaultRestaurant.textContent = ramenData.restaurant
    let defaultRating = document.querySelector('#rating-display')
    defaultRating.textContent = ramenData.rating
    let defaultComment = document.querySelector('#comment-display')
    defaultComment.textContent = ramenData.comment
    
}

// fetches all ramen data
fetch('http://localhost:3000/ramens')
    .then(resp => resp.json())
    .then(ramenData => {
        ramenData.forEach(ramen => {
            renderRamen(ramen)
        })
    })
    
// Render ramen info to the DOM
function renderRamen(ramen) {
    // console.log(ramen.name)
    // console.log(ramen)
    let img = document.createElement('img')
    img.src = ramen.image 
    let btn = document.createElement('button')
    btn.textContent = "Delete"
    
    img.appendChild(btn)
    imageDiv.appendChild(img)
    img.addEventListener('click', e => {
        // console.log(ramen.name)
        let ramenName = document.querySelector('.name')
        ramenName.textContent = ramen.name
        let restaurantName = document.querySelector('.restaurant')
        restaurantName.textContent = ramen.restaurant 
        let mainImage = document.querySelector('.detail-image')
        mainImage.src = ramen.image
        let ramenRating = document.querySelector('#rating-display')
        ramenRating.textContent = ramen.rating
        let ramenComment = document.querySelector('#comment-display')
        ramenComment.textContent = ramen.comment 

    })
}

// form event listener to add new ramens to the DOM
form.addEventListener('submit', e => {
    e.preventDefault()
    let newRamen = {
        name: e.target.new_name.value,
        restaurant: e.target.new_restaurant.value,
        image: e.target.new_image.value,
        rating: e.target.new_rating.value,
        comment: e.target["new-comment"].value
    }
    console.log(newRamen)
    renderRamen(newRamen) 

    form.reset()
})

// update the rating and comment with the form submission inputs
updateForm.addEventListener('submit', e => {
    e.preventDefault()
    let rating = document.querySelector('#rating-display')
    rating.textContent = e.target.new_rating.value
    let comment = document.querySelector('#comment-display')
    comment.textContent = e.target.new_comment.value

    form.reset()
})

