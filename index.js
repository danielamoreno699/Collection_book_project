/* eslint-disable max-classes-per-file */
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class UI {
  // eslint-disable-next-line class-methods-use-this
  addBookToTheList(book) {
    const ul = document.getElementById('tbody-container');

    const li = document.createElement('tr');

    li.innerHTML = `
    <td> <span class="author delete">"${book.author}"</span> by <span class="title delete">${book.title}</span> </td>
    <td><button class="delete">remove</button> </td>
   
  `;
    // return li
    ul.insertBefore(li, ul.firstChild);
  }

  // eslint-disable-next-line class-methods-use-this
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
    books.forEach((book) => {
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
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(target) {
    if (target.className === 'delete') {
      const titleElement = target.parentElement.parentElement.querySelector('.title');
      const authorElement = target.parentElement.parentElement.querySelector('.author');
      if (titleElement && authorElement) {
        const books = Store.getBooks();
        const bookT = titleElement.textContent;
        const bookA = authorElement.textContent;
        const index = books.findIndex((book) => book.title === bookT && book.author === bookA);
        if (index !== -1) {
          books.splice(index, 1);
          localStorage.setItem('books', JSON.stringify(books));
        }
        target.parentElement.parentElement.remove();
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  Store.displayBooks();
});

const form = document.getElementById('form');

form.addEventListener('submit', (event) => {
  const author = document.getElementById('author').value;
  const title = document.getElementById('book').value;

  const book = new Book(author, title);

  const ui = new UI();

  if (author === '' || title === '') {
    return;
  }

  ui.addBookToTheList(book);
  Store.addBook(book);
  ui.clearFieldsInputs();
  event.preventDefault();
});

document.getElementById('tbody-container').addEventListener('click', (e) => {
  // eslint-disable-next-line no-unused-vars
  const ui = new UI();
  // ui.removeBook(e.target);
  Store.removeBook(e.target);
  e.preventDefault();
});
