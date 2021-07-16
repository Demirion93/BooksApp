{
  'use strict';
  
  //referencja do szablonu template oraz books-list
  const select = {
    templateOf: {
      bookTemplate: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
    },
    booksImages: {
      images: '.books-list .book__image',
    }
  };
  const classNames = {
    books: {
      favoriteBook: 'favorite',
      filters: '.filters',
    }
  };
    
    
  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };
    
  /* funkcja render*/
  function render() {
    
    //pętla po każdym elemencie z dataSource.books
    for (let book of dataSource.books) {
      //generate HTML na podstawie szablonu książki
      // const generatedHTML = templates.bookTemplate(book);
      // ĆWICZENIE 6 - RATING
      const ratingBgc = determineRatingBgc(book.rating);
      const ratingWidth = book.rating * 10;
      const generatedHTML = templates.bookTemplate ({
        id: book.id,
        name: book.name,
        price: book.price,
        image: book.image,
        rating: book.rating,
        ratingBgc,
        ratingWidth,
      });
      //generowanie elementu DOM na podstawie kodu HTML
      const element = utils.createDOMFromHTML(generatedHTML);
      //find booksList container i dołącz jako nowe dziecko DOM do listy .books-list
      const booksListContainer = document.querySelector(select.containerOf.booksList);
      booksListContainer.appendChild(element);
    }
  }
  render();

  // Ćwiczenie 2

  let favoriteBooks = [];
  const filters = [];
  const filtr = document.querySelector('.filters'); 
  console.log(favoriteBooks);

  
  function initActions(){

    // referencja do listy wszystkich elementów .book__image w liście .booksList
    const booksImage = document.querySelectorAll(select.booksImages.images);
    console.log(booksImage);
    
    // Następnie przejdź po każdym elemencie z tej listy
    for (let image of booksImage){
      // nasłuchiwacz, który po wykryciu uruchomi funkcję
      image.addEventListener('dblclick', function(event){
        // zatrzymanie domyślnego zachowania przeglądarki
        event.preventDefault();
        const image = event.target.offsetParent; //ĆWICZENIE 4
        const idBook = image.getAttribute('data-id');

        
        // pobranie z tego elementu data-id identyfikator książki
        const bookList = favoriteBooks.includes(idBook);

        
        // warunek Ćwiczenie 3
        
        if(!bookList){
          // dodanie do klikniętego elementu klasy favorite
          image.classList.add(classNames.books.favoriteBook);
          // dodanie identyfikatora do favoriteBooks
          favoriteBooks.push(idBook);
          console.log(bookList);
        }
        else{
          // usunięcie z klikniętego elementu klasy favorite
          image.classList.remove(classNames.books.favoriteBook);
          // przefiltrowanie tablicy i dodanie nowej bez tego elementu
          favoriteBooks = favoriteBooks.filter(id => id !== idBook);
          console.log('bookListOff');
        }
        
        
        
        
        
        
        console.log(favoriteBooks);
      });
    }
  
    //ĆWICZENIE 5

    // 5.1.
    filtr.addEventListener('change', function(event){
      event.preventDefault();
      if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox'  && event.target.name==='filter') {
        if (event.target.checked) {
          filters.push(event.target.value);
          console.log('condition 1', filters);
        } else {
          filters.splice(filters.indexOf(event.target.value));
          console.log('condition 2');
        }
      }
      filterBooks();
    });
    // 5.2
    function filterBooks(){
      for (let book of dataSource.books){
        let shouldBeHidden = false;
        for(const filter of filters) {
          if(!book.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }
      
        if (shouldBeHidden) {
          const bookCover = document.querySelector('.book__image[data-id="' + book.id + '"]');
          bookCover.classList.add('hidden');
        } else {
          const bookCover = document.querySelector('.book__image[data-id="' + book.id + '"]');
          bookCover.classList.remove('hidden');
        }
      }
    }
  }

  initActions();

  // ĆWICZENIE 6
  function determineRatingBgc(rating){
    let background = '';
    if (rating < 6) {
      background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if (rating > 6 && rating <= 8) {
      background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } else if (rating > 8 && rating <= 9) {
      background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else if (rating > 9) {
      background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
    return background;
  }




      

  
      
}