const apiUrl = "https://striveschool-api.herokuapp.com/api/product/"
let comics = [
    {
      "name": "Sandman #1",
      "description": "Preludi notturni",
      "brand": "DC Comics",
      "imageUrl": "https://m.media-amazon.com/images/I/81+7Wj+YYkL.jpg",
      "price": 19.25, 
    },
    {
      name: "Hellboy Omnibus n #1",
      description: "Semi della distruzione",
      brand: "Magic Press",
      imageUrl: "https://m.media-amazon.com/images/I/71bEVDBUDqL.jpg",
      "price": 19.25, 
    },
    {
      name: "Gipi",
      description: "Una storia",
      brand: "Coconino Press",
      imageUrl: "https://m.media-amazon.com/images/I/81gUArTxCTL._AC_UF1000,1000_QL80_.jpg",
      "price": 15.40, 
    },
    {
      name: "Akira",
      description: "Volume 1",
      brand: "Panini Comics",
      imageUrl: "https://m.media-amazon.com/images/I/71V54jX0fML._AC_UF1000,1000_QL80_.jpg",
      "price": 45.00,
    },
    {
      name: "Berserk",
      description: "Volume 13",
      brand: "Panini Comics",
      imageUrl: "https://m.media-amazon.com/images/I/71RpK0rlItS.jpg",
      "price": 5.25, 
    },
    {
      name: "Vinland saga",
      description: "Volume 2",
      brand: "Panini Comics",
      imageUrl: "https://m.media-amazon.com/images/I/71yCIXkCciL._AC_UF1000,1000_QL80_.jpg",
      "price": 5.25, 
    },
    
    {
      name: "The killing joke",
      description: "Volume unico",
      brand: "DC Comics",
      imageUrl: "https://m.media-amazon.com/images/I/91OjBx3hSNL._AC_UF1000,1000_QL80_.jpg",
      "price": 18.25, 
    },
  ];
  let createdComics = []

comics.forEach((comics) => {
  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkM2E0NjM4MzRiZjAwMTUwMDA3MzkiLCJpYXQiOjE3NDI1NTE2MjIsImV4cCI6MTc0Mzc2MTIyMn0.F0kEHDOi5LzKo6uoVWCHlV2-bqVCJtOF67kfVBqnmo8`,
    },
    body: JSON.stringify(comics),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.json().then((errorData) => {
          throw new Error(`HTTP error! status: ${response.status}, details: ${JSON.stringify(errorData)}`);
        });
      }
    })
    .then((data) => {
      console.log("Fumetto creato:", data);
      createdComics.push(data);
      createCards();
    })
    .catch((error) => {
      console.error("Si è verificato un errore:", error)
    });
});

const container = document.getElementById("container")

function createCards(comicsData) {
  let cardsHtml = "";
  comicsData.forEach((comics) => {
    cardsHtml += `
      <div class="col-md-4 mb-4">
        <div class="card">
          <img src="${comics.imageUrl}" class="card-img-top" alt="${comics.name}">
          <div class="card-body">
            <h5 class="card-title">${comics.name}</h5>
            <p class="card-text">${comics.description}</p>
            <p class="card-text">Prezzo: ${comics.price} €</p>
            <a href="Backoffice.html?id=${comics._id}" class="btn btn-dark mt-3">Modifica</a>
          <a href="dettagli.html?id=${comics._id}" class="btn btn-dark mt-3">Dettagli</a>
            </div>
        </div>
      </div>
    `;
  })
  if (container) {
    container.innerHTML = `<div class="row">${cardsHtml}</div>`
  }
}

function fetchComics() {
  fetch(apiUrl, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkM2E0NjM4MzRiZjAwMTUwMDA3MzkiLCJpYXQiOjE3NDI1NTE2MjIsImV4cCI6MTc0Mzc2MTIyMn0.F0kEHDOi5LzKo6uoVWCHlV2-bqVCJtOF67kfVBqnmo8`,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error("Errore durante il recupero dei fumetti.")
      }
    })
    .then((data) => {
      createCards(data)
    })
    .catch((error) => {
      console.error("Errore:", error)
    })
}

fetchComics()




