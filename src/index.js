const form = document.querySelector(".form");
const body = document.querySelector("body");
const submitButton = document.querySelector(".btn-2");
const mainInput = document.querySelector(".main-input");

function validateForm(event) {
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirm_password");
  const dob = document.getElementById("dob");
  const gender = document.querySelector('input[name="gender"]:checked');
  const interests = document.querySelectorAll(
    'input[name="interests"]:checked'
  );

  //   declaration for error
  const nameError = document.querySelector("#nameError");
  const emailError = document.querySelector("#emailError");
  const phoneError = document.querySelector("#phoneError");
  const pwdError = document.querySelector("#pwdError");
  const confirmPwdError = document.querySelector("#confirmPwdError");
  const dobError = document.querySelector("#dobError");
  const genderError = document.querySelector("#genderError");
  const interestError = document.querySelector("#interestError");

  let valid = true;

  //   conditions for validation

  if (name.value === "") {
    nameError.textContent = "*Please enter your name.";
    valid = false;
  } else if (name.value.length < 3) {
    nameError.textContent = "*Name should be at least 3 characters long.";
    valid = false;
  } else {
    nameError.textContent = "";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value)) {
    emailError.textContent = "*Please enter a valid email address.";
    valid = false;
  } else {
    emailError.textContent = "";
  }

  const phonePattern = /^\d{10}$/;
  if (!phonePattern.test(phone.value)) {
    phoneError.textContent = "*Please enter a 10-digit phone number..";
    valid = false;
  } else {
    phoneError.textContent = "";
  }

  if (
    password.value === "" ||
    password.value.length < 8 ||
    !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(password.value)
  ) {
    pwdError.textContent =
      "*Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one symbol.";
    valid = false;
  } else {
    pwdError.textContent = "";
  }

  

  if (
    confirmPassword.value === "" ||
    confirmPassword.value !== password.value
  ) {
    confirmPwdError.textContent = "*Passwords do not match.";
    valid = false;
  } else {
    confirmPwdError.textContent = "";
  }

  const dobPattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!dobPattern.test(dob.value)) {
    dobError.textContent = "*Please enter a valid date of birth.";
    valid = false;
  } else {
    dobError.textContent = "";
  }

  const today = new Date();
  const dobDate = new Date(dob.value);
  if (dobDate > today) {
    dobError.textContent = "*Date of birth should not be ahead of current day.";
    valid = false;
  } else {
    dobError.textContent = "";
  }

  if (gender === null) {
    genderError.textContent = "*Please select your gender.";
    document.querySelector('input[name="gender"]').focus();
    valid = false;
  } else {
    genderError.textContent = "";
  }

  if (interests.length === 0) {
    interestError.textContent = "*Please select your interests.";
    document.querySelector('input[name="interests"]').focus();
    valid = false;
  } else {
    interestError.textContent = "";
  }

  if (!valid) {
    event.preventDefault();
  } else {
    return true;
  }
}

submitButton.addEventListener("click", (event) => {
  event.preventDefault();

  if (validateForm()) {
    form.style.display = "none";
    body.style.background = "none";
    body.style.backgroundColor = "#F7CD2E";
    mainInput.style.marginBottom = "10px";

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const date_of_birth = document.getElementById("dob").value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const interests = document.querySelectorAll(
      'input[name="interests"]:checked'
    );
    const interestsArray = [];
    for (let i = 0; i < interests.length; i++) {
      interestsArray.push(interests[i].value);
    }
    const interestsList = interestsArray.join(", ");
    const firstName = document.getElementById("name").value.split(" ")[0];

    const result = `<h1>Your Response is Submitted!</h1>
      <h3 id="registration-msg">Thank you <span class="reg-name">${firstName}</span> for registering.</h3>
      <p>Here are the details:</p>
      <p>Name: <span class="weight">${name}</span></p>
      <p>Email: <span class="weight">${email}</span></p>
      <p>Phone: <span class="weight">${phone}</span></p>
      <p>Date of Birth: <span class="weight">${date_of_birth}</span></p>
      <p>Gender: <span class="weight">${gender}</span></p>
      <p>Interests: <span class="weight">${interestsList}</span></p>`;

    const output = document.createElement("div");
    output.id = "wrapper";
    output.innerHTML = result;
    document.body.appendChild(output);
  }
});
