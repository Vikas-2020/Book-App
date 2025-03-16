# 📚 Bookstore Web App  

### 🚀 Project Overview  
This project is a **Bookstore Web Application** that allows users to browse books by category, view bestsellers, see book details, and log in for a personalized experience. The app features **dynamic content fetching, authentication, UI updates, and a dark mode toggle** to enhance user experience.  

---

## 🛠 Tech Stack  
- **HTML & CSS** – For structuring and styling the UI  
- **JavaScript** – For interactivity and dynamic content  
- **Fetch API** – To retrieve book data from an external API  
- **LocalStorage** – To handle user authentication and persist login state  

---

## 🎯 Features & JavaScript Functionalities  

### 1️⃣ **Book Category & Bestsellers Display**  
- Used the **Fetch API** to retrieve book categories and top books from an external API.  
- **DOM Manipulation** is used to dynamically generate category lists and book sections.  

```js
async function getBook() {
    const response = await fetch("https://books-backend.p.goit.global/books/top-books");
    const result = await response.json();
    displayBooks(result, "all-category");
}
 Book Details Popup
Clicking on a book triggers a popup window showing details like title, author, description, and buy links.
Used event listeners to detect clicks and update the popup content dynamically.
js
Copy code
function showDetails(obj) {
    document.getElementById("popup-title").innerText = obj.title;
    document.getElementById("popup-author").innerText = "by " + obj.author;
    document.querySelector(".popup").style.display = "flex";
}
3️⃣ Dark Mode Toggle 🌙
Implemented a toggle switch to change the theme.
Used classList.toggle() to switch between light and dark themes.
js
Copy code
container.addEventListener("click", () => {
  bodyTag.classList.toggle("bg-color-black");
  circle.classList.toggle("dark-mode");
});
4️⃣ User Authentication with LocalStorage 🔐
Implemented Signup & Signin forms using LocalStorage to store user credentials.
After login, the user's name replaces the signup button, and a logout button appears.
js
Copy code
function signin() {
    const email = document.getElementById("signinEmail").value.trim();
    const password = document.getElementById("signinPassword").value.trim();

    const userData = localStorage.getItem(email);
    if (userData) {
        const user = JSON.parse(userData);
        if (user.password === password) {
            localStorage.setItem("loggedInUser", user.name);
            updateUI();
        }
    }
}
5️⃣ Dynamic Sidebar Behavior 🏗
Clicking the sidebar login button opens the login popup.
After login, the sidebar disappears, and the user’s name appears.
js
Copy code
sidebarButton.addEventListener("click", () => {
    authPopup.style.display = "flex";
});
🎉 Conclusion
This project helped me strengthen my skills in JavaScript, API handling, DOM manipulation, authentication, and UI updates. The integration of LocalStorage for authentication and Fetch API for book data retrieval made the app dynamic and interactive.

🚀 Future Improvements:

Implement a search feature for books 📖
Add a favorites section to store user-selected books ⭐
Use a database & backend for real authentication 🔐
💻 Live Demo: [🔗 https://book-app-vikas-kumars-projects-a25b81d4.vercel.app/]
📂 GitHub Repository: [🔗 https://github.com/Vikas-2020/Book-App]

Feel free to contribute or share your feedback! 🚀