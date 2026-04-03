const buttonTheme = document.getElementById('themeToggle')
let currentTheme = localStorage.getItem("theme") || "dark"
document.body.setAttribute("data-bs-theme", currentTheme)
updateButtonText(currentTheme)

buttonTheme.addEventListener('click', ()  =>{
    currentTheme = currentTheme === "dark" ? "light" : "dark"
    document.body.setAttribute("data-bs-theme", currentTheme)
    localStorage.setItem("theme", currentTheme)
    updateButtonText(currentTheme)
})

function updateButtonText(theme) { buttonTheme.innerText = theme === "dark" ? "Light" : "Dark" }

function loadMovies(search = '') {
    fetch(`https://movie.pequla.com/api/movie?search=${search}`)
    .then(response => response.json())
    .then(data => {
        const template = document.getElementById("movie-template")
        const list = document.getElementById("movies")
        list.innerHTML = ''
        for (let movie of data){
            const copy = template.content.cloneNode(true)
            // const card = copy.querySelector('.movie-card')
            const img = copy.querySelector('.card-img-top')
            img.src = movie.poster
            img.alt = movie.title

            copy.querySelector('.card-title').innerText = movie.title
            copy.querySelector('.card-subtitle').innerText = movie.director.name
            copy.querySelector('.card-text').innerText = movie.shortDescription

            copy.querySelector('.card').addEventListener('click', () => {
                // alert(movie.shortUrl)
                window.location.href = `./details.html?p=${movie.shortUrl}`
            })
            // card.addEventListener('click', () => {
            //     alert(movie.shortUrl)
            // })
            list.appendChild(copy)
        }
    })
}

const input = document.getElementById('search-input')
const btn = document.getElementById('search-btn')

btn.addEventListener('click', () => {
    loadMovies(input.value)
})

let timeout 
input.addEventListener('keyup', () => {
    if (input.value != ''){
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            loadMovies(input.value)
        }, 600)  
    }
})

document.addEventListener('DOMContentLoaded', () => {loadMovies()})
