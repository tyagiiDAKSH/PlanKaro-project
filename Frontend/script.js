console.log("JS Loaded");
const BASE_URL = "http://192.168.1.7:5000";


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

let user = JSON.parse(localStorage.getItem("user"));

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
  localStorage.removeItem("user");
  window.location.href = "login-signup.html";
}


document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.querySelector("input[name='name']").value;
  const email = document.querySelector("input[name='email']").value;
  const message = document.querySelector("textarea[name='message']").value;

  try {
    const res = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, message })
    });

    const data = await res.json();

    if (data.success) {
      alert("Message Sent Successfully ✅");
      document.getElementById("contactForm").reset();
    } else {
      alert("Something went wrong ❌");
    }
  } catch (err) {
    alert("Server error ❌");
  }
});
