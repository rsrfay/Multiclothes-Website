// Call web service for product search
async function callWS(url, method, sentData = {}) {
    console.log("Calling backend web service")
    let data;
    // Search
    if (method == "select") {
        let response = await fetch(url, {
            method: 'GET'
        });
        data = await response.json();
    }
    return data;
}

const rootURLPd = "http://localhost:3030/product";
let searchBtnRef = document.querySelector("#Submit"); // Search button in Search.html
searchBtnRef.addEventListener("click", () => {
    const prodId = document.querySelector("#Id").value; // Id input
    const prodName = document.querySelector("#Name").value; // Name input
    const prodBrand = document.querySelector("#Brand").value; // Brand input
    const outputHtml = document.getElementById("output"); // Variable in the html to show output
    // Select all
    if (!prodId && !prodName && !prodBrand) {
        callWS(rootURLPd + "/products", "select").then((data) => {
            console.log(data);
            outputHtml.innerHTML = '';
            if (data.data.length > 0) {
                alert(data.message);
                let output;
                output = "<h1 class='list'>Product List<h1>";
                output += "<article class='container'>";
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
                    output += "</article>";
                })
                output += "</article>";
                console.log(data.data.length);
                outputHtml.innerHTML = output;
            }
        })
    }
    // Search ID only
    if (prodId && (!prodBrand && !prodName)) {
        callWS(rootURLPd + "/id/" + prodId, "select").then((data) => {
            console.log(data);
            outputHtml.innerHTML = '';
            if (data.data.length > 0) {
                alert(data.message);
                let output;
                output = "<h1 class='list'>Product List<h1>";
                output += "<article class='container'>";
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
                    output += "</article>";
                })
                output += "</article>";
                console.log(data.data.length);
                outputHtml.innerHTML = output;
            }
        });
    }
    // Search Name only
    if (prodName && (!prodId && !prodBrand)) {
        callWS(rootURLPd + "/name/" + prodName, "select").then((data) => {
            console.log(data);
            outputHtml.innerHTML = '';
            if (data.data.length > 0) {
                alert(data.message);
                let output;
                output = "<h1 class='list'>Product List<h1>";
                output += "<article class='container'>";
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
                    output += "</article>";
                })
                output += "</article>";
                console.log(data.data.length);
                outputHtml.innerHTML = output;
            }
        });
    }
    // Search brand only
    if (prodBrand && (!prodId && !prodName)) {
        callWS(rootURLPd + "/brand/" + prodBrand, "select").then((data) => {
            console.log(data);
            outputHtml.innerHTML = '';
            if (data.data.length > 0) {
                alert(data.message);
                let output;
                output = "<h1 class='list'>Product List<h1>";
                output += "<article class='container'>";
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
                    output += "</article>";
                })
                output += "</article>";
                console.log(data.data.length);
                outputHtml.innerHTML = output;
            }
        })
    }
    // Search id and name
    if (prodId && prodName && (!prodBrand)) {
        callWS(rootURLPd + "/idname/" + prodId + "/" + prodName, "select").then((data) => {
            console.log(data);
            outputHtml.innerHTML = '';
            if (data.data.length > 0) {
                alert(data.message);
                let output;
                output = "<h1 class='list'>Product List<h1>";
                output += "<article class='container'>";
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
                    output += "</article>";
                })
                output += "</article>";
                console.log(data.data.length);
                outputHtml.innerHTML = output;
            }
        })
    }
    // Search id and brand
    if (prodId && prodBrand && (!prodName)) {
        callWS(rootURLPd + "/idbrand/" + prodId + "/" + prodBrand, "select").then((data) => {
            console.log(data);
            outputHtml.innerHTML = '';
            if (data.data.length > 0) {
                alert(data.message);
                let output;
                output = "<h1 class='list'>Product List<h1>";
                output += "<article class='container'>";
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
                    output += "</article>";
                })
                output += "</article>";
                console.log(data.data.length);
                outputHtml.innerHTML = output;
            }
        })
    }
    // Search name and brand
    if (prodName && prodBrand && (!prodId)) {
        callWS(rootURLPd + "/namebrand/" + prodName + "/" + prodBrand, "select").then((data) => {
            console.log(data);
            outputHtml.innerHTML = '';
            if (data.data.length > 0) {
                alert(data.message);
                let output;
                output = "<h1 class='list'>Product List<h1>";
                output += "<article class='container'>";
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
                    output += "</article>";
                })
                output += "</article>";
                console.log(data.data.length);
                outputHtml.innerHTML = output;
            }
        })
    }
    // Search by id, name, and brand
    if (prodId && prodName && prodBrand) {
        callWS(rootURLPd + "/all/" +  prodId + "/" + prodName + "/" + prodBrand, "select").then((data) => {
            console.log(data);
            outputHtml.innerHTML = '';
            if (data.data.length > 0) {
                alert(data.message);
                let output;
                output = "<h1 class='list'>Product List<h1>";
                output += "<article class='container'>";
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
                    output += "</article>";
                })
                output += "</article>";
                console.log(data.data.length);
                outputHtml.innerHTML = output;
            }
        })
    }
});

