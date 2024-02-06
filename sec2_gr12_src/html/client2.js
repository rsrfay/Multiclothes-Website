// Call web service for admin search, update, insert, and delete
async function callWS(url, method, sentData = {}) {
    console.log("Calling backend web service awdawd")
    let data;
    if (method == "select") {
        console.log("select")
        let response = await fetch(url, {
            method: 'GET'
        });
        data = await response.json();
    }
    else if (method == "insert") {
        let response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sentData)
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


const rootURLAdManage = "http://localhost:3030/admin"; // URL for admin management
const rootURLAdDelete = "http://localhost:3030/admin/delete"; // URL for delete admin account

// Search admin
let searchAdminBtnRef = document.querySelector("#SubmitAd");
searchAdminBtnRef.addEventListener("click", () => {
    const AdminId = document.querySelector("#IdAd").value; // ID input
    const AdminFName = document.querySelector("#FNameAd").value; // First Name input
    const AdminLName = document.querySelector("#LNameAd").value; // Last Name input
    const outputHtml = document.getElementById("outputAd"); // Variable in the html to show output
    // Select all
    console.log(AdminId);
    if (!AdminId && !AdminFName && !AdminLName) {
        callWS(rootURLAdManage + "/admins", "select").then((data) => {
            console.log(data);
            outputHtml.innerHTML = '';
            if (data.data.length > 0) {
                alert(data.message);
                let output;
                output = "<h1>Admin List<h1>";
                output += "<table class = 'table'>";
                output += "<thead>";
                output += "<tr>";
                output += "<th scope='col'>ID</th><th scope='col'>FirstName</th><th scope='col'>LastName</th><th scope='col'>Address</th><th scope='col'>Birthday</th><th scope='col'>Email</th><th scope='col'>PhoneNo</th>";
                output += "</tr>"
                output += "</thead>";
                output += "<tbody>";
                data.data.forEach((element) => {
                    output += "<tr>";
                    output += "<td>" + element.AD_NUM + "</td>";
                    output += "<td>" + element.AD_FNAME + "</td>";
                    output += "<td>" + element.AD_LNAME + "</td>";
                    output += "<td>" + element.AD_ADDRESS + "</td>";
                    output += "<td>" + element.AD_BD + "</td>";
                    output += "<td>" + element.AD_EMAIL + "</td>";
                    output += "<td>" + element.AD_PHONE + "</td>";
                    output += "<td>";
                    output += `<button id="delete-${element.AD_NUM}" onclick="deleteHandler('${element.AD_NUM}')"><i class="fa-solid fa-trash-can"></i></button>`;
                    output += `<button id='update' onclick="updateHandler('${element.AD_NUM}')"><a> Edit </a></button>`;
                    output += "</td>"
                    output += "</tr>";
                });
                output += "</tbody>";
                output += "</table>";
                console.log(output);
                outputHtml.innerHTML = output;
            }

        })
    }
    // Search ID
    if (AdminId && (!AdminFName && !AdminLName)) {
        callWS(rootURLAdManage + "/Id/" + AdminId, "select").then((data) => {
            //data: [{ id: 1, name: "a" }, { id: 2, name: "b" }]
            console.log(data);
            outputHtml.innerHTML = '';
            if (data.data.length > 0) {
                alert(data.message);
                let output;
                output = "<h1>Admin List<h1>";
                output += "<table class = 'table'>";
                output += "<thead>";
                output += "<tr>";
                output += "<th scope='col'>ID</th><th scope='col'>FirstName</th><th scope='col'>LastName</th><th scope='col'>Address</th><th scope='col'>Birthday</th><th scope='col'>Email</th><th scope='col'>PhoneNo</th>";
                output += "</tr>"
                output += "</thead>";
                output += "<tbody>";
                data.data.forEach((element) => {
                    output += "<tr>";
                    output += "<td>" + element.AD_NUM + "</td>";
                    output += "<td>" + element.AD_FNAME + "</td>";
                    output += "<td>" + element.AD_LNAME + "</td>";
                    output += "<td>" + element.AD_ADDRESS + "</td>";
                    output += "<td>" + element.AD_BD + "</td>";
                    output += "<td>" + element.AD_EMAIL + "</td>";
                    output += "<td>" + element.AD_PHONE + "</td>";
                    output += "<td>";
                    output += `<button id="delete-${element.AD_NUM}" onclick="deleteHandler('${element.AD_NUM}')"><i class="fa-solid fa-trash-can"></i></button>`;
                    output += `<button id='update' onclick="updateHandler('${element.AD_NUM}')"><a> Edit </a></button>`;
                    output += "</td>"

                    output += "</tr>";
                });
                output += "</tbody>";
                output += "</table>";
                console.log(output);
                outputHtml.innerHTML = output;
            }
            console.log(output);
        });
    }
    // Search First Name
    if (AdminFName && (!AdminId && !AdminLName)) {
        callWS(rootURLAdManage + "/FName/" + AdminFName, "select").then((data) => {
            //data: [{ id: 1, name: "a" }, { id: 2, name: "b" }]
            console.log(data);
            outputHtml.innerHTML = '';
            if (data.data.length > 0) {
                alert(data.message);
                let output;
                output = "<h1>Admin List<h1>";
                output += "<table class = 'table'>";
                output += "<thead>";
                output += "<tr>";
                output += "<th scope='col'>ID</th><th scope='col'>FirstName</th><th scope='col'>LastName</th><th scope='col'>Address</th><th scope='col'>Birthday</th><th scope='col'>Email</th><th scope='col'>PhoneNo</th>";
                output += "</tr>"
                output += "</thead>";
                output += "<tbody>";
                data.data.forEach((element) => {
                    output += "<tr>";
                    output += "<td>" + element.AD_NUM + "</td>";
                    output += "<td>" + element.AD_FNAME + "</td>";
                    output += "<td>" + element.AD_LNAME + "</td>";
                    output += "<td>" + element.AD_ADDRESS + "</td>";
                    output += "<td>" + element.AD_BD + "</td>";
                    output += "<td>" + element.AD_EMAIL + "</td>";
                    output += "<td>" + element.AD_PHONE + "</td>";
                    output += "<td>";
                    output += `<button id="delete-${element.AD_NUM}" onclick="deleteHandler('${element.AD_NUM}')"><i class="fa-solid fa-trash-can"></i></button>`;
                    output += `<button id='update' onclick="updateHandler('${element.AD_NUM}')"><a> Edit </a></button>`;
                    output += "</td>"

                    output += "</tr>";
                });
                output += "</tbody>";
                output += "</table>";
                console.log(output);
                outputHtml.innerHTML = output;
            }
            console.log(output);
        });
    }
    // Search Last Name
    if (AdminLName && (!AdminFName && !AdminId)) {
        callWS(rootURLAdManage + "/LName/" + AdminLName, "select").then((data) => {
            //data: [{ id: 1, name: "a" }, { id: 2, name: "b" }]
            console.log(data);
            outputHtml.innerHTML = '';
            if (data.data.length > 0) {
                alert(data.message);
                let output;
                output = "<h1>Admin List<h1>";
                output += "<table class = 'table'>";
                output += "<thead>";
                output += "<tr>";
                output += "<th scope='col'>ID</th><th scope='col'>FirstName</th><th scope='col'>LastName</th><th scope='col'>Address</th><th scope='col'>Birthday</th><th scope='col'>Email</th><th scope='col'>PhoneNo</th>";
                output += "</tr>"
                output += "</thead>";
                output += "<tbody>";
                data.data.forEach((element) => {
                    output += "<tr>";
                    output += "<td>" + element.AD_NUM + "</td>";
                    output += "<td>" + element.AD_FNAME + "</td>";
                    output += "<td>" + element.AD_LNAME + "</td>";
                    output += "<td>" + element.AD_ADDRESS + "</td>";
                    output += "<td>" + element.AD_BD + "</td>";
                    output += "<td>" + element.AD_EMAIL + "</td>";
                    output += "<td>" + element.AD_PHONE + "</td>";
                    output += "<td>";
                    output += `<button id="delete-${element.AD_NUM}" onclick="deleteHandler('${element.AD_NUM}')"><i class="fa-solid fa-trash-can"></i></button>`;
                    output += `<button id='update' onclick="updateHandler('${element.AD_NUM}')"><a> Edit </a></button>`;
                    output += "</td>"

                    output += "</tr>";
                });
                output += "</tbody>";
                output += "</table>";
                console.log(output);
                outputHtml.innerHTML = output;
            }
            console.log(output);
        })
    }
    // Search id and fist name
    if (AdminId && AdminFName && (!AdminLName)) {
        callWS(rootURLAdManage + "/IdFName/" + AdminId + "/" + AdminFName, "select").then((data) => {
            //data: [{ id: 1, name: "a" }, { id: 2, name: "b" }]
            console.log(data);
            outputHtml.innerHTML = '';
            if (data.data.length > 0) {
                alert(data.message);
                let output;
                output = "<h1>Admin List<h1>";
                output += "<table class = 'table'>";
                output += "<thead>";
                output += "<tr>";
                output += "<th scope='col'>ID</th><th scope='col'>FirstName</th><th scope='col'>LastName</th><th scope='col'>Address</th><th scope='col'>Birthday</th><th scope='col'>Email</th><th scope='col'>PhoneNo</th>";
                output += "</tr>"
                output += "</thead>";
                output += "<tbody>";
                data.data.forEach((element) => {
                    output += "<tr>";
                    output += "<td>" + element.AD_NUM + "</td>";
                    output += "<td>" + element.AD_FNAME + "</td>";
                    output += "<td>" + element.AD_LNAME + "</td>";
                    output += "<td>" + element.AD_ADDRESS + "</td>";
                    output += "<td>" + element.AD_BD + "</td>";
                    output += "<td>" + element.AD_EMAIL + "</td>";
                    output += "<td>" + element.AD_PHONE + "</td>";
                    output += "<td>";
                    output += `<button id="delete-${element.AD_NUM}" onclick="deleteHandler('${element.AD_NUM}')"><i class="fa-solid fa-trash-can"></i></button>`;
                    output += `<button id='update' onclick="updateHandler('${element.AD_NUM}')"><a> Edit </a></button>`;
                    output += "</td>"

                    output += "</tr>";
                });
                output += "</tbody>";
                output += "</table>";
                console.log(output);
                outputHtml.innerHTML = output;
            }
            console.log(output);
        })
    }
    // Search id and last name
    if (AdminId && AdminLName && (!AdminFName)) {
        callWS(rootURLAdManage + "/IdLName/" + AdminId + "/" + AdminLName, "select").then((data) => {
            //data: [{ id: 1, name: "a" }, { id: 2, name: "b" }]
            console.log(data);
            outputHtml.innerHTML = '';
            if (data.data.length > 0) {
                alert(data.message);
                let output;
                output = "<h1>Admin List<h1>";
                output += "<table class = 'table'>";
                output += "<thead>";
                output += "<tr>";
                output += "<th scope='col'>ID</th><th scope='col'>FirstName</th><th scope='col'>LastName</th><th scope='col'>Address</th><th scope='col'>Birthday</th><th scope='col'>Email</th><th scope='col'>PhoneNo</th>";
                output += "</tr>"
                output += "</thead>";
                output += "<tbody>";
                data.data.forEach((element) => {
                    output += "<tr>";
                    output += "<td>" + element.AD_NUM + "</td>";
                    output += "<td>" + element.AD_FNAME + "</td>";
                    output += "<td>" + element.AD_LNAME + "</td>";
                    output += "<td>" + element.AD_ADDRESS + "</td>";
                    output += "<td>" + element.AD_BD + "</td>";
                    output += "<td>" + element.AD_EMAIL + "</td>";
                    output += "<td>" + element.AD_PHONE + "</td>";
                    output += "<td>";
                    output += `<button id="delete-${element.AD_NUM}" onclick="deleteHandler('${element.AD_NUM}')"><i class="fa-solid fa-trash-can"></i></button>`;
                    output += `<button id='update' onclick="updateHandler('${element.AD_NUM}')"><a> Edit </a></button>`;
                    output += "</td>"

                    output += "</tr>";
                });
                output += "</tbody>";
                output += "</table>";
                console.log(output);
                outputHtml.innerHTML = output;
            }
            console.log(output);
        })
    }
    // Search fisrt name and last name
    if (AdminFName && AdminLName && (!AdminId)) {
        callWS(rootURLAdManage + "/FNameLName/" + AdminFName + "/" + AdminLName, "select").then((data) => {
            //data: [{ id: 1, name: "a" }, { id: 2, name: "b" }]
            console.log(data);
            outputHtml.innerHTML = '';
            if (data.data.length > 0) {
                alert(data.message);
                let output;
                output = "<h1>Admin List<h1>";
                output += "<table class = 'table'>";
                output += "<thead>";
                output += "<tr>";
                output += "<th scope='col'>ID</th><th scope='col'>FirstName</th><th scope='col'>LastName</th><th scope='col'>Address</th><th scope='col'>Birthday</th><th scope='col'>Email</th><th scope='col'>PhoneNo</th>";
                output += "</tr>"
                output += "</thead>";
                output += "<tbody>";
                data.data.forEach((element) => {
                    output += "<tr>";
                    output += "<td>" + element.AD_NUM + "</td>";
                    output += "<td>" + element.AD_FNAME + "</td>";
                    output += "<td>" + element.AD_LNAME + "</td>";
                    output += "<td>" + element.AD_ADDRESS + "</td>";
                    output += "<td>" + element.AD_BD + "</td>";
                    output += "<td>" + element.AD_EMAIL + "</td>";
                    output += "<td>" + element.AD_PHONE + "</td>";
                    output += "<td>";
                    output += `<button id="delete-${element.AD_NUM}" onclick="deleteHandler('${element.AD_NUM}')"><i class="fa-solid fa-trash-can"></i></button>`;
                    output += `<button id='update' onclick="updateHandler('${element.AD_NUM}')"><a> Edit </a></button>`;
                    output += "</td>"

                    output += "</tr>";
                });
                output += "</tbody>";
                output += "</table>";
                console.log(output);
                outputHtml.innerHTML = output;
            }
            console.log(output);
        })
    }
    // Search by id, first name, and last name
    if (AdminId && AdminFName && AdminLName) {
        callWS(rootURLAdManage + "/IdFNameLName/" + AdminId + "/" + AdminFName + "/" + AdminLName, "select").then((data) => {
            console.log(data);
            outputHtml.innerHTML = '';
            if (data.data.length > 0) {
                alert(data.message);
                let output;
                output = "<h1>Admin List<h1>";
                output += "<table class = 'table'>";
                output += "<thead>";
                output += "<tr>";
                output += "<th scope='col'>ID</th><th scope='col'>FirstName</th><th scope='col'>LastName</th><th scope='col'>Address</th><th scope='col'>Birthday</th><th scope='col'>Email</th><th scope='col'>PhoneNo</th>";
                output += "</tr>"
                output += "</thead>";
                output += "<tbody>";
                data.data.forEach((element) => {
                    output += "<tr>";
                    output += "<td>" + element.AD_NUM + "</td>";
                    output += "<td>" + element.AD_FNAME + "</td>";
                    output += "<td>" + element.AD_LNAME + "</td>";
                    output += "<td>" + element.AD_ADDRESS + "</td>";
                    output += "<td>" + element.AD_BD + "</td>";
                    output += "<td>" + element.AD_EMAIL + "</td>";
                    output += "<td>" + element.AD_PHONE + "</td>";
                    output += "<td>";
                    output += `<button id="delete-${element.AD_NUM}" onclick="deleteHandler('${element.AD_NUM}')"><i class="fa-solid fa-trash-can"></i></button>`;
                    output += `<button id='update' onclick="updateHandler('${element.AD_NUM}')"><a> Edit </a></button>`;
                    output += "</td>"

                    output += "</tr>";
                });
                output += "</tbody>";
                output += "</table>";
                console.log(output);
                outputHtml.innerHTML = output;
            }
            console.log(output);
        })

    }


});

// Delete Admin
async function deleteHandler(AdminId) {
    console.log("calling delete web service");
    const data = {
        Admin: {
            AD_NUM: AdminId,
        }
    };
    await callWS(rootURLAdDelete, "delete", data);
    alert("Delete admin successfully");
}

// Function to show update admin information form
async function updateHandler(AdminId) {
    console.log("calling Edit web service");
    const outputHtml2 = document.getElementById("outputEdit");
    callWS(rootURLAdManage + "/Id/" + AdminId, "select").then((data) => {
        console.log(data);
        outputHtml2.innerHTML = '';
        if (data.data.length > 0) {
            alert(data.message);
            data.data.forEach((element) => {
                const AdFirstnameInput = element.AD_FNAME;
                const AdLastnameInput = element.AD_LNAME;
                const AdAddressInput = element.AD_ADDRESS;
                const AdBirthdayInput = element.AD_BD.substring(0, 10);
                const AdEmailInput = element.AD_EMAIL;
                const AdMobileInput = element.AD_PHONE;
                const AdIdInput = element.AD_NUM;
                let outputUp;
                outputUp = "<h1>Admin Info Edit<h1>";
                outputUp += `<div class="form">`;
                outputUp += `<form id = "AdminForm">`
                outputUp += `<fieldset>`
                outputUp += `<div class="row">`
                outputUp += `<div class="col-25">`
                outputUp += `<label for="first-name">First Name:</label>`
                outputUp += `</div>`
                outputUp += `<div class="col-75">`
                outputUp += `<input type="text" id = "EditFirstname" value="${AdFirstnameInput}" name="first-name" required>`
                outputUp += `<br>`
                outputUp += `</div>`
                outputUp += `<div class="row">`
                outputUp += `<div class="col-25">`
                outputUp += `<label for="last-name">Last Name:</label>`
                outputUp += `</div>`
                outputUp += `<div class="col-75">`
                outputUp += `<input type="text" id = "EditLastname" value="${AdLastnameInput}" name="last-name" required>`
                outputUp += `</div>`
                outputUp += `<br>`
                outputUp += `</div>`
                outputUp += `<div class="row">`
                outputUp += `<div class="col-25">`
                outputUp += `<label for="address">Address:</label>`
                outputUp += `</div>`
                outputUp += `<div class="col-75">`
                outputUp += `<input type="text" id = "EditAddress" value="${AdAddressInput}" name="address" required>`
                outputUp += `</div>`
                outputUp += `<br>`
                outputUp += `</div>`
                outputUp += `<div class="row">`
                outputUp += `<div class="col-25">`
                outputUp += `<label for="birthday">birthday:</label>`
                outputUp += `</div>`
                outputUp += `<div class="col-75">`
                outputUp += `<input type="text" id = "EditBirthday" value="${AdBirthdayInput}" name="birthday" required>`
                outputUp += `</div>`
                outputUp += `<br>`
                outputUp += `</div>`
                outputUp += `<div class="row">`
                outputUp += `<div class="col-25">`
                outputUp += `<label for="email">Email:</label>`
                outputUp += `</div>`
                outputUp += `<div class="col-75">`
                outputUp += `<input type="email" id = "EditEmail" value="${AdEmailInput}" name="email" required>`
                outputUp += `</div>`
                outputUp += `<br>`
                outputUp += `</div>`
                outputUp += `<div class="row">`
                outputUp += `<div class="col-25">`
                outputUp += `<label for="mobile">Mobile:</label>`
                outputUp += `</div>`
                outputUp += `<div class="col-75">`
                outputUp += `<input type="tel" id = "EditMobile" value="${AdMobileInput}" name="mobile" required>`
                outputUp += `</div>`
                outputUp += `<br>`
                outputUp += `</div>`
                outputUp += `<div class="row">`
                outputUp += `<div class="col-25">`
                outputUp += `<label for="Id">ID:</label>`
                outputUp += `</div>`
                outputUp += `<div class="col-75">`
                outputUp += `<input type="tel" id = "EditId" value="${AdIdInput}" name="Id" required>`
                outputUp += `</div>`
                outputUp += `<br>`
                outputUp += `</div>`
                outputUp += `<input type="submit" value="Submit" id = SubmitEdit class="submit" onclick="UpdateInfo('${element.AD_NUM}')">`
                outputUp += `</fielset>`
                outputUp += `</form>`
                outputUp += `</div>`
                console.log(outputUp);
                outputHtml2.innerHTML = outputUp;
            });
        }
    });
}

// Update admin function
async function UpdateInfo(AdminId) {
    console.log("calling Update web service");
    const AdminFName = document.querySelector("#EditFirstname").value;
    const AdminLName = document.querySelector("#EditLastname").value;
    const AdminAddress = document.querySelector("#EditAddress").value;
    const AdminBirthday = document.querySelector("#EditBirthday").value;
    const AdminEmail = document.querySelector("#EditEmail").value;
    const AdminMobilephone = document.querySelector("#EditMobile").value;
    const AdminID = document.querySelector("#EditId").value;

    const data = {
        Admin_info: {
            AD_NUM: AdminID,
            AD_FNAME: AdminFName,
            AD_LNAME: AdminLName,
            AD_ADDRESS: AdminAddress,
            AD_BD: AdminBirthday,
            AD_EMAIL: AdminEmail,
            AD_PHONE: AdminMobilephone
        }
    }
    
    callWS(rootURLAdManage + "/update", "update", data)
    alert("Update admin information successfully");
}

const form = document.querySelector('#AdminForm');
form.addEventListener('submit', (event) => {
    event.preventDefault(); // prevent web page from reloading
});

// Insert admin function
let InsertAdminBtnRef = document.querySelector("#SubmitInsert");
InsertAdminBtnRef.addEventListener("click", () => {
    const AdminUsername = document.querySelector("#AdUsername").value;
    const AdminPassword = document.querySelector("#AdPassword").value;
    const AdminFName = document.querySelector("#AdFirstname").value;
    const AdminLName = document.querySelector("#AdLastname").value;
    const AdminAddress = document.querySelector("#AdAddress").value;
    const AdminBirthday = document.querySelector("#AdBirthday").value;
    const AdminEmail = document.querySelector("#AdEmail").value;
    const AdminMobilephone = document.querySelector("#AdMobile").value;
    const AdminId = document.querySelector("#AdId").value;
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    const data = {
        Admin_info: {
            AD_NUM: AdminId,
            AD_FNAME: AdminFName,
            AD_LNAME: AdminLName,
            AD_ADDRESS: AdminAddress,
            AD_BD: AdminBirthday,
            AD_EMAIL: AdminEmail,
            AD_PHONE: AdminMobilephone
        },
        Admin_login: {
            AD_USERNAME: AdminUsername,
            AD_PASSWORD: AdminPassword,
            AD_LOGIN_TIMESTAMP: formattedDate,
            AD_NUM: AdminId
        }
    }
    callWS(rootURLAdManage + "/add", "insert", data)
    alert("Insert admin successfully");
});