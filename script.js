const bookLibrary = [];
const bookDisplay = document.getElementById("book-display");
const modalAdd = document.getElementById("add-modal");
const btnAdd = document.getElementById("btn-add");
const formAdd = document.getElementById("add-form");
const btnCancel = document.getElementById("btn-cancel");


function Book(title, author, pages, year, isRead, cover) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.year = year;
    this.isRead = Boolean(isRead);
    this.id = crypto.randomUUID();
    this.cover = cover;
}

function addBookToLibrary(title, author, pages, year, isRead, cover) {
    const newBook = new Book(title, author, pages, year, isRead, cover);
    bookLibrary.push(newBook);
}

addBookToLibrary("Atomic Habits", "James Clear", 320, 2018, true, "imgs/atomic-habits.webp");
addBookToLibrary("Deep Work", "Cal Newport", 296, 2016, false, "imgs/deep-work.webp");
addBookToLibrary("The Stranger", "Albert Camus", 159, 1942, true, "imgs/the-stranger.webp");
addBookToLibrary("Crime and Punishment", "Fyodor Dostoevsky", 500, 1866, false, "imgs/crime-punishment.webp");
addBookToLibrary("No Longer Human", "Osamu Dazai", 196, 1948, true, "imgs/no-human.webp");
addBookToLibrary("Nausea", "Jean-Paul Sartre", 248, 1938, false, "imgs/nausea.webp");
addBookToLibrary("Wuthering Heights", "Emily Bronte", 400, 1847, true, "imgs/wuthering-heights.webp");

function displayBooks() {
    bookDisplay.innerHTML = "";
    bookLibrary.forEach(book => {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");
        bookDiv.dataset.id = book.id;
        const cover = book.cover || "imgs/cover.webp"
        bookDiv.style.backgroundImage = `url(${cover})`;
        bookDiv.innerHTML = `

        <div class="book-title">
            <h3>${book.title}</h3>
            <p class="author">${book.author}</p>
        </div>

        <div class="book-footer">
            <p>${book.year}</p>
            <div class="book-buttons">
                <button class="removeBtn">X</button>
                <button class="isReadBtn">${book.isRead ? "Read" : "Not Read"}</button>
            </div>
        </div>
        `;
        const toggleBtn = bookDiv.querySelector(".isReadBtn");
        const removeBtn = bookDiv.querySelector(".removeBtn");

        toggleBtn.addEventListener("click", () => {
            toggleReadStatus(book.id);
        });

        removeBtn.addEventListener("click", () => {
            removeBook(book.id);
        });

        bookDisplay.appendChild(bookDiv);
    });
}

btnAdd.addEventListener("click", () => {
    modalAdd.showModal();
});

btnCancel.addEventListener("click", () => {
    modalAdd.close();
});

formAdd.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(formAdd);

    addBookToLibrary(
        data.get("title"),
        data.get("author"),
        Number(data.get("pages")),
        Number(data.get("year")),
        data.get("isRead") === "on",
        data.get("cover")
    );

    displayBooks();
    formAdd.reset();
    modalAdd.close();
});


function toggleReadStatus(id) {
    const book = bookLibrary.find(book => book.id === id);
    if (book) {
        book.isRead = !book.isRead;
        displayBooks();
    }
}

function removeBook (id) {
    const index = bookLibrary.findIndex(book => book.id === id);
    if (index !== -1) {
        bookLibrary.splice(index, 1);
        displayBooks();
    }
}



displayBooks();