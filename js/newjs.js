const detailsModal = document.querySelector('#modalBookDetails');
// console.log(detailsModal)
$('#addBtn').click(function() {
	$('#bookModal').show();
});
$('#cancelBtn').click(function() {
	$('#bookModal').hide();
});
$('#close-window').click(function() {
	$('#modalBookDetails').hide();
});

function closeModalBox() {
	detailsModal.style.display = 'none';
}
const bookRow = document.getElementById('bookRow');

$('#newBookBtn').click(function() {
	addToELibrary();
});

function Book(title, pub, pages, yearPub, coverImgURL, bokPrice, bokAuthor, bokLanguage, bokCountry, bokExtract) {
	this.title = title;
	this.pub = pub;
	this.pages = pages;
	this.yearPub = yearPub;
	this.coverImgURL = coverImgURL;
	this.price = bokPrice;
	this.author = bokAuthor;
	this.language = bokLanguage;
	this.country = bokCountry;
	this.extract = bokExtract;
	this.read = '0';
}

function addToELibrary() {
	if (validateInput()) {
		let title = $('#txtTitle').val();
		let pub = $('#txtPub').val();
		let pages = $('#txtPages').val();
		let coverImgURL = $('#txtCoverURL').val();
		let yearPub = $('#txtPubYear').val();
		let price = $('#bookPrice').val();
		let author = $('#bookAuthor').val();
		let language = $('#language').val();
		let country = $('#bookCountry').val();
		let extract = $('#bookExtract').val();
		let book = new Book(title, pub, pages, yearPub, coverImgURL, price, author, language, country, extract);
		saveBook(book);
		location.reload();
	} else {
		alert('Sorry, all fields are required');
	}
}
function validateInput() {
	if (
		$('#txtTitle').val() == '' ||
		$('#txtPub').val() == '' ||
		$('#txtPages').val() == '' ||
		$('#txtCoverURL').val() == '' ||
		$('#txtPubYear').val() == '' ||
		$('#bookPrice').val() == '' ||
		$('#bookAuthor').val() == '' ||
		$('#language').val() == ''
	) {
		return false;
	}
	return true;
}

$(function() {
	var template = new EJS({
		text: $('#template').html()
	});
	let booksArray = JSON.parse(localStorage.getItem('books'));
	$('#list').html(template.render({ list: booksArray }));
});

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

function displayBookDetails(bookId) {
	if (localStorage.getItem('books') !== null) {
		booksArray = JSON.parse(localStorage.getItem('books'));
		booksArray[bookId];
		detailsModal.innerHTML = `<div class="col-md-12 text-white text-center">
	  <h3>Short Extract: ${booksArray[bookId].extract}</h3>
	  <h3>Publisher:${booksArray[bookId].pub}</h3>
	  <h3>Language:${booksArray[bookId].language}</h3>
	  <h3>No Pages:${booksArray[bookId].pages} </h3>
	  <h3>Country:${booksArray[bookId].country}</h3>
	  <h3>Awards</h3>
	  <span><i id="close-window" class="fas fa-window-close" onClick="closeModalBox()"></i></span>
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

function makeFavorite(bookID) {
	console.log(bookID);
	booksArray = JSON.parse(localStorage.getItem('books'));
	for (let i = 0; i < booksArray.length; i++) {
		if (i == bookID) {
			booksArray[i].read = 1;
			console.log(booksArray[i].i);
			break;
		}
	}
	//booksArray[bookID].read = 1
	localStorage.setItem('books', JSON.stringify(booksArray));

	//booksArray = JSON.parse(localStorage.getItem('books'));
	location.reload();
	//console.log(booksArray[1]);
	//console.log(booksArray[bookID]);
}
