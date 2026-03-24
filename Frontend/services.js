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
document.addEventListener("DOMContentLoaded",function(){

    const modal = document.getElementById("packageModal");
    const closeBtn = document.getElementById("closeModal");
    const buttons = document.querySelectorAll(".view-btn");

    buttons.forEach(btn=>{
        btn.addEventListener("click",()=>{
            modal.classList.add("active");
        });
    });

    closeBtn.addEventListener("click",()=>{
        modal.classList.remove("active");
    });

    window.addEventListener("click",(e)=>{
        if(e.target === modal){
            modal.classList.remove("active");
        }
    });

});