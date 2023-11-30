const myLibrary = [];
const booksDisplay = document.querySelector('.book-container');
const addBook = document.querySelector('.add-book');
const overlay = document.querySelector('.overlay');
const bookInfos = document.querySelector('.book-infos')
const formContainer = document.querySelector('.form-container');
const formContainerBack = document.querySelector('.form-container-back');
const submitButton = document.querySelector('.submit-button');

// Book constructor
function Book(title, author, genre, isRead) {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.isRead = isRead;
}

// Displays the library
function showBooks() {
  // Empty it first
  booksDisplay.innerHTML = '';
  // Add all library book
  myLibrary.forEach(book => {
    const newBook = document.createElement('div');
    const bookTitle = document.createElement('h1');
    const bookAuthor = document.createElement('p');
    const bookGenre = document.createElement('p');
    const bookRead = document.createElement('button');
    const deleteButton = document.createElement('img');
    const buttonContainer = document.createElement('div');

    bookTitle.textContent = book.title;
    bookAuthor.textContent = `By ${book.author}`;
    bookGenre.textContent = `Category : ${book.genre}`;
    if (book.isRead) {
      bookRead.textContent = "Read";
      bookRead.classList.add('read');
    } else {
      bookRead.textContent = "Not Read";
    }

    // Add the possibility for the user to change the state of Read
    bookRead.addEventListener('click', () => {
      bookRead.classList.toggle('read');
      if (bookRead.classList.contains('read')) {
        bookRead.textContent = 'Read';
      } else {
        bookRead.textContent = 'Not Read';
      }
    });

    deleteButton.src = 'svg/delete.svg';
    // Delete the book if the user click on trash icon
    deleteButton.addEventListener('click', () => {
      myLibrary.splice(myLibrary.indexOf(book),1)
      showBooks();
    });
    
    buttonContainer.appendChild(bookRead);
    buttonContainer.appendChild(deleteButton);
    newBook.appendChild(bookTitle);
    newBook.appendChild(bookAuthor);
    newBook.appendChild(bookGenre);
    newBook.appendChild(buttonContainer);
    newBook.classList.add('book-card');
    booksDisplay.appendChild(newBook);
  });
}

// Add the book to the library
function addBookToLibrary() {
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const genre = document.querySelector('#genre').value;
  const isRead = document.querySelector('#isRead').checked;
  myLibrary.push(new Book(title, author, genre, isRead));
  showBooks();
}

// Close the overlay
function resetForm() {
  overlay.style.display = 'none';
  bookInfos.reset();
  formContainer.classList.remove('appear');
  // Reset value for the page turned effect
  formContainer.style.color = 'var(--main-color-tint)';
  formContainer.querySelectorAll('input').forEach(input => input.style.backgroundColor = 'var(--main-color-tint)');
  formContainer.querySelector('#genre').classList.add('hidden');
  formContainer.querySelector('#genre').style.backgroundColor = 'var(--main-color-tint)';
  formContainer.querySelector('#isRead').classList.add('hidden');
  formContainer.querySelector('button').classList.remove('visible');
}

// Open the Overlay
addBook.addEventListener('click', () => {
  overlay.style.display = 'flex';
  formContainerBack.style.width = formContainer.clientWidth + 'px';
  formContainerBack.style.height = formContainer.clientHeight + 'px';
  setTimeout(() => formContainer.classList.add('appear'), 100);
  // Page turned effect
  setTimeout(() => {
    formContainer.style.color = 'black';
    formContainer.querySelectorAll('input').forEach(input => input.style.backgroundColor = 'white');
    formContainer.querySelector('#genre').classList.remove('hidden');
    formContainer.querySelector('#genre').style.backgroundColor = 'white';
    formContainer.querySelector('#isRead').classList.remove('hidden');
    formContainer.querySelector('button').classList.add('visible');
  }, 700)
});

// Close the Overlay if the user click outside of it
overlay.addEventListener('click', function(event) {
  if (event.target === overlay) {
    overlay.style.display = 'none';
    resetForm();
  }
});

bookInfos.addEventListener('submit', function(e) {
  e.preventDefault();
  addBookToLibrary();
  resetForm();
});


