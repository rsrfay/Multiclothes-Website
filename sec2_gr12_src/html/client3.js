// Call web service for admin login authentication
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

const rootURLAdminLogin = "http://localhost:3030/admin-login"; // URL for login authentication

// Login function
async function loginHandler() {
    const adminEmail = document.querySelector("#email").value;
    const adminPass = document.querySelector("#password").value;
    const data = {
        username: adminEmail,
        password: adminPass
    };
    const response =  await callWS(rootURLAdminLogin, "insert", data)
    if (response.status === 200) { // if response is OK
        console.log("Login successful");
        alert("Login successful");
        window.location.href = "/adminhome";
    } else if (response.status === 401) { // if response is error
        console.log(response.message);
        alert('Invalid, Please try again');
    }
    else{
        alert('Please enter username and password');
    }
}