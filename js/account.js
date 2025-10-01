// ========== REGISTER ==========
document.getElementById("registerForm")?.addEventListener("submit", function(e) {
  e.preventDefault();

  let name = document.getElementById("regName").value;
  let phone = document.getElementById("regPhone").value;
  let email = document.getElementById("regEmail").value;
  let password = document.getElementById("regPassword").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.find(u => u.email === email)) {
    alert("Email already exists!");
    
  }

  let newUser = {
    name,
    phone,
    email,
    password,
    avatar: "assets/images/default-avatar.png",
    address: "",
    membership: "Bronze",
    orders: []
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Register successful! Please login.");

  window.location.href = "login.html";
});

// ========== LOGIN ==========
document.getElementById("loginForm")?.addEventListener("submit", function(e) {
  e.preventDefault();

  let email = document.getElementById("loginEmail").value;
  let password = document.getElementById("loginPassword").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let user = users.find(u => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    alert("Login successful!");
  window.location.href = "my-account.html";
  } else {
    alert("Invalid email or password");
  }
});

// ========== PROFILE ==========
function loadProfile() {
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    window.location.href = "login.html";
    return;
  }

  // Sidebar
  document.getElementById("username")?.textContent = currentUser.name;
  document.getElementById("membership")?.textContent =
    (currentUser.membership || "Bronze") + " Member";
  document.getElementById("profilePic").src =
    currentUser.avatar || "assets/images/default-avatar.png";

  // Overview
  document.getElementById("totalOrders")?.textContent = currentUser.orders?.length || 0;
  document.getElementById("progressOrders")?.textContent =
    (currentUser.orders.filter(o => o.status === "Processing").length || 0);
  document.getElementById("rank")?.textContent = currentUser.membership || "Bronze";

  // Settings form
  document.getElementById("fullName")?.setAttribute("value", currentUser.name);
  document.getElementById("email")?.setAttribute("value", currentUser.email);
  document.getElementById("phone")?.setAttribute("value", currentUser.phone || "");
  document.getElementById("address")?.setAttribute("value", currentUser.address || "");

  // Orders list
  renderOrders(currentUser.orders || []);
}

// ========== RENDER ORDERS ==========
function renderOrders(orders) {
  const orderList = document.getElementById("orderList");
  if (!orderList) return;

  orderList.innerHTML = "";
  if (!orders.length) {
    orderList.innerHTML = "<p>No orders yet.</p>";
    return;
  }

  orders.forEach(order => {
    const div = document.createElement("div");
    div.classList.add("order-item");
    div.innerHTML = `
      <p><strong>Order #${order.id}</strong></p>
      <p>Date: ${order.date}</p>
      <p>Status: <span class="order-status">${order.status}</span></p>
      <p>Total: ${order.total}</p>
    `;
    orderList.appendChild(div);
  });
}

// ========== UPDATE PROFILE ==========
document.getElementById("profileForm")?.addEventListener("submit", function(e) {
  e.preventDefault();
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  let users = JSON.parse(localStorage.getItem("users")) || [];

  currentUser.name = document.getElementById("fullName").value;
  currentUser.phone = document.getElementById("phone").value;
  currentUser.address = document.getElementById("address").value;

  // Không cho đổi email để giữ liên kết
  currentUser.email = currentUser.email;

  users = users.map(u => (u.email === currentUser.email ? currentUser : u));

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("currentUser", JSON.stringify(currentUser));

  alert("Profile updated!");
  loadProfile();
});

// ========== PASSWORD ==========
document.getElementById("passwordForm")?.addEventListener("submit", function(e) {
  e.preventDefault();

  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  let users = JSON.parse(localStorage.getItem("users")) || [];

  let currentPass = document.getElementById("currentPassword").value;
  let newPass = document.getElementById("newPassword").value;
  let confirmPass = document.getElementById("confirmPassword").value;

  if (currentPass !== currentUser.password) {
    alert("Current password is incorrect!");
    return;
  }
  if (newPass !== confirmPass) {
    alert("New password does not match!");
    return;
  }

  currentUser.password = newPass;
  users = users.map(u => (u.email === currentUser.email ? currentUser : u));

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("currentUser", JSON.stringify(currentUser));

  alert("Password updated successfully!");
  document.getElementById("passwordForm").reset();
});

// ========== AVATAR UPLOAD ==========
document.getElementById("uploadAvatar")?.addEventListener("change", e => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = ev => {
      document.getElementById("profilePic").src = ev.target.result;

      let currentUser = JSON.parse(localStorage.getItem("currentUser"));
      let users = JSON.parse(localStorage.getItem("users")) || [];

      currentUser.avatar = ev.target.result;
      users = users.map(u => (u.email === currentUser.email ? currentUser : u));

      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    };
    reader.readAsDataURL(file);
  }
});

// ========== TAB SWITCH ==========
const tabs = document.querySelectorAll(".menu li");
const sections = document.querySelectorAll(".tab");
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    sections.forEach(s => s.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});


document.querySelector('[data-tab="logout"]')?.addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
});


if (document.querySelector(".profile-container")) {
  loadProfile();
}
