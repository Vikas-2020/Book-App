let circle = document.querySelector("#circle");
let container = document.querySelector("#toggle-container");
let bodyTag = document.querySelector("body");
let toggled = false;

container.addEventListener("click", () => {
  if (!toggled) {
    bodyTag.classList.add("bg-color-black");
    circle.classList.add("dark-mode");
    toggled = true;
  } else {
    bodyTag.classList.remove("bg-color-black");
    circle.classList.remove("dark-mode");
    toggled = false;
  }
});

//main section left

const userList = document.querySelector(".sidebar-categories");

creatCategory();

async function creatCategory() {
  const response = await fetch(
    "https://books-backend.p.goit.global/books/category-list"
  );
  const result = await response.json();
  // console.log(result);
  const fragment = document.createDocumentFragment();
  result.forEach((obj) => {
    const li = document.createElement("li");
    li.classList.add("category-item");
    li.dataset.id = `${obj.list_name}`;
    li.innerText = obj.list_name;
    fragment.appendChild(li);
  });
  document.querySelector(".sidebar-categories").append(fragment);
}

userList.addEventListener("click", (e) => {
  // Ensure the clicked element is a category item
  if (e.target.classList.contains("category-item")) {
    openCategory(e);
  }
  e.target.addEventListener("click", filteredBooks(e.target.dataset.id));
});

function openCategory(e) {
  // Remove active class from all category items
  document
    .querySelectorAll(".category-item")
    .forEach((item) => item.classList.remove("active"));

  e.target.classList.add("active");

}

//Support Ukrain

const logoContainer = document.querySelector(".logoContainer");
const swipBtn = document.querySelector(".swiper-btn-next");
const swipIcon = document.querySelector(".swiper-btn-next i");

let currentIndex = 0;
const visibleItems = 6; // Number of visible images at a time
const logoItems = document.querySelectorAll(".logo-item");
const totalItems = logoItems.length;
const itemHeight = logoItems[0].offsetHeight + 24; // Get item height including gap

swipBtn.addEventListener("click", () => {
  const maxScrollIndex = totalItems - visibleItems;

  if (currentIndex < maxScrollIndex) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }

  logoContainer.scrollTo({
    top: currentIndex * itemHeight,
    behavior: "smooth",
  });

  // Toggle icon
  if (currentIndex === maxScrollIndex) {
    swipIcon.classList.remove("fa-chevron-down");
    swipIcon.classList.add("fa-chevron-up");
  } else {
    swipIcon.classList.remove("fa-chevron-up");
    swipIcon.classList.add("fa-chevron-down");
  }
});

//main section right
const mainDiv = document.querySelector(".main");

getBook();

async function getBook() {
    try {
        const response = await fetch("https://books-backend.p.goit.global/books/top-books");

        // Check if the response is OK (status 200)
        if (!response.ok) {
            throw new Error(`Failed to fetch books: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        displayBooks(result, "all-category");
    } catch (error) {
        console.error("Error fetching books:", error);
        displayErrorMessage("Failed to load books. Please try again later.");
    }
}

// 📌 Helper function to show error message in the UI
function displayErrorMessage(message) {
    mainDiv.innerHTML = `<p class="error-message">${message}</p>`;
}

function showDetails(obj) {
    // Set book details in the popup
    document.getElementById("popup-image").src = obj.book_image;
    document.getElementById("popup-title").innerText = obj.title;
    document.getElementById("popup-author").innerText = "by " + obj.author;
    
    // Check if description is available
    document.getElementById("popup-description").innerText = obj.description ? obj.description : "No description available.";

    // Set buy links
    document.getElementById("amazon-link").href = obj.buy_links.find(link => link.name === "Amazon")?.url || "#";
    document.getElementById("apple-link").href = obj.buy_links.find(link => link.name === "Apple Books")?.url || "#";
    document.getElementById("barnes-link").href = obj.buy_links.find(link => link.name === "Barnes and Noble")?.url || "#";

    // Show the popup
    document.querySelector(".popup").style.display = "flex";
}

// Close Popup when clicking ❌ button
document.querySelector(".popup-content .close-btn").addEventListener("click", () => {
    document.querySelector(".popup").style.display = "none";
});

// Close popup when clicking outside of the content
document.querySelector(".popup").addEventListener("click", (event) => {
    if (event.target.classList.contains("popup")) {
        document.querySelector(".popup").style.display = "none";
    }
});



function displayBooks(books, data_id) {
  mainDiv.innerHTML = "";
  const fragment = document.createDocumentFragment();
  if (data_id === "all-category") {
    const h1 = document.createElement("h1");
    h1.classList.add("heading");
    h1.innerText = "Best Sellers Books";
    applyClassOnLastWord(h1);
    fragment.append(h1);

    books.forEach((book) => {
      const parentDiv = document.createElement("div");
      parentDiv.classList.add("parent-books-btn");

      const h2 = document.createElement("h2");
      h2.innerText = book.list_name;

      const booksDiv = document.createElement("div");
      booksDiv.classList.add("books");

      book.books.forEach((obj) => {
        const book = document.createElement("div");
        book.classList.add("book");
        const bookImage = document.createElement("div");
        bookImage.classList.add("book-image");
        const image = document.createElement("img");
        image.src = obj.book_image;
        bookImage.append(image);

        const name_writerDiv = document.createElement("div");
        name_writerDiv.classList.add("name-writer");

        const bookName = document.createElement("h4");
        const authorName = document.createElement("p");
        bookName.innerText = obj.title;
        authorName.innerText = obj.author;

        name_writerDiv.append(bookName, authorName);
        book.append(bookImage, name_writerDiv);
        
        booksDiv.append(book);

        book.addEventListener("click", () => showDetails(obj));
      });

      const btnDiv = document.createElement("div");
      btnDiv.classList.add("seeMoreParent");
      const showMore = document.createElement("button");
      showMore.innerText = "SEE MORE";
      //add eventListner
      showMore.addEventListener("click", () => filteredBooks(book.list_name));


      btnDiv.append(showMore);

      parentDiv.append(h2, booksDiv, btnDiv);
      fragment.append(parentDiv);
    });

    mainDiv.append(fragment);
  }else{
    const h1 = document.createElement("h1");
    h1.classList.add("heading");
    h1.innerText = data_id;
    applyClassOnLastWord(h1);
    fragment.append(h1);
    const booksDiv = document.createElement("div");
    booksDiv.classList.add("books");
    books.forEach((obj) => {
        const book = document.createElement("div");
        book.classList.add("book");
        const bookImage = document.createElement("div");
        bookImage.classList.add("book-image");
        const image = document.createElement("img");
        image.src = obj.book_image;
        bookImage.append(image);
        const name_writerDiv = document.createElement("div");
        name_writerDiv.classList.add("name-writer");

        const bookName = document.createElement("h4");
        const authorName = document.createElement("p");
        bookName.innerText = obj.title;
        authorName.innerText = obj.author;

        name_writerDiv.append(bookName, authorName);
        book.append(bookImage, name_writerDiv);
        booksDiv.append(book);

        book.addEventListener("click", () => showDetails(obj));
      });
      fragment.append(h1, booksDiv);
      mainDiv.append(fragment);
  }
}

function applyClassOnLastWord(heading) {
  let words = heading.innerText.trim().split(" ");
  if (words.length > 1) {
    words[words.length - 1] = `<span class="highlight">${
      words[words.length - 1]
    }</span>`; // Wrap last word in span
    heading.innerHTML = words.join(" "); // Rejoin words
  }
}

async function filteredBooks(categoryName) {
    try {
        // If "All Categories" is selected, fetch all books
        if (categoryName === "all-category") {
            await getBook(); 
            return;
        }

        const response = await fetch(`https://books-backend.p.goit.global/books/category?category=${categoryName}`);

        // Check if the response is OK (status 200)
        if (!response.ok) {
            throw new Error(`Failed to fetch books for category "${categoryName}": ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        displayBooks(data, categoryName);
    } catch (error) {
        console.error("Error fetching category books:", error);
        displayErrorMessage(`Failed to load books for "${categoryName}". Please try again later.`);
    }
}


// Selecting necessary elements
const authPopup = document.getElementById("authPopup");
const signupForm = document.getElementById("signupForm");
const signinForm = document.getElementById("signinForm");
const successMessage = document.getElementById("successMessage");
const signupButton = document.querySelector(".sign-up button");
const sidebarButton = document.querySelector(".sidebar button"); // Sidebar button
const closeButtons = document.querySelectorAll(".close-btn");

// Function to toggle between Signup and Signin forms
function toggleAuthForms() {
    if (signupForm.style.display === "none") {
        signupForm.style.display = "block";
        signinForm.style.display = "none";
    } else {
        signupForm.style.display = "none";
        signinForm.style.display = "block";
    }
}

// Function to show messages with background colors
function showMessage(message, type) {
    successMessage.textContent = message;
    
    // Remove existing classes first
    successMessage.classList.remove("success", "error");
    
    // Add the correct class based on the message type
    if (type === "success") {
        successMessage.classList.add("success");
    } else {
        successMessage.classList.add("error");
    }

    successMessage.style.display = "block";

    setTimeout(() => {
        successMessage.style.display = "none";
    }, 2000);
}

// Function to open the Auth Popup
signupButton.addEventListener("click", () => {
    authPopup.style.display = "flex";
});
sidebarButton.addEventListener("click", () => {
  authPopup.style.display = "flex";
});

// Function to close the Auth Popup
closeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        authPopup.style.display = "none";
    });
});

// Signup Function
function signup() {
    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value.trim();

    if (!name || !email || !password) {
        showMessage("All fields are required!", "error");
        return;
    }

    if (localStorage.getItem(email)) {
        showMessage("User already exists! Try logging in.", "error");
        return;
    }

    // Save user data in localStorage
    localStorage.setItem(email, JSON.stringify({ name, password }));
    showMessage("Signup Successful! Please log in.", "success");
    toggleAuthForms();
}

// Signin Function
function signin() {
    const email = document.getElementById("signinEmail").value.trim();
    const password = document.getElementById("signinPassword").value.trim();

    if (!email || !password) {
        showMessage("All fields are required!", "error");
        return;
    }

    const userData = localStorage.getItem(email);

    if (!userData) {
        showMessage("User not found! Please sign up.", "error");
        return;
    }

    const user = JSON.parse(userData);
    
    if (user.password !== password) {
        showMessage("Incorrect password!", "error");
        return;
    }

    // Save logged-in user in localStorage
    localStorage.setItem("loggedInUser", user.name);
    
    // Show welcome message in green
    showMessage(`Welcome, ${user.name}!`, "success");

    // Update UI and close popup
    updateUI();
    closeAuthPopup();
}

// Function to update UI after login
function updateUI() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
        document.querySelector(".sign-up").innerHTML = `
            <span class="user-name">${loggedInUser}</span>
            <button class="logout-btn">Logout</button>
        `;
        
        document.querySelector(".logout-btn").addEventListener("click", logout);
    }
}

// Function to close the Auth Popup
function closeAuthPopup() {
    authPopup.style.display = "none";
}

// Logout Function
function logout() {
    localStorage.removeItem("loggedInUser");
    location.reload();
}

// Check if user is already logged in
document.addEventListener("DOMContentLoaded", updateUI);

//button up
document.addEventListener("DOMContentLoaded", function () {
  const scrollBtn = document.querySelector(".btn-up");

  // Hide button initially
  scrollBtn.style.display = "none";

  window.addEventListener("scroll", function () {
      if (window.scrollY > 200) {
          scrollBtn.style.display = "flex"; // Show the button
      } else {
          scrollBtn.style.display = "none"; // Hide the button
      }
  });

  // Scroll to top when clicked
  scrollBtn.addEventListener("click", function () {
      window.scrollTo({
          top: 0,
          behavior: "smooth" // Smooth scrolling effect
      });
  });
});
