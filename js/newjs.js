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
const detailsModal = document.querySelector('#modalBookDetails');
const closeModalDetails = document.querySelector('#closeModalBookDetails');
addBtn.addEventListener('click', showModal);
// closeModalDetails.addEventListener('click', detailsHide);
// bookModal.addEventListener('click', hideModal)
cancelBtn.addEventListener('click', hideModal);

function showModal() {
	bookModal.style.display = 'block';
}
function hideModal() {
	bookModal.style.display = 'none';
}

function detailsHide(){
	detailsModal.style.display = 'none';
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

// new inputs starts
const bukPrice = document.getElementById('bookPrice');
const bukAuthor = document.getElementById('bookAuthor');
const bukLanguge = document.getElementById('language');
const bukCountry = document.getElementById('bookCountry');
const bukExtract = document.getElementById('bookExtract');
// new inputs end
newBookBtn.addEventListener('click', addToELibrary);
const elibrary = [];
function Book(title, pub, pages, yearPub, coverImgURL,bokPrice,bokAuthor,bokLanguage,bokCountry,bokExtract) {
	this.title = title;
	this.pub = pub;
	this.pages = pages;
	this.yearPub = yearPub;
	this.coverImgURL = coverImgURL;
	this.price= bokPrice;
	this.author= bokAuthor;
	this.language=bokLanguage;
	this.country=bokCountry;
	this.extract=bokExtract;
	this.read = 0;
}

function addToELibrary() {
	if (validateInput()) {
		let title = txtTitle.value;
		let pub = txtPub.value;
		let pages = txtPages.value;
		let coverImgURL = txtCoverURL.value;
		let yearPub = txtPubYear.value;
		let price = bukPrice.value;
		let author = bukAuthor.value;
		let language = bukLanguge.value;
		let country = bukCountry.value;
		let extract = bukExtract.value;
		let book = new Book(title, pub, pages, yearPub, coverImgURL,price,author,language,country,extract);
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
                    <h5 class="card-title">Book Title: ${booksArray[i].title}</h5>
                    <h6 class="card-title">Book Author: ${booksArray[i].author}</h6>
                    <h6 class="card-title">Price: &#8358;${booksArray[i].price}</h6>
                    <h6 class="card-title">Published : ${booksArray[i].yearPub}</h6>
                    <span class="btn btn-primary" onclick="displayBookDetails(${i})">View Details</span>
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

function displayBookDetails(bookId){
  if(localStorage.getItem('books') !== null){
	  booksArray = JSON.parse(localStorage.getItem('books'));
	  booksArray[bookId];
	  console.log(booksArray[bookId]);
	  detailsModal.innerHTML += `<div class="col-md-12 text-white">
	  <h3>Short Extract: ${booksArray[bookId].extract}</h3>
	  <h3>No Pages:${booksArray[bookId].pages} </h3>
	  <h3>Publisher:${booksArray[bookId].pub}</h3>
	  <h3>Language:${booksArray[bookId].language}</h3>
	  <h3>Country:${booksArray[bookId].country}</h3>
	  <h3>Awards</h3>
	  <button class="btn btn-danger">close</button>
	</div>`;
	  detailsModal.style.display = 'block';
  }
}


// author: "1111"
// country: "london"
// coverImgURL: "https://res.cloudinary.com/codewit/image/upload/v1587839210/portfolo_chkd0q.jpg"
// extract: "short text"
// language: "Nigeria"
// pages: "8"
// price: "122"
// pub: "abayomi"
// read: 0
// title: "tales by moonligth"
// yearPub: "1290"

function deleteBook(bookID) {
	if (localStorage.getItem('books') !== null) {
		booksArray = JSON.parse(localStorage.getItem('books'));
		booksArray.splice(bookID, 1);
		localStorage.setItem('books', JSON.stringify(booksArray));
		alert('book deleted');
		location.reload();
	}
}
