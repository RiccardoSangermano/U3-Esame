const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const apiToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkM2E0NjM4MzRiZjAwMTUwMDA3MzkiLCJpYXQiOjE3NDI1NTE2MjIsImV4cCI6MTc0Mzc2MTIyMn0.F0kEHDOi5LzKo6uoVWCHlV2-bqVCJtOF67kfVBqnmo8";

const container = document.getElementById("container")

function createCards(comicsData) {
    let cardsHtml = ""
    comicsData.forEach((comics) => {
        cardsHtml += `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${comics.imageUrl}" class="card-img-top" alt="${comics.name}">
                    <div class="card-body">
                        <h5 class="card-title">${comics.name}</h5>
                        <p class="card-text">${comics.description}</p>
                        <p class="card-text">Prezzo: ${comics.price} €</p>
                        <a href="details.html?id=${comics._id}" class="btn btn-primary mt-3">Dettagli</a>
                        <a href="edit.html?id=${comics._id}" class="btn btn-dark mt-3">Modifica</a>
                    </div>
                </div>
            </div>
        `
    })
    if (container) {
        container.innerHTML = `<div class="row">${cardsHtml}</div>`
    }
}

function fetchComics() {
    fetch(apiUrl, {
        headers: {
            Authorization: apiToken,
        },
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Errore durante il recupero dei fumetti.")
            }
        })
        .then((data) => {
            createCards(data)
        })
        .catch((error) => {
            console.error("Errore:", error)
        });
}

fetchComics();