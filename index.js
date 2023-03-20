const ul = document.getElementById('ul-list');
const form = document.getElementById('form');
const inputAuthor = document.getElementById('author');
const inputBook = document.getElementById('book');

//const bookDetails = JSON.parse(localStorage.getItem('newBookObject')) || null;

const bookDetails = [
  {
    author: "author1",
    book: "book1"
  },
  {
    author: "author2",
    book: "book1"

  }
]

// setting initial object
const bookInformation = {
  author: '',
  book: '',
};

//Creating a dynamic LI template
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


//remove function
function removeItem(index){
  //console.log('click')
  console.log(index)
    const filteredMethods = bookDetails.filter(item => !index.includes(item))

};
removeItem()



//form function
form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (inputAuthor === '' || inputBook === '') {
    return;
  }
  const newBook = { author: inputAuthor.value, book: inputBook.value };

  bookDetails.push(newBook);
  console.log(bookDetails);
  addBook();

  //localStorage.setItem('newBookObject', JSON.stringify(bookDetails));
});
