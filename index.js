class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class UI {
  addBookToTheList(book) {
    const ul = document.getElementById('ul-list');

    const li = document.createElement('li');

    li.innerHTML = `
    <span class="title">${book.title}</span> by 
    <span class="author">${book.author}</span>
    <button class="delete">Remove</button>
  `;
    ul.insertBefore(li, ul.firstChild);
  }

  removeBook(target) {
    if (target.className === 'delete') {
      target.parentElement.remove();
    }
    console.log('click1');
  }

  clearFieldsInputs() {
    const author = document.getElementById('author');
    const title = document.getElementById('book');
    author.value = '';
    title.value = '';
  }
}

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();
    books.forEach(function (book) {
      const ui = new UI();
      ui.addBookToTheList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBookFromStore(index) {
    const books = Store.getBooks();

    books.splice(index, 1);
    //console.log('click2')
    localStorage.setItem('books', JSON.stringify(books));
  }
}

document.addEventListener('DOMContentLoaded', function () {
  Store.displayBooks();
});

// Event listening to form
const form = document.getElementById('form');
form.addEventListener('submit', (event) => {
  const author = document.getElementById('author').value;
  const title = document.getElementById('book').value;

  //instantiate book
  const book = new Book(author, title);

  //instantiate UI
  const ui = new UI();

  if (author === '' || title === '') {
    return;
  }

  ui.addBookToTheList(book);
  Store.addBook(book);
  ui.clearFieldsInputs();
  event.preventDefault();
});

//event listening for delete book
document.getElementById('ul-list').addEventListener('click', function (e) {
  const ui = new UI();
  ui.removeBook(e.target);
  const bookTitle = e.target.parentElement.querySelector('.title').textContent;
  const bookAuthor =
    e.target.parentElement.querySelector('.author').textContent;
  const books = Store.getBooks();
  const index = books.findIndex(
    (book) => book.title === bookTitle && book.author === bookAuthor
  );
  Store.removeBookFromStore(index);
  e.preventDefault();
});
