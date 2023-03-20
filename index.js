const ul = document.getElementById('ul-list');
const form = document.getElementById('form');
const inputAuthor = document.getElementById('author');
const inputBook = document.getElementById('book');

const bookDetails = JSON.parse(localStorage.getItem('newBookObject')) || null;

// setting initial object
const bookInformation = {
  author: '',
  book: '',
};

//Creating a dynamic LI template
function addBook() {
  bookDetails.forEach((bookInfo) => {
    const newBook = document.createElement('li');
    newBook.innerHTML = `
        <p class="book">${bookInfo.book}</p>
        <p clas="author">${bookInfo.author}</p>
        <button type="button">Remove</button>
        <hr>
        `;
    ul.appendChild(newBook);
  });
}

addBook();

//form function
form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (inputAuthor === '' || inputBook === '') {
    return;
  }
  const newBook = { author: inputAuthor.value, book: inputBook.value };

  bookDetails.push(newBook);
  console.log(bookDetails);

  localStorage.setItem('newBookObject', JSON.stringify(bookDetails));
});
