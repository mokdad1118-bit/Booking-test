// قائمة المستخدمين التجريبية
const users = [
  { email: "bilal@gmail.com", password: "bilal123", role: "admin" },
  { email: "hr@gmail.com", password: "hr123", role: "user" },
  { email: "pro@gmail.com", password: "pro123", role: "user" },
  { email: "purchasing@gmail.com", password: "purchasing123", role: "user" },
  { email: "engineering@gmail.com", password: "eng123", role: "user" },
  { email: "it@gmail.com", password: "it123", role: "user" },
  { email: "finance@gmail.com", password: "finance123", role: "user" },
  { email: "marwan@gmail.com", password: "marwan123", role: "user" },
  { email: "bashar@gmail.com", password: "bashar123", role: "user" },
  { email: "fleet@gmail.com", password: "fleet123", role: "user" },
  { email: "inventory@gmail.com", password: "inventory123", role: "user" },
  { email: "production@gmail.com", password: "production123", role: "user" },
  { email: "purchasing@gmail.com", password: "purchasing123", role: "user" },
  { email: "abid@gmail.com", password: "abid123", role: "user" },
   { email: "fadl@gmail.com", password: "fadl123", role: "user" },
    { email: "fadi@gmail.com", password: "fadi123", role: "user" },
     { email: "jameel@gmail.com", password: "jameel123", role: "user" },
      { email: "callcenter@gmail.com", password: "callcenter123", role: "user" },
       { email: "marketing@gmail.com", password: "marketing123", role: "user" },
        { email: "hygene@gmail.com", password: "hygene123", role: "user" },
        { email: "chefomar@gmail.com", password: "chefomar123", role: "user" },
        { email: "hygene@gmail.com", password: "hygene123", role: "user" },
        { email: "chefmaher@gmail.com", password: "chefmaher123", role: "user" },
        { email: "reseption@gmail.com", password: "reseption123", role: "user" },

];

const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", function(e){
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  const user = users.find(u => u.email === email && u.password === password);

  if(user){
    localStorage.setItem("currentUser", JSON.stringify(user));

    if(user.role === "admin"){
      window.location.href = "admin.html";
    } else {
      window.location.href = "user.html";
    }
  } else {
    loginMessage.style.color = "red";
    loginMessage.textContent = "Invalid email or password!";
  }
});