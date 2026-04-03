// const params = new URLSearchParams(window.location.search)
// const shortUrl = params.get('p')

// fetch(`https://movie.pequla.com/api/movie/short/${shortUrl}`)
//     .then(response => response.json())
//     .then(data => {
//         document.getElementById('json').innerText = JSON.stringify(data, null, 2)
//     })

const params = new URLSearchParams(window.location.search)
const shortUrl = params.get('p')

fetch(`https://movie.pequla.com/api/movie/short/${shortUrl}`)
    .then(response => response.json())
    .then(data => {
        // Poster
        document.getElementById('poster').src = data.poster

        // Naslovi
        document.getElementById('title').innerText = data.title
        document.getElementById('originalTitle').innerText = data.originalTitle

        // Opisi
        document.getElementById('shortDescription').innerText = data.shortDescription
        document.getElementById('description').innerText = data.description

        // Ostali podaci
        document.getElementById('director').innerText = data.director.name
        document.getElementById('runtime').innerText = formatRuntime(data.runTime)
        document.getElementById('startDate').innerText = formatDate(data.startDate)

        // Žanrovi
        const genres = data.movieGenres
            .map(g => `<span class="badge bg-warning text-dark me-1">${g.genre.name}</span>`)
            .join('')
        document.getElementById('genres').innerHTML = genres

        // Glumci
        const actors = data.movieActors
            .map(a => `<span class="badge bg-info text-dark me-1">${a.actor.name}</span>`)
            .join('')
        document.getElementById('actors').innerHTML = actors
    })

// Format datuma
function formatDate(dateStr) {
    if (!dateStr) return 'N/A'
    const date = new Date(dateStr).toLocaleDateString('sr-RS', {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    })
    return date
}

function formatRuntime(minutes){
    if (!minutes || Number.isNaN(Number(minutes))) return 'N/A'
    const hrs = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hrs < 0) return `${hrs}h ${mins}min`
    return `${mins}`
}
