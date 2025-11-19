// Get elements
const authModal = document.getElementById("authModal");
const openLogin = document.getElementById("openLogin");
const closeAuth = document.getElementById("closeAuth");

const loginBox = document.getElementById("loginBox");
const signupBox = document.getElementById("signupBox");

const showSignup = document.getElementById("showSignup");
const showLogin = document.getElementById("showLogin");

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

const loginMessage = document.getElementById("loginMessage");
const signupMessage = document.getElementById("signupMessage");

// ------------------ OPEN MODAL ------------------
openLogin.addEventListener("click", (e) => {
    e.preventDefault();
    authModal.style.display = "flex";
});

// ------------------ CLOSE MODAL ------------------
closeAuth.addEventListener("click", () => {
    authModal.style.display = "none";
});

// Close if clicked outside box
window.addEventListener("click", (e) => {
    if (e.target === authModal) {
        authModal.style.display = "none";
    }
});

// ------------------ SWITCH TO SIGNUP ------------------
showSignup.addEventListener("click", (e) => {
    e.preventDefault();
    loginBox.style.display = "none";
    signupBox.style.display = "block";
});

// ------------------ SWITCH TO LOGIN ------------------
showLogin.addEventListener("click", (e) => {
    e.preventDefault();
    signupBox.style.display = "none";
    loginBox.style.display = "block";
});

// ------------------ SIGNUP SYSTEM ------------------
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let name = document.getElementById("signupName").value;
    let email = document.getElementById("signupEmail").value;
    let username = document.getElementById("signupUsername").value;
    let password = document.getElementById("signupPassword").value;

    // Check if account already exists
    if (localStorage.getItem(username)) {
        signupMessage.style.color = "red";
        signupMessage.textContent = "Account already exists!";
        return;
    }

    // Save account in localStorage
    let userData = {
        name: name,
        email: email,
        username: username,
        password: password
    };

    localStorage.setItem(username, JSON.stringify(userData));

    signupMessage.style.color = "green";
    signupMessage.textContent = "Account created successfully!";

    // Close popup after 1.5 seconds
    setTimeout(() => {
        authModal.style.display = "none";
        signupForm.reset();
        signupMessage.textContent = "";
    }, 1500);
});

// ------------------ LOGIN SYSTEM ------------------
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let username = document.getElementById("loginUsername").value;
    let password = document.getElementById("loginPassword").value;

    let storedUser = localStorage.getItem(username);

    if (!storedUser) {
        loginMessage.style.color = "red";
        loginMessage.textContent = "Account does not exist!";
        return;
    }

    let user = JSON.parse(storedUser);

    if (user.password !== password) {
        loginMessage.style.color = "red";
        loginMessage.textContent = "Incorrect password!";
        return;
    }

    loginMessage.style.color = "green";
    loginMessage.textContent = "Login successful!";

    // Close popup after 1.5 sec
    setTimeout(() => {
        authModal.style.display = "none";
        loginForm.reset();
        loginMessage.textContent = "";
    }, 1500);
});
//
function filterSections() {
    const amount = parseFloat(document.getElementById("maxAmount").value);
    const noResults = document.getElementById("noResults");

    if (isNaN(amount)) {
        alert("Please enter a valid amount.");
        return;
    }

    const sections = document.querySelectorAll("section[class^='course']");

    let visibleCount = 0;

    sections.forEach(section => {
        const price = parseFloat(section.getAttribute("data-price"));

        if (price <= amount) {
            section.style.display = "block";  // show
            visibleCount++;
        } else {
            section.style.display = "none";   // hide
        }
    });

    // Show "no courses found" message
    noResults.style.display = visibleCount === 0 ? "block" : "none";
}
function sortCoursesAsc() {
    const container = document.querySelector(".courses-container");
    const sections = Array.from(document.querySelectorAll("section[class^='course']"));

    sections.sort((a, b) => 
        parseFloat(a.getAttribute("data-price")) - parseFloat(b.getAttribute("data-price"))
    );

    sections.forEach(sec => container.appendChild(sec));
}

function sortCoursesDesc() {
    const container = document.querySelector(".courses-container");
    const sections = Array.from(document.querySelectorAll("section[class^='course']"));

    sections.sort((a, b) => 
        parseFloat(b.getAttribute("data-price")) - parseFloat(a.getAttribute("data-price"))
    );

    sections.forEach(sec => container.appendChild(sec));
}

// RESET BUTTON FUNCTION
function resetFilter() {
    document.getElementById("maxAmount").value = "";
    document.getElementById("noResults").style.display = "none";

    const courses = document.querySelectorAll(".course-section");
    courses.forEach(c => {
        c.style.display = "block";
        c.classList.remove("hide");
    });
}

// SORT ANIMATION HELPER
function animateSort() {
    const courses = document.querySelectorAll(".course-section");
    courses.forEach((course, index) => {
        course.classList.add("hide");
        setTimeout(() => {
            course.classList.remove("hide");
        }, 100 * index);
    });
}

// SORT ASCENDING
function sortCoursesAsc() {
    const container = document.querySelector(".courses-container");
    const courses = Array.from(container.children);

    courses.sort((a, b) => 
        a.dataset.price - b.dataset.price
    );

    courses.forEach(c => container.appendChild(c));
    animateSort();
}

// SORT DESCENDING
function sortCoursesDesc() {
    const container = document.querySelector(".courses-container");
    const courses = Array.from(container.children);

    courses.sort((a, b) => 
        b.dataset.price - a.dataset.price
    );

    courses.forEach(c => container.appendChild(c));
    animateSort();
}
