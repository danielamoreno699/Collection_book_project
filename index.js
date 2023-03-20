const ul = document.getElementById('ul-list');
const form = document.getElementById('form');
const inputAuthor = document.getElementById('author');
const inputBook = document.getElementById('book');

const bookDetails = [];

function addBook() {
  bookDetails.forEach((bookInfo, index) => {
    const newBook = document.createElement('li');
    newBook.innerHTML = `
      <p class="book">${bookInfo.book}</p>
      <p clas="author">${bookInfo.author}</p>
      <button type="button" onclick="removeItem(${index})">Remove</button>
      <hr>
    `;
    ul.appendChild(newBook);
  });
}

function removeItem(index) {
  bookDetails.splice(index, 1);
  const liToRemove = ul.querySelectorAll('li').item(index);
  if (liToRemove === null) {
    return;
  }
  liToRemove.remove();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (inputAuthor.value === '' || inputBook.value === '') {
    return;
  }

  const newBook = { author: inputAuthor.value, book: inputBook.value };
  bookDetails.push(newBook);

  ul.innerHTML = '';
  addBook();

  inputAuthor.value = '';
  inputBook.value = '';
});
