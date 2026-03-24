const BASE_URL = "https://plankaro-project.onrender.com";

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
  localStorage.removeItem("loggedInUser");
  window.location.href = "login-signup.html";
}

document.getElementById("eventForm").addEventListener("submit", async function(e){
  e.preventDefault();

  const type = document.getElementById("type").value;
  const date = document.getElementById("date").value;
  const guests = document.getElementById("guests").value;
  const budget = document.getElementById("budget").value;
  const location = document.getElementById("location").value;
  const requirements = document.getElementById("requirements").value;

  const user = JSON.parse(localStorage.getItem("user"));

  if(!user){
    alert("Please login first");
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/event/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type,
        date,
        guests,
        budget,
        location,
        requirements,
        createdBy: user.email
      })
    });

    const data = await res.json();
    alert(data.message);

  } catch(err){
    console.log(err);
    alert("Error creating event");
  }
});