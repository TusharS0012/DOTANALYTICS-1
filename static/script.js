const formOpenBtn = document.querySelector("#form-open"),
  home = document.querySelector(".home"),
  formContainer = document.querySelector(".form_container"),
  formCloseBtn = document.querySelector(".form_close"),
  signupBtn = document.querySelector("#signup"),
  loginBtn = document.querySelector("#login"),
  pwShowHide = document.querySelectorAll(".pw_hide");

// Show login form
formOpenBtn.addEventListener("click", () => home.classList.add("show"));

// Close login form
formCloseBtn.addEventListener("click", () => home.classList.remove("show"));

pwShowHide.forEach((icon) => {
  icon.addEventListener("click", () => {
    let getPwInput = icon.parentElement.querySelector("input");
    if (getPwInput.type === "password") {
      getPwInput.type = "text";
      icon.classList.replace("uil-eye-slash", "uil-eye");
    } else {
      getPwInput.type = "password";
      icon.classList.replace("uil-eye", "uil-eye-slash");
    }
  });
});

// Switch between SignUp and Login form
signupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.add("active");
});

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.remove("active");
});

// Carousel Slider functionality
var nextBtn = document.querySelector(".next"),
  prevBtn = document.querySelector(".prev"),
  carousel = document.querySelector(".carousel"),
  list = document.querySelector(".list"),
  item = document.querySelectorAll(".item");

nextBtn.onclick = function () {
  showSlider("next");
};

prevBtn.onclick = function () {
  showSlider("prev");
};

function showSlider(type) {
  let sliderItemsDom = list.querySelectorAll(".carousel .list .item");
  if (type === "next") {
    list.appendChild(sliderItemsDom[0]);
    carousel.classList.add("next");
  } else {
    list.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
    carousel.classList.add("prev");
  }
}

// Handle login form submission
document
  .querySelector(".login_form form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from reloading the page

    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    // Check if both email and password are provided
    if (!email || !password) {
      alert("Please fill in both fields.");
      return;
    }

    // Send POST request to Django backend
    fetch("http://localhost:8000/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          // Token found: Successful login
          localStorage.setItem("authToken", data.token);
          localStorage.setItem("userDetails", JSON.stringify(data.user));

          // Redirect to dashboard
          window.location.href = data.redirect_url;
        } else {
          // No token: Invalid credentials
          alert(data.error || "Invalid login credentials.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred, please try again.");
      });
  });
