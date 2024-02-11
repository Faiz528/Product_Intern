const myform = document.getElementById("addProductForm");
const userList = document.getElementById('userList');
const tokens = localStorage.getItem('token');

// Event listener for form submission
myform.addEventListener('submit', save);

// Function to handle form submission
async function save(event) {
    event.preventDefault();

    const productData = {
        productId: getValue('productid'),
        name: getValue('name'),
        price: getValue('price'),
        featured: document.getElementById('featured').checked,
        rating: getValue('rating'),
        company: getValue('company')
    };

    try {
        const response = await axios.post('http://localhost:3000/add', productData, { headers: { 'Authorization': tokens } });
        console.log(response);
        onscreen(response.data);
    } catch (err) {
        console.error('Error adding product:', err);
    }
}

document.getElementById('fetchFeatured').addEventListener('click', async () => {
  try {
      const response = await axios.get('http://localhost:3000/products/featured');
      displayProducts(response.data);
  } catch (error) {
      console.error('Error fetching featured products:', error);
  }
});
function displayProducts(products) {
  const userList = document.getElementById('userList');
  userList.innerHTML = ''; // Clear previous product list
  products.forEach(product => {
      onscreen(product);
  });
}

// Function to fetch and display all products
async function fetchAndDisplayProducts() {
    try {
        const response = await axios.get('http://localhost:3000/products');
        const products = response.data;

        userList.innerHTML = ''; // Clear the list
        
        products.forEach(product => {
            onscreen(product);
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}
window.addEventListener('DOMContentLoaded', fetchAndDisplayProducts);
// Function to get input value by id
function getValue(id) {
    return document.getElementById(id).value;
}

// Function to display a product
async function onscreen(product) {
    try {
        const childHTML = `
            <li id=${product._id}>
                ProductId: ${product.productId}<br>  
                Product: ${product.name}<br>
                Price: ${product.price}<br>
                Featured: ${product.featured}<br>
                Rating: ${product.rating}<br>
                Company: ${product.company}<br>
                <button onclick="remove('${product._id}')">DELETE</button>
                <button onclick="edit('${product._id}')">EDIT</button>
            </li>
        `;
        userList.innerHTML += childHTML;
    } catch (err) {
        console.error('Error displaying product:', err);
    }
}

// Function to remove a product
async function remove(productId) {
    try {
        await axios.delete(`http://localhost:3000/delete/${productId}`);
        window.location.reload();
    } catch (err) {
        console.error('Error removing product:', err);
    }
}

// Function to edit a product
async function edit(productId) {
    try {
        const response = await axios.get(`http://localhost:3000/edit/${productId}`);
        const product = response.data;

        ['productId', 'name', 'price', 'rating', 'company'].forEach(field => {
            document.getElementById(field).value = product[field];
        });

        // Add event listener to update button
        update.addEventListener("click", async () => {
            try {
                const updatedProductData = {
                    productId: getValue('productid'),
                    name: getValue('name'),
                    price: getValue('price'),
                    rating: getValue('rating'),
                    company: getValue('company')
                };
                
                const result = await axios.post(`http://localhost:3000/edits/${productId}`, updatedProductData);
                window.location.reload();
            } catch (error) {
                console.error('Error updating product:', error);
            }
        });
    } catch (err) {
        console.error('Error editing product:', err);
    }
}
