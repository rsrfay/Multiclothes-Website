// Call web service for product update and delete
async function callWS(url, method, sentData = {}) {
    console.log("Calling backend web service")
    let data;
    if (method == "select") {
        let response = await fetch(url, {
            method: 'GET'
        });
        data = await response.json();
    }
    else if (method == "update") {
        let response = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sentData)
        });
        data = await response.json();
    }
    else if (method == "delete") {
        let response = await fetch(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sentData)
        });
        data = await response.json();
    }
    return data;
}

const rootURLPdDelete = "http://localhost:3030/product/delete"; // URL for product delete
const rootURLPd = "http://localhost:3030/product"; // URL for product web services

window.addEventListener("load", (event) => {
    const outputHtml = document.getElementById("show");
    callWS(rootURLPd + "/products", "select").then((data) => {
        console.log(data);
        if (data.data.length > 0) {
            // alert(data.message);
            let output;
            output = "<article class='container'>";
            data.data.forEach((element) => {
                output += "<article class='column'>";
                output += "<h2>" + element.PROD_NAME + "</h2>";
                output += "<p> ID: " + element.PROD_ID + "</p>";
                output += "<p> Brand: " + element.PROD_BRAND + "</p>";
                output += "<p> Description: " + element.PROD_DES + "</p>";
                output += "<p> Type: " + element.PROD_TYPE + "</p>";
                output += "<p> Color: " + element.PROD_COLOR + "</p>";
                output += "<p class='price'>Price: " + element.PROD_PRICE + "</p>";
                output += "<p> Quantity: " + element.PROD_QUANTITY + "</p>";
                output += "<p> Size: " + element.PROD_SIZE + "</p>";
                output += `<button id="delete-${element.PROD_ID}" onclick="deleteHandler('${element.PROD_ID}')"><i class="fa-solid fa-trash-can"></i></button>`;
                output += `<a href="/product-update?id=${element.PROD_ID}"><button>Edit</button></a>`;
                output += "</article>";
            })
            output += "</article>";
            outputHtml.innerHTML = output;
        }
    })
});
// Function for product delete
async function deleteHandler(productId) {
    console.log("calling delete web service");
    const data = {
        product: {
            PROD_ID: productId,
        }
    };
    const response = await callWS(rootURLPdDelete, "delete", data);
    alert("Delete a product successfully");
}

let originalFormData = {};
let changedFormData = {};
// Function to pass data from product-lists page to product-add page
async function sendData() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");
    const data = await callWS(rootURLPd + "/id/" + productId, "select");
    const element = data.data[0];
    document.getElementById("productId").value = element.PROD_ID;
    document.getElementById("productName").value = element.PROD_NAME;
    document.getElementById("productBrand").value = element.PROD_BRAND;
    document.getElementById("productDescription").value = element.PROD_DES;
    document.getElementById("productType").value = element.PROD_TYPE;
    document.getElementById("productSizes").value = element.PROD_SIZE;
    document.getElementById("productColor").value = element.PROD_COLOR;
    document.getElementById("productPrice").value = element.PROD_PRICE;
    document.getElementById("productQuantity").value = element.PROD_QUANTITY;
    console.log(element);
    console.log("Data sent successfully");
    originalFormData = data.data[0];
    changedFormData = data.data[0];
}
// Function for update product
async function updateHandler() {
    console.log("calling update web service");
    const productId = document.getElementById("productId").value;
    const formFields = ['productId', 'productName', 'productBrand', 'productDescription', 'productType', 'productSizes', 'productColor', 'productPrice', 'productQuantity'];
    formFields.forEach((field) => {
        document.getElementById(field).addEventListener('change', (event) => {
            changedFormData[field] = event.target.value;
        });
    });
    console.log(changedFormData);
    const data = {
        product: {
            PROD_ID: productId,
            PROD_NAME: document.getElementById("productName").value,
            PROD_BRAND: document.getElementById("productBrand").value,
            PROD_DES: document.getElementById("productDescription").value,
            PROD_TYPE: document.getElementById("productType").value,
            PROD_SIZE: document.getElementById("productSizes").value,
            PROD_COLOR: document.getElementById("productColor").value,
            PROD_PRICE: document.getElementById("productPrice").value,
            PROD_QUANTITY: document.getElementById("productQuantity").value
        }
    };
    const response = await callWS(rootURLPd + "/update", "update", data);
    alert("Product updated successfully");
    console.log(response);
}

const form = document.querySelector('#productForm');
form.addEventListener('submit', (event) => {
    event.preventDefault(); // prevent reloading the page after submitting
});

