console.log("JS Loaded");

// document.addEventListener("DOMContentLoaded", function() {

//     const toggle = document.getElementById("menu-toggle");
//     const navbar = document.getElementById("navbar");

//     toggle.addEventListener("click", function() {
//         navbar.classList.toggle("active");
//     });

// });
// document.getElementById("navbar").classList.add("active")


// document.addEventListener("DOMContentLoaded", function() {

//     const toggle = document.getElementById("menu-toggle");
//     const navbar = document.getElementById("navbar");

//     console.log("Toggle:", toggle);
//     console.log("Navbar:", navbar);

//     toggle.addEventListener("click", function() {
//         console.log("Clicked 🔥");
//         navbar.classList.toggle("active");
//     });

// });

document.addEventListener("DOMContentLoaded", function () {

    const toggle = document.getElementById("menu-toggle");
    const navbar = document.getElementById("navbar");

    if(toggle && navbar){
        toggle.addEventListener("click", function () {
            navbar.classList.toggle("active");
        });
      }

let user = JSON.parse(localStorage.getItem("loggedInUser"));

if(user){
    document.getElementById("authButtons").style.display = "none";
    document.getElementById("userBox").style.display = "block"; // ⭐ ADD THIS
    document.getElementById("userName").innerText = "Hi, " + user.name;
} else {
    document.getElementById("userBox").style.display = "none"; // ⭐ ADD THIS
}

document.getElementById("userName").onclick = function(){
    let drop = document.getElementById("dropdown");
drop.classList.toggle("show");

    }

});

function logout(){
  localStorage.removeItem("isAdminLoggedIn");
  localStorage.removeItem("loggedInUser");
  window.location.href = "login-signup.html";
}

//Login-SignUp PAge

function switchRole(index){
  const indicator = document.querySelector(".role-indicator");
  const roles = document.querySelectorAll(".role");
  const signupTab = document.querySelectorAll(".tab")[1];

  indicator.style.transform = `translateX(${index*100}%)`;

  roles.forEach(r => r.classList.remove("active"));
  roles[index].classList.add("active");

  // 🔥 FIXED PART
  const tabIndicator = document.querySelector(".tab-indicator");

  if (roles[index].innerText === "Admin") {
    signupTab.style.display = "none";

    tabIndicator.style.width = "100%";
    tabIndicator.style.transform = "translateX(0%)";

    switchTab(0);
  } else {
    signupTab.style.display = "block";

    tabIndicator.style.width = "50%";
  }
}

function switchTab(index){
const indicator=document.querySelector(".tab-indicator");
const tabs=document.querySelectorAll(".tab");
const nameField=document.getElementById("nameField");
const btn=document.querySelector(".auth-btn");

indicator.style.transform=`translateX(${index*100}%)`;

tabs.forEach(t=>t.classList.remove("active"));
tabs[index].classList.add("active");

if(index === 1){
  nameField.style.display = "block";
  nameField.querySelector("input").required = true;

  btn.innerText = "Create Account";
  btn.onclick = signupUser;

} else {
  nameField.style.display = "none";
  nameField.querySelector("input").required = false;

  btn.innerText = "Login";
  btn.onclick = loginUser;
}
}

// async function loginUser(e) {
//   e.preventDefault();

//   const email = document.getElementById("loginEmail").value;
//   const password = document.getElementById("loginPassword").value;

//   let role = document.querySelector(".role.active").innerText;

//   // 🔥 ADMIN LOGIN
//   if (role === "Admin") {
//     if (email === "admin@plankaro.com" && password === "1234") {
//       localStorage.setItem("isAdminLoggedIn", "true");
//       window.location.href = "admin.html";
//       return;
//     } else {
//       alert("Invalid Admin Credentials ❌");
//       return;
//     }
//   }

//   // 👤 USER LOGIN (UPDATED)
//   let users = JSON.parse(localStorage.getItem("users")) || [];

//   let validUser = users.find(u => u.email === email && u.password === password);

//   if (validUser) {
//     localStorage.setItem("loggedInUser", JSON.stringify(validUser));
//     alert("Login Successful 🎉");
//     window.location.href = "index.html";
//   } else {
//     alert("Invalid Email or Password ❌");
//   }
// }

async function loginUser(e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  let role = document.querySelector(".role.active").innerText;

  // 🔴 ADMIN LOGIN
  if (role === "Admin") {
    if (email === "admin@plankaro.com" && password === "1234") {
      localStorage.setItem("isAdminLoggedIn", "true");
      window.location.href = "admin.html";
      return;
    } else {
      alert("Invalid Admin Credentials ❌");
      return;
    }
  }

  // 🟢 VENDOR LOGIN
  if (role === "Vendor") {
    const vendors = [
      { email: "catering@plankaro.com", password: "123456", name: "Catering Vendor" },
      { email: "decor@plankaro.com", password: "123456", name: "Decoration Vendor" },
      { email: "dj@plankaro.com", password: "123456", name: "DJ Vendor" }
    ];

    let found = vendors.find(v => v.email === email && v.password === password);

    if (found) {
      localStorage.setItem("vendor", found.name);
      alert("Vendor Login Successful ✅");
      window.location.href = "vendor-dashboard.html";
      return;
    } else {
      alert("Invalid Vendor Credentials ❌");
      return;
    }
  }

  // 🔵 USER LOGIN
  let users = JSON.parse(localStorage.getItem("users")) || [];

  let validUser = users.find(u => u.email === email && u.password === password);

  if (validUser) {
    localStorage.setItem("loggedInUser", JSON.stringify(validUser));
    alert("Login Successful 🎉");
    window.location.href = "index.html";
  } else {
    alert("Invalid Email or Password ❌");
  }
}

function signupUser() {
    const name = document.querySelector("#nameField input").value;
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    if (!name || !email || !password) {
        alert("Please fill all fields");
        return;
    }

    let userData = {
        name: name,
        email: email,
        password: password
    };

    let users = JSON.parse(localStorage.getItem("users")) || [];

  // duplicate check
  let exists = users.find(u => u.email === email);
  if (exists) {
    alert("User already exists ❌");
    return;
  }

  users.push(userData);

  localStorage.setItem("users", JSON.stringify(users));

  alert("Signup Successful 🎉");
}

// //Cre
// document.getElementById("eventForm").addEventListener("submit", function(e){
// e.preventDefault();

// alert("🎉 Your event request has been submitted successfully!");

// this.reset();
// });
function validateForm() {
  let email = document.querySelector('input[name="email"]').value;
  if (!email.includes("@")) {
    alert("Enter valid email");
    return false;
  }
}
