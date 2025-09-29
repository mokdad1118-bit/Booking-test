// التحقق من المستخدم الحالي
const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
const currentUserEmail = currentUser.email || "";
const isAdmin = currentUser.role === "admin";

// إعادة التوجيه إذا لم يتم تسجيل الدخول
if (!currentUser.email) {
  alert("Please login first!");
  window.location.href = "login.html";
}

const bookings = [];
const bookingForm = document.getElementById("bookingForm");
const messageDiv = document.getElementById("message");
const bookingsTable = document.getElementById("bookingsTable");
const bookingsBody = bookingsTable ? bookingsTable.querySelector("tbody") : null;

if (bookingForm) {
  document.getElementById("date").min = new Date().toISOString().split("T")[0];
}

// تحميل الحجوزات من LocalStorage
const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
storedBookings.forEach(b => {
  b.start = new Date(b.start);
  b.end = new Date(b.end);
  bookings.push(b);
});

updateTable();

// عند إرسال النموذج (واجهة المستخدم)
if (bookingForm) {
  bookingForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const room = document.getElementById("room").value;
    const date = document.getElementById("date").value;
    const startTime = document.getElementById("startTime").value;
    const endTime = document.getElementById("endTime").value;
    const description = document.getElementById("description").value.trim();

    if (!name || !room || !date || !startTime || !endTime) {
      messageDiv.style.color = "red";
      messageDiv.textContent = "Please fill in all required fields.";
      return;
    }

    const start = new Date(date + "T" + startTime);
    const end = new Date(date + "T" + endTime);

    if (end <= start) {
      messageDiv.style.color = "red";
      messageDiv.textContent = "End time must be after start time.";
      return;
    }

    // التحقق من التعارض
    const conflict = bookings.some(b =>
      b.room === room &&
      b.date === date &&
      ((start >= b.start && start < b.end) ||
       (end > b.start && end <= b.end) ||
       (start <= b.start && end >= b.end))
    );

    if (conflict) {
      messageDiv.style.color = "red";
      messageDiv.textContent = "⚠ This room is already booked for the selected time.";
      return;
    }

    bookings.push({ name, email: currentUserEmail, room, date, start, end, description });
    localStorage.setItem('bookings', JSON.stringify(bookings));
    messageDiv.style.color = "green";
    messageDiv.textContent = "✅ Booking confirmed.";
    bookingForm.reset();
    updateTable();
  });
}

// تحديث جدول الحجوزات
function updateTable() {
  if (!bookingsBody) return;
  bookings.sort((a,b)=> a.start - b.start);
  bookingsBody.innerHTML = "";

  bookings.forEach((b,index) => {
    if (isAdmin || b.email === currentUserEmail) {
      const startStr = b.start.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit', hour12:false});
      const endStr = b.end.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit', hour12:false});
      const rowClass = b.room.includes("Audio/Video") ? "audio-video" : "";

      const row = document.createElement("tr");
      row.className = rowClass;
      row.innerHTML = `
        <td>${b.name}</td>
        <td>${b.email}</td>
        <td>${b.room}</td>
        <td>${b.date}</td>
        <td>${startStr}</td>
        <td>${endStr}</td>
        <td>${b.description || "-"}</td>
        <td><button class="cancel-btn" onclick="cancelBooking(${index})">Cancel</button></td>
      `;
      bookingsBody.appendChild(row);
    }
  });

  if(bookingsTable) bookingsTable.style.display = "table";
}

// إلغاء الحجز
function cancelBooking(index) {
  bookings.splice(index,1);
  localStorage.setItem('bookings', JSON.stringify(bookings));
  if(messageDiv){
    messageDiv.style.color = "#d9534f";
    messageDiv.textContent = "⚠ Booking cancelled.";
  }
  updateTable();
}

// زر الخروج
function logout(){
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}