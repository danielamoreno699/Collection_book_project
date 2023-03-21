const ul = document.getElementById(`ul-list`);
const form = document.getElementById('form');
const inputAuthor = document.getElementById('author');
const inputBook = document.getElementById('book');

const bookDetails = [];

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

function removeItem(index) {
  bookDetails.splice(index, 1);
  addBook();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (inputAuthor.value === '' || inputBook.value === '') {
    return;
  }

  const newBook = { author: inputAuthor.value, book: inputBook.value };
  bookDetails.unshift(newBook);
  localStorage.setItem('NewBookAdded', JSON.stringify(bookDetails));
  addBook();
  inputAuthor.value = '';
  inputBook.value = '';
});
