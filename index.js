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

  removeBook(target) {
    if (target.className === 'delete') {
      const titleElement = target.parentElement.parentElement.querySelector('.title');
      const authorElement = target.parentElement.parentElement.querySelector('.author');
      if (titleElement && authorElement) {
        const books = Store.getBooks();
        const bookTitle = titleElement.textContent;
        const bookAuthor = authorElement.textContent;
        const index = books.findIndex((book) => book.title === bookTitle && book.author === bookAuthor);
        if (index !== -1) {
          books.splice(index, 1);
          localStorage.setItem('books', JSON.stringify(books));
        }
        target.parentElement.parentElement.remove();
      }
    }
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
}

document.addEventListener('DOMContentLoaded', () => {
  Store.displayBooks();
});

// Event listening to form
const form = document.getElementById('form');
form.addEventListener('submit', (event) => {
  const author = document.getElementById('author').value;
  const title = document.getElementById('book').value;

  // instantiate book
  const book = new Book(author, title);

  // instantiate UI
  const ui = new UI();

  if (author === '' || title === '') {
    return;
  }

  ui.addBookToTheList(book);
  Store.addBook(book);
  ui.clearFieldsInputs();
  event.preventDefault();
});

// event listening for delete book
document.getElementById('tbody-container').addEventListener('click', (e) => {
  const ui = new UI();
  ui.removeBook(e.target);
  // const bookTitle = e.target.parentElement.querySelector('.title').textContent;
  // const bookAuthor = e.target.parentElement.querySelector('.author').textContent;
  // const books = Store.getBooks();
  // const index = books.findIndex((book) => book.title === bookTitle && book.author === bookAuthor);
  // Store.removeBookFromStore(index);
  e.preventDefault();
});
