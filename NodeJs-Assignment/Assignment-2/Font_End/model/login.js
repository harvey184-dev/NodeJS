var adminApi = 'http://localhost:3000/admin/login_admin';

async function fetchAdminData(courseApi) {
    return await axios.get(courseApi)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.error('GET Error:', error);
        });
}

async function adminLogin(api, username, password) {
    const admins = await fetchAdminData(api);
    const admin = admins.find(
        (a) => a.username === username && a.password === password
    );
    if (admin) {
        window.location.href = "cpanel/index.html";
        localStorage.setItem('isLoggedIn', 'true');
    } else {
        alert('Incorrect email or password. Please try again.');
    }
}

function loginAdmin() {
    const username = document.querySelector('input[name="login_email"]').value;
    const password = md5(document.querySelector('input[name="login_password"]').value);
    if (!username || !password) {
        alert('Please enter both username and password.');
    } else {
        adminLogin(adminApi, username, password);
    }
}

const loginAPI = 'http://localhost:3000/login';

async function login1(api, customer_email, customer_password) {
    const logins = await fetchAdminData(api);
    const login = logins.find(
        (a) => a.customer_email === customer_email && a.customer_password === customer_password
    );

    if (login) {
        const loginToAdd = {
            customer_name: login.customer_name,
            customer_phone: login.customer_phone,
            customer_email: login.customer_email,
            customer_password: login.customer_password,
            customer_address: login.customer_address
        };

        addTologin(loginToAdd);
        window.location.href = `index.html`;
    } else {
        alert('Incorrect email or password. Please try again.');
    }
}

function addTologin(customer) {
    localStorage.setItem("customer", JSON.stringify(customer));
    console.log("Customer added:", customer);
}

function dangnhap() {
    const customer_email = document.querySelector('input[name="login_email"]').value;
    const customer_password = md5(document.querySelector('input[name="login_password"]').value);
    if (!customer_email || !customer_password) {
        alert('Please enter both username and password.');
    } else {
        login1(loginAPI, customer_email, customer_password);
    }
}

function dx() {
    localStorage.removeItem("isLoggedIn");
}

function cook() {
    localStorage.removeItem("customer");
}