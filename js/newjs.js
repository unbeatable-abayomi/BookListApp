const slides = document.querySelectorAll('ul li.slide');
let currentSlide = 0;
let interval = setInterval(changeSlide, 8000);
function changeSlide() {
	slides[currentSlide].setAttribute('class', 'slide');
	currentSlide = (currentSlide + 1) % slides.length;
	slides[currentSlide].setAttribute('class', 'slide active');
}
// elibrary
const addBtn = document.getElementById('addBtn');
const bookModal = document.getElementById('bookModal');
const cancelBtn = document.querySelector('#cancelBtn');
addBtn.addEventListener('click', showModal);
// bookModal.addEventListener('click', hideModal)
cancelBtn.addEventListener('click', hideModal);

function showModal() {
	bookModal.style.display = 'block';
}
function hideModal() {
	bookModal.style.display = 'none';
}
// const elibrary = (function (){
//     let library =[];
//     let bookRow = null;
//     function initialize(HTMLElement){
//         bookRow = document.getElementById(HTMLElement)
//     }
// })();
// get all element of interest
const newBookBtn = document.getElementById('newBookBtn');
const txtTitle = document.getElementById('txtTitle');
const txtPub = document.getElementById('txtPub');
const txtPubYear = document.getElementById('txtPubYear');
const txtPages = document.getElementById('txtPages');
const txtCoverURL = document.getElementById('txtCoverURL');
const bookRow = document.getElementById('bookRow');
newBookBtn.addEventListener('click', addToELibrary);
const elibrary = [];
function Book(title, pub, pages, yearPub, coverImgURL) {
	this.title = title;
	this.pub = pub;
	this.pages = pages;
	this.yearPub = yearPub;
	this.coverImgURL = coverImgURL;
	this.read = 0;
}

function addToELibrary() {
	if (validateInput()) {
		let title = txtTitle.value;
		let pub = txtPub.value;
		let pages = txtPages.value;
		let coverImgURL = txtCoverURL.value;
		let yearPub = txtPubYear.value;
		let book = new Book(title, pub, pages, yearPub, coverImgURL);
		// elibrary.push(book);
		saveBook(book);
		location.reload();
		bookRow.innerHTML += `<div class="col-md-4">
        <div class="card">
            <div class="book-cover">
                <img src="${booksArray[i].coverImgURL}" class="card-img img-fluid">
            </div>
            <div class="card-body">
                <h3 class="card-title">${booksArray[i].title}</h3>
                <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Voluptates, culpa laborum!</p>
                <span class="btn btn-primary">Read Book</span>
                <span class="btn btn-primary" onclick="deleteBook(${booksArray[i].pages})" >Delete Book</span>
            </div>
        </div>
    </div>`;
	} else {
		alert('Sorry, all fields are required');
	}
}
function validateInput() {
	if (txtTitle.value == '' || txtPub.value == '' || txtPubYear.value == '' || txtPages.value == '') {
		return false;
	}
	return true;
}
function render() {
	if (localStorage.getItem('books') != null) {
		let booksArray = JSON.parse(localStorage.getItem('books'));
		for (var i = 0; i < booksArray.length; i++) {
			bookRow.innerHTML += `<div class="col-md-4">
            <div class="card">
                <div class="book-cover">
                    <img src="${booksArray[i].coverImgURL}" class="card-img img-fluid">
                </div>
                <div class="card-body">
                    <h3 class="card-title">${booksArray[i].title}</h3>
                    <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Voluptates, culpa laborum!</p>
                    <span class="btn btn-primary">Read Book</span>
                    <span class="btn btn-primary" onclick="deleteBook(${i})" >Delete Book</span>
                </div>
            </div>
        </div>`;
		}
	} else {
		console.log('No books yet');
	}
}
function saveBook(bookObj) {
	let booksArray = [];
	if (localStorage.getItem('books') == null) {
		booksArray.push(bookObj);
		localStorage.setItem('books', JSON.stringify(booksArray));
		alert('New book added to the eLibrary!');
	} else {
		booksArray = JSON.parse(localStorage.getItem('books'));
		booksArray.push(bookObj);
		localStorage.setItem('books', JSON.stringify(booksArray));
		alert('New book added to the eLibrary');
	}
}

function deleteBook(bookID) {
	if (localStorage.getItem('books') !== null) {
		booksArray = JSON.parse(localStorage.getItem('books'));
		booksArray.splice(bookID, 1);
		localStorage.setItem('books', JSON.stringify(booksArray));
		alert('book deleted');
		location.reload();
	}
}
