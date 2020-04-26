

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

function closeModalBox(){
	detailsModal.style.display = 'none';
}

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
//const authoroBook = document.getElementById('authorofBook');
// new inputs end
newBookBtn.addEventListener('click', addToELibrary);

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
	this.read = "red";
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
		saveBook(book);
		location.reload();
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
			bookRow.innerHTML += `<div class="col-md-4 all-details mt-5">
			
			<div class="row">
			  <div class="col-md-6">
			    <div class="book-cover">
			  <img src="${booksArray[i].coverImgURL}" onclick="displayBookDetails(${i})" class="card-img images img-fluid">
			  <span class="all-buttons btn btn-default" onclick="displayBookDetails(${i})">Details</span>
			  <button class="all-buttons favoriteButton mt-2" style="background-color:${booksArray[i].read}";>fav</button>
		         </div>
			  </div>
			  <div class="col-md-6">
			 
                    <p style="color:${booksArray[i].read}";  class="card-title text-white">Title: ${booksArray[i].title}</p>
                    <p class="card-title text-white" id="authorofBook">Author: ${booksArray[i].author}</p>
                    <h6 class="card-title text-white">Price: &#8358;${booksArray[i].price}</h6>
					<h6 class="card-title text-white">Published : ${booksArray[i].yearPub}</h6>
					<div class="delete_details">
				
					<span class="all-buttons btn btn-default" onclick="deleteBook(${i})" >Delete</span>
					</div>

                    


					
				
            
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
	  detailsModal.innerHTML = `<div class="col-md-12 text-white text-center">
	  <h3>Short Extract: ${booksArray[bookId].extract}</h3>
	 
	  <h3>Publisher:${booksArray[bookId].pub}</h3>
	  <h3>Language:${booksArray[bookId].language}</h3>
	  <h3>No Pages:${booksArray[bookId].pages} </h3>
	  <h3>Country:${booksArray[bookId].country}</h3>
	  <h3>Awards</h3>
	  <span><i class="fas fa-window-close" onClick="closeModalBox()"></i></span>
	</div>`;
	  detailsModal.style.display = 'block';
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
