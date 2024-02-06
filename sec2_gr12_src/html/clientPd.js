// Call web service for product insert
async function callWS(url, method, sentData = {}) {
    console.log("Calling backend web service")
    let data;
    if (method == "insert") {
        let response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sentData)
        });
        data = await response.json();
    }
    return data;
}

const rootURLPdInsert = "http://localhost:3030/product/add";  // URl for insert product page
const form = document.querySelector('#productForm');   // id of insert product form 
form.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent reloading the page after submitting
});

// Product insert function  
async function insertHandler(event) {
    console.log("calling insert web service");
    const productId = document.querySelector("#productId").value;
    const productName = document.querySelector("#productName").value;
    const productBrand = document.querySelector("#productBrand").value;
    const productDescription = document.querySelector("#productDescription").value;
    const productType = document.querySelector("#productType").value;
    const productSizes = document.querySelector("#productSizes").value;
    const productColor = document.querySelector("#productColor").value;
    const productPrice = document.querySelector("#productPrice").value;
    const productQuantity = document.querySelector("#productQuantity").value;
    const data = {
        product: {
            PROD_ID: productId,
            PROD_NAME: productName,
            PROD_BRAND: productBrand,
            PROD_DES: productDescription,
            PROD_TYPE: productType,
            PROD_COLOR: productColor,
            PROD_PRICE: productPrice,
            PROD_QUANTITY: productQuantity,
            PROD_SIZE: productSizes
        }
    };
    const response = await callWS(rootURLPdInsert, "insert", data)
    alert("Insert a new product successfully");
}
