const ul = document.getElementById('ul-list');
const form = document.getElementById('form');
const inputAuthor = document.getElementById('author');
const inputBook = document.getElementById('book');

let bookDetails = JSON.parse(localStorage.getItem('bookDetails')) || [];

function addBook() {
  ul.innerHTML = '';
  for (let i = bookDetails.length - 1; i >= 0; i -= 1) {
    const bookInfo = bookDetails[i];
    const newBook = document.createElement('li');
    newBook.innerHTML = `
      <p class="book">${bookInfo.book}</p>
      <p class="author">${bookInfo.author}</p>
      <button type="button" onclick="removeItem(${i})">Remove</button>
      <hr>
    `;
    ul.insertBefore(newBook, ul.firstChild);
  }
}

// Call addBook function when the page is loaded
document.addEventListener('DOMContentLoaded', addBook);

function removeItem(index) {
  bookDetails.splice(index, 1);
  addBook();
  localStorage.setItem('bookDetails', JSON.stringify(bookDetails));
}

// Add book to the list
form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (inputAuthor.value === '' || inputBook.value === '') {
    return;
  }
  const newBooksAdded = { author: inputAuthor.value, book: inputBook.value };
  bookDetails.unshift(newBooksAdded);
  localStorage.setItem('bookDetails', JSON.stringify(bookDetails));
  addBook();
  inputAuthor.value = '';
  inputBook.value = '';
});
