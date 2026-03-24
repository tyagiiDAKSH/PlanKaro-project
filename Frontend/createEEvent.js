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
    drop.style.display = drop.style.display === "block" ? "none" : "block";
}
function logout(){
    localStorage.removeItem("loggedInUser");  // ⭐ ye hona hi chahiye
    window.location.href = "index.html";      // ⭐ reload nahi, redirect
}

document.addEventListener("DOMContentLoaded", function () {

    const toggle = document.getElementById("menu-toggle");
    const navbar = document.getElementById("navbar");

    if(toggle && navbar){
        toggle.addEventListener("click", function () {
            navbar.classList.toggle("active");
        });
    }

});
document.getElementById("eventForm").addEventListener("submit", function(e){
  e.preventDefault();

  let event = {
    type: document.querySelector("select").value,
    date: document.querySelector("input[type='date']").value,
    guests: document.querySelectorAll("input")[1].value,
    budget: document.querySelectorAll("input")[2].value,
    location: document.querySelectorAll("input")[3].value,
    requirements: document.querySelector("textarea").value
  };

  let events = JSON.parse(localStorage.getItem("events")) || [];

  events.push(event);

  localStorage.setItem("events", JSON.stringify(events));

  alert("Event Submitted Successfully 🎉");

  document.getElementById("eventForm").reset();
});

