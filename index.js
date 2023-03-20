const ul = document.getElementById('ul-list');
const form = document.getElementById('form');
const inputAuthor = document.getElementById('author');
const inputBook = document.getElementById('book');

const bookDetails = [];

function addBook() {
  ul.innerHTML = ''; // clear the list first
  for (let i = bookDetails.length - 1; i >= 0; i--) {
    const bookInfo = bookDetails[i];
    const newBook = document.createElement('li');
    newBook.innerHTML = `
      <p class="book">${bookInfo.book}</p>
      <p class="author">${bookInfo.author}</p>
      <button type="button" onclick="removeItem(${i})">Remove</button>
      <hr>
    `;
    ul.insertBefore(newBook, ul.firstChild); // insert new book at the beginning
  }
}

function removeItem(index) {
  bookDetails.splice(index, 1);
  addBook(); // update the list after removing the item
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (inputAuthor.value === '' || inputBook.value === '') {
    return;
  }

  const newBook = { author: inputAuthor.value, book: inputBook.value };
  bookDetails.unshift(newBook); // add new book to the beginning of the array

  addBook(); // update the list after adding the item

  inputAuthor.value = '';
  inputBook.value = '';
});
