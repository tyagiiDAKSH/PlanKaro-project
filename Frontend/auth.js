const BASE_URL = "http://192.168.1.7:5000";

let currentRole = "user";

// role switch (HTML already call kar raha hai)
function switchRole(index){
  const indicator = document.querySelector(".role-indicator");
  const roles = document.querySelectorAll(".role");
  const signupTab = document.querySelectorAll(".tab")[1];

  indicator.style.transform = `translateX(${index*100}%)`;

  roles.forEach(r => r.classList.remove("active"));
  roles[index].classList.add("active");

  // 👉 ROLE SET KARNA (IMPORTANT)
  if(index === 0){
    currentRole = "user";
  } else if(index === 1){
    currentRole = "vendor";
  } else {
    currentRole = "admin";
  }

  console.log("Role:", currentRole);

  // 👉 Admin ke liye signup hide
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

// LOGIN
async function loginUser(event){
  event.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  let url = "";

  if(currentRole === "admin"){
    url = `${BASE_URL}/admin/login`;
  } else if(currentRole === "vendor"){
    url = `${BASE_URL}/vendor/login`;
  } else {
    url = `${BASE_URL}/user/login`;
  }

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if(data.success || data.message === "Login successful"){
    alert("Login Success");

    // localStorage.setItem("user", JSON.stringify(data.user));

    if(currentRole === "admin"){
      localStorage.setItem("isAdminLoggedIn", "true");
    }
    else if(currentRole === "vendor"){
      localStorage.setItem("vendor", JSON.stringify(data.vendor));
    }
    else {
      localStorage.setItem("user", JSON.stringify(data.user));
    }

     if(currentRole === "admin"){
      window.location.href = "admin.html";
    } 
    else if(currentRole === "vendor"){
      window.location.href = "vendor-dashboard.html";
    } 
    else {
      window.location.href = "index.html";
    }

  } else {
    alert(data.message || "Invalid login");
  }
}

// SIGNUP
async function signupUser(event){
  event.preventDefault();

  const name = document.querySelector("#nameField input").value;
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  let url = "";

if(currentRole === "vendor"){
  url = `${BASE_URL}/vendor/signup`;
} 
else {
  url = `${BASE_URL}/user/signup`;
}

const res = await fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ name, email, password })
});

  const data = await res.json();

  alert(data.message);

  if(data.message === "Signup successful"){
    // signup ke baad login tab pe aa ja
    switchTab(0);
  }
}

function handleAuth(event){
  if(document.querySelector(".tab.active").innerText === "Signup"){
    signupUser(event);
  } else {
    loginUser(event);
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

} else {
  nameField.style.display = "none";
  nameField.querySelector("input").required = false;

  btn.innerText = "Login";
}
}

function goToPage(){
  window.location.href= "index.html";
}

