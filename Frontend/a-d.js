<script>
        // Data
        if (localStorage.getItem("isAdminLoggedIn") !== "true") {
            window.location.href = "login-signup.html";
        }
        let events = JSON.parse(localStorage.getItem("events")) || [];
        let users = JSON.parse(localStorage.getItem("users")) || ["Daksh", "Rahul", "Aman"];

        // Show Section
        function showSection(section) {
            document.querySelectorAll(".section").forEach(sec => {
                sec.style.display = "none";
            });

            let current = document.getElementById(section);
            current.style.display = "block";
            current.style.animation = "fade 0.4s";
        }

        // Add Event
        function addEvent() {

            let type = document.querySelector("select").value;
            let date = document.querySelector("input[type='date']").value;
            let guests = document.querySelectorAll("input")[1].value;
            let budget = document.querySelectorAll("input")[2].value;
            let location = document.querySelectorAll("input")[3].value;
            let requirements = document.querySelector("textarea").value;

            if (type === "" || date === "") {
                alert("Please fill required fields");
                return;
            }

            let event = {
                type,
                date,
                guests,
                budget,
                location,
                requirements,
                status: "Pending"
            };

            events.push(event);

            localStorage.setItem("events", JSON.stringify(events));

            loadEvents();
            updateDashboard();

            alert("Event Added ✅");
        }

        // Load Events
        function loadEvents() {
            let list = document.getElementById("eventList");
            list.innerHTML = "";

            events.forEach((e, i) => {
                let li = document.createElement("li");
                li.className = "item";
                li.innerHTML = `
  <strong>${e.type}</strong><br>
  📅 ${e.date} | 📍 ${e.location}<br>
  👥 Guests: ${e.guests} | 💰 ₹${e.budget}<br>
  📝 ${e.requirements}<br>
  Status: ${e.status}<br>
  <button onclick="approveEvent(${i})">Approve</button>
  <button onclick="deleteEvent(${i})">Delete</button>
`;
                list.appendChild(li);
            });
        }

        // Delete Event
        function deleteEvent(i) {
            events.splice(i, 1);
            localStorage.setItem("events", JSON.stringify(events));
            loadEvents();
            updateDashboard();
        }

        // Load Users
        function loadUsers() {
            let list = document.getElementById("userList");
            list.innerHTML = "";

            users.forEach(u => {
                let li = document.createElement("li");
                li.className = "item";
                li.innerText = u;
                list.appendChild(li);
            });
        }

        // Update Dashboard
        function updateDashboard() {
            document.getElementById("totalEvents").innerText = events.length;
            document.getElementById("totalUsers").innerText = users.length;
        }

        // Logout
        function logout() {
            alert("Logged out");
            window.location.href = "login-signup.html";
        }

        function loadUsers() {
            let users = JSON.parse(localStorage.getItem("users")) || [];

            let list = document.getElementById("userList");
            list.innerHTML = "";

            users.forEach((user, index) => {
                let li = document.createElement("li");

                li.innerHTML = `
      ${user.name} (${user.email})
      <button onclick="deleteUser(${index})">Delete</button>
    `;

                list.appendChild(li);
            });

            // count update
            document.getElementById("totalUsers").innerText = users.length;
        }

        function deleteUser(index) {
            let users = JSON.parse(localStorage.getItem("users")) || [];

            users.splice(index, 1);

            localStorage.setItem("users", JSON.stringify(users));

            loadUsers();
        }
        function approveEvent(i){
  events[i].status = "Approved";
  localStorage.setItem("events", JSON.stringify(events));
  loadEvents();
}

        // Init
        loadEvents();
        loadUsers();
        updateDashboard();
    </script>