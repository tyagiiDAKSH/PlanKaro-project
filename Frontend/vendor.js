const BASE_URL = "http://192.168.1.7:5000";

async function loadEvents() {
  const res = await fetch(`${BASE_URL}/event/all`);
  const events = await res.json();

  const container = document.getElementById("vendorEvents");
container.innerHTML = "";

events.forEach(e => {
  const card = document.createElement("div");
  card.className = "event-card";

  const status = e.vendorStatus || "Pending";

  card.innerHTML = `
    <div class="event-title">${e.type}</div>

  <div class="event-info">
  📅 <strong>Date:</strong> ${e.date}
  &nbsp;&nbsp;&nbsp;
  📍 <strong>Location:</strong> ${e.location}
</div>

<div class="event-info">
  👥 <strong>Guests:</strong> ${e.guests}
  &nbsp;&nbsp;&nbsp;
  💰 <strong>Budget:</strong> ₹${e.budget}
</div>

<div class="event-info">
  🛠 <strong>Requirement:</strong> ${e.requirements}
</div>

<div class="event-info">
  ${getStatusBadge(e.vendorStatus)}
</div>

    <button onclick="acceptEvent('${e._id}')">Accept</button>
    <button onclick="rejectEvent('${e._id}')">Reject</button>
  `;

  container.appendChild(card);
});
}


//ACCEPT
async function acceptEvent(id) {
  const url = `${BASE_URL}/event/vendor/accept/${id}`;

  console.log("👉 API HIT:", url);

  const res = await fetch(url, {
    method: "PUT"
  });

  console.log("👉 STATUS:", res.status);

  const text = await res.text(); // JSON ke jagah text lo (debug ke liye)
  console.log("👉 RESPONSE RAW:", text);

  try {
    const data = JSON.parse(text);
    console.log("👉 JSON:", data);
    alert(data.message || "Event Accepted");
  } catch (err) {
    console.log("❌ Not JSON response");
  }
 

  await loadEvents();
  
}

//REJECT
async function rejectEvent(id) {
  const url = `${BASE_URL}/event/vendor/reject/${id}`;

  const res = await fetch(url, {
    method: "PUT"
  });

  const text = await res.text(); // JSON ke jagah text lo (debug ke liye)

  try {
    const data = JSON.parse(text);
    console.log("👉 JSON:", data);
    alert(data.message || "Event Rejected");
  } catch (err) {
    console.log("❌ Not JSON response");
  }
 

  await loadEvents();
  
}
 



function logout() {
  localStorage.removeItem("vendor"); // agar tum vendor data save kar rahe ho
  window.location.href = "login-signup.html";
}

function getStatusBadge(status) {
  if (!status) status = "Pending";

  if (status === "Accepted") {
    return `✔️ <span class="status accepted">Accepted</span>`;
  } 
  else if (status === "Rejected") {
    return `❌ <span class="status rejected">Rejected</span>`;
  } 
  else {
    return `⏳ <span class="status pending">Pending</span>`;
  }
}
loadEvents();