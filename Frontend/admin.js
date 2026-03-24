const BASE_URL = "https://plankaro-project.onrender.com";


// ================= LOAD EVENTS =================
let events = [];

async function loadEvents() {
  try {
    const res = await fetch(`${BASE_URL}/event/all`);
    const data = await res.json();

    events = data;
    displayEvents();
    updateDashboard();
  } catch (err) {
    console.log("Error loading events:", err);
  }
}

// ================= DISPLAY EVENTS =================
function displayEvents() {
  let list = document.getElementById("eventList");
  list.innerHTML = "";

  events.forEach((e) => {
    let li = document.createElement("li");
    li.className = "item";

    li.innerHTML = `
      <strong>${e.type}</strong><br>
      📅 ${e.date} | 📍 ${e.location}<br>
      👥 Guests: ${e.guests} | 💰 ₹${e.budget}<br>
      📝 ${e.requirements}<br>
      Status:${e.status}</b><br><br>

      <button onclick="approveEvent('${e._id}')">Approve</button>
      <button onclick="deleteEvent('${e._id}')">Delete</button>
    `;

    list.appendChild(li);
  });
}

// ================= APPROVE EVENT =================
async function approveEvent(id) {
  try {
    await fetch(`${BASE_URL}/event/approve/${id}`, {
      method: "PUT"
    });

    alert("Event Approved ✅");
    loadEvents();
  } catch (err) {
    console.log("Approve error:", err);
  }
}

// ================= DELETE EVENT =================
async function deleteEvent(id) {
  try {
    await fetch(`${BASE_URL}/event/delete/${id}`, {
      method: "DELETE"
    });

    alert("Event Deleted ❌");
    loadEvents();
  } catch (err) {
    console.log("Delete error:", err);
  }
}

// ================= DASHBOARD COUNT =================
function updateDashboard() {
  document.getElementById("totalEvents").innerText = events.length;
}

// ================= LOAD USERS =================
async function loadUsers() {
  try {
    const res = await fetch( `${BASE_URL}/user`);
    const data = await res.json();

    let list = document.getElementById("userList");
    list.innerHTML = "";

    data.forEach((user) => {
  let div = document.createElement("div");

  div.className = "user-card";

  div.innerHTML = `
    <div class="user-info">
      <h3>👤 User: ${user.name}</h3>
      <p>${user.email}</p>
    </div>
    <button onclick="deleteUser('${user._id}')">Delete</button>
  `;

  list.appendChild(div);
});

    document.getElementById("totalUsers").innerText = data.length;

  } catch (err) {
    console.log("User load error:", err);
  }
}

// ================= DELETE USER =================
async function deleteUser(id) {
  try {
    await fetch(`${BASE_URL}/user/delete/${id}`, {
      method: "DELETE"
    });

    alert("User Deleted ❌");
    loadUsers();
  } catch (err) {
    console.log("Delete user error:", err);
  }
}

async function loadVendors() {
  try {
    const res = await fetch(`${BASE_URL}/vendor`);
    const data = await res.json();

    let list = document.getElementById("vendorList");
    list.innerHTML = "";

    data.forEach((vendor) => {
  let div = document.createElement("div");

  div.className = "user-card"; // same class use karenge

  div.innerHTML = `
    <div class="user-info">
      <h3>🏢 Vendor: ${vendor.name}</h3>
      <p>${vendor.email}</p>
    </div>
    <button onclick="deleteVendor('${vendor._id}')">Delete</button>
  `;

  list.appendChild(div);
});

    document.getElementById("totalVendors").innerText = data.length;

  } catch (err) {
    console.log("Vendor load error:", err);
  }
}

// ================= LOGOUT =================
function logout() {
  alert("Logged out");
  window.location.href = "login-signup.html";
}


function showSection(sectionId) {
  document.querySelectorAll(".section").forEach(sec => {
    sec.style.display = "none";
  });

  document.getElementById(sectionId).style.display = "block";

history.pushState({ section: sectionId }, "", `#${sectionId}`);
}

window.onpopstate = function (event) {
  if (event.state && event.state.section) {
    showSection(event.state.section);
  }
};

window.onload = function () {
  const hash = window.location.hash.replace("#", "");

  if (hash) {
    showSection(hash);
  } else {
    showSection("dashboard"); // default
  }
};


// ================= INIT =================
loadEvents();
loadUsers();
loadVendors();