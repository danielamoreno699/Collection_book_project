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
      const titleElement =
        target.parentElement.parentElement.querySelector('.title');
      const authorElement =
        target.parentElement.parentElement.querySelector('.author');
      //if (titleElement && authorElement) {
      const books = Store.getBooks();
      const bookT = titleElement.textContent;
      const bookA = authorElement.textContent;
      const index = books.findIndex(
        (book) => book.title === bookT && book.author === bookA
      );

      //if (index !== -1) {
      books.splice(index, 1);
      localStorage.setItem('books', JSON.stringify(books));
      //}
      target.parentElement.parentElement.remove();
      //}
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

// single page application - Three page section
const formSection = document.getElementById('add-book-section');
  const listSection = document.getElementById('table-books');
  const contactSection = document.getElementById('contact');
  const linkList = document.getElementById('listLink');
  console.log(linkList)
  const linkForm = document.getElementById('formLink');
  const linkContact = document.getElementById('contactLink');
  
  
  displayList = () => {
    console.log('click list');
  
          listSection.classList.remove('hidden');
          formSection.classList.add('hidden');
          contactSection.classList.add('hidden')
   };
  
  displayForm = () => {
    console.log('click form');
    
    formSection.classList.remove('hidden');
    listSection.classList.add('hidden');
    contactSection.classList.add('hidden');
  };
  
  displayContact = () => {
    console.log('click contact');
    contactSection.classList.remove('hidden');
    listSection.classList.add('hidden');
    formSection.classList.add('hidden');
  
  };
  
  linkList.addEventListener('click', function(event) {
    event.preventDefault();
    displayList();
    console.log('click addev list')
  });
  
  
  linkForm.addEventListener('click', function(event) {
    event.preventDefault();
    displayForm();
    console.log('click addevent form')
  });
  
  
  linkContact.addEventListener('click', function(event) {
    event.preventDefault();
    displayContact();
  });
  
  //display date
  
    const span = document.getElementById('date')
    const date = new Date()
    span.innerHTML = date
  
  //
  const displayPage = (currentPage) => {

    const sections = document.querySelectorAll('section');
  
    for (let section of sections) {

      if (section.id === currentPage) {
        section.classList.remove('hidden');
      } else {
     
        section.classList.add('hidden');
      }
    }
  };
 
  
  const getCurrentPage = () => {
    const currentPage = localStorage.getItem('currentPage');
    return currentPage ? currentPage : 'List';
  };
  
  const handleLinkClick = (event) => {
    event.preventDefault();
    const currentPage = event.target.getAttribute('href').substring(1);
    localStorage.setItem('currentPage', currentPage);
    displayPage(currentPage);
  };
  
  const displayCurrentPage = () => {
    const currentPage = getCurrentPage();
    displayPage(currentPage);
  };
  
  const links = document.querySelectorAll('a');
  links.forEach((link) => {
    (link.addEventListener('click', handleLinkClick));
  });
  
  window.addEventListener('load', displayCurrentPage);