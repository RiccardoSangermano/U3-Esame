document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('productForm')
    const productListItems = document.getElementById('productListItems')
    const resetButton = document.getElementById('resetButton')
    const API_URL = 'https://striveschool-api.herokuapp.com/api/product/'
    const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkM2E0NjM4MzRiZjAwMTUwMDA3MzkiLCJpYXQiOjE3NDI1NTE2MjIsImV4cCI6MTc0Mzc2MTIyMn0.F0kEHDOi5LzKo6uoVWCHlV2-bqVCJtOF67kfVBqnmo8'

    productForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value
        const description = document.getElementById('description').value
        const brand = document.getElementById('brand').value;
        const imageUrl = document.getElementById('imageUrl').value
        const price = document.getElementById('price').value

        if (!name || !description || !brand || !imageUrl || !price) {
            alert('Compila tutti i campi!')
            return;
        }

        const product = { name, description, brand, imageUrl, price }

        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AUTH_TOKEN}`
            },
            body: JSON.stringify(product)
        })
        .then(response => response.json())
        .then(newProduct => {
            addProductToList(newProduct);
            productForm.reset();
        })
        .catch(error => console.error('Errore durante la creazione del prodotto:', error))
    });

    function addProductToList(product) {
        const listItem = document.createElement('li')
        listItem.classList.add('list-group-item')
        listItem.innerHTML = `
            <strong>${product.name}</strong> - ${product.description} (${product.brand}), Prezzo: ${product.price}
            <button class="btn btn-sm btn-info ml-2 editButton" data-id="${product._id}">Modifica</button>
            <button class="btn btn-sm btn-danger ml-2 deleteButton" data-id="${product._id}">Elimina</button>
        `;
        productListItems.appendChild(listItem)

        listItem.querySelector('.editButton').addEventListener('click', () => editProduct(product._id))
        listItem.querySelector('.deleteButton').addEventListener('click', () => deleteProduct(product._id))
    }

    function editProduct(productId) {
        fetch(`${API_URL}${productId}`, {
            headers: {
                'Authorization': `Bearer ${AUTH_TOKEN}`
            }
        })
        .then(response => response.json())
        .then(product => {
            document.getElementById('name').value = product.name
            document.getElementById('description').value = product.description
            document.getElementById('brand').value = product.brand
            document.getElementById('imageUrl').value = product.imageUrl
            document.getElementById('price').value = product.price

            productForm.addEventListener('submit', (event) => {
                event.preventDefault()

                const updatedProduct = {
                    name: document.getElementById('name').value,
                    description: document.getElementById('description').value,
                    brand: document.getElementById('brand').value,
                    imageUrl: document.getElementById('imageUrl').value,
                    price: document.getElementById('price').value
                };

                fetch(`${API_URL}${productId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${AUTH_TOKEN}`
                    },
                    body: JSON.stringify(updatedProduct)
                })
                .then(response => response.json())
                .then(updatedProduct => {
                    updateProductInList(updatedProduct)
                    productForm.reset()
                })
                .catch(error => console.error('Errore durante la modifica del prodotto:', error))
            });
        })
        .catch(error => console.error('Errore durante il recupero del prodotto:', error))
    }

    function updateProductInList(updatedProduct) {
        const listItems = productListItems.querySelectorAll('li')
        listItems.forEach(listItem => {
            if (listItem.querySelector('.editButton').dataset.id === updatedProduct._id) {
                listItem.innerHTML = `
                    <strong>${updatedProduct.name}</strong> - ${updatedProduct.description} (${updatedProduct.brand}), Prezzo: ${updatedProduct.price}
                    <button class="btn btn-sm btn-info ml-2 editButton" data-id="${updatedProduct._id}">Modifica</button>
                    <button class="btn btn-sm btn-danger ml-2 deleteButton" data-id="${updatedProduct._id}">Elimina</button>
                `;

                listItem.querySelector('.editButton').addEventListener('click', () => editProduct(updatedProduct._id))
                listItem.querySelector('.deleteButton').addEventListener('click', () => deleteProduct(updatedProduct._id))
            }
        })
    }

    function deleteProduct(productId) {
        fetch(`${API_URL}${productId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${AUTH_TOKEN}`
            }
        })
        .then(() => {
            const listItems = productListItems.querySelectorAll('li');
            listItems.forEach(listItem => {
                if (listItem.querySelector('.deleteButton').dataset.id === productId) {
                    listItem.remove();
                }
            });
        })
        .catch(error => console.error('Errore durante eliminazione del prodotto:', error))
    }

    resetButton.addEventListener('click', () => {
        productForm.reset()
    })
})