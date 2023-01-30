function openMenu() {
    document.body.classList += " menu-open"
}

function closeMenu() {
    document.body.classList.remove('menu-open')
}



let books;

    async function renderBooks(filter) {
        const booksWrapper = document.querySelector('.bookz')

        booksWrapper.classList += ' books__loading'

        if (!books) {
            books = await getBooks()
        }

        booksWrapper.classList.remove('books__loading')

        if (filter === 'LOW_TO_HIGH') {
            books.sort((a, b) => (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice))
        }
        else if (filter === 'HIGH_TO_LOW') {
            books.sort((a, b) => (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice))
        }
        else if (filter === 'RATING') {
            books.sort((a, b) => b.rating - a.rating)
        }

        const booksHtml = books.map((book) => {
            return `<div class="book">
        <figure class="book-img-wrap">
            <img src='${book.url}' class="book-img" alt="" />
        </figure>
        <div class="book-title">${book.title}</div>
        <div class="book-ratings">
           ${ratingsHTML(book.rating)}
        </div>
        <div class="book-price">
        ${priceHTML(book.originalPrice, book.salePrice)}
        </div>
    </div>`
        })
            .join("")

        booksWrapper.innerHTML = booksHtml
    }

function priceHTML(originalPrice, salePrice) {
    if (!salePrice) {
        return `$${originalPrice.toFixed(2)}`
    }
    else {
        return `<span class="book-normal-price">$${originalPrice.toFixed(2)}</span> $${salePrice.toFixed(2)}`
    }

}






function ratingsHTML(rating) {
    let ratingHTML = ''

    for (let i = 0; i < Math.floor(rating); ++i) {
        ratingHTML += '<i class="fas fa-star"></i>\n'
    }

    if (!Number.isInteger(rating)) {
        ratingHTML += '<i class="fas fa-star-half-alt"></i>'
    }
    return ratingHTML
}

function filterBooks(event) {
    renderBooks(event.target.value)
}





setTimeout(() => {
    renderBooks()
});


// FAKE DATA //

function getBooks() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    title: 'Crack the Coding Interview',
                    url: 'assets/crack the coding interview.png',
                    originalPrice: 49.95,
                    salePrice: 14.95,
                    rating: 4.5,
                },
                {
                    id: 2,
                    title: 'Atomic Habits',
                    url: 'assets/atomic habits.jpg',
                    originalPrice: 56,
                    salePrice: 35,
                    rating: 5,
                },
                {
                    id: 3,
                    title: 'Deep Work',
                    url: 'assets/deep work.jpeg',
                    originalPrice: 32.25,
                    salePrice: null,
                    rating: 1,
                },
                {
                    id: 4,
                    title: 'The 10X Rule',
                    url: 'assets/book-1.jpeg',
                    originalPrice: 44,
                    salePrice: 19,
                    rating: 3,
                },
                {
                    id: 5,
                    title: 'Be Obsessed Or Be Average',
                    url: 'assets/book-2.jpeg',
                    originalPrice: 32.65,
                    salePrice: null,
                    rating: 4.5,
                },
                {
                    id: 6,
                    title: 'Rich Dad Poor Dad',
                    url: 'assets/book-3.jpeg',
                    originalPrice: 70,
                    salePrice: 15.5,
                    rating: 5,
                },
                {
                    id: 7,
                    title: 'Cash Flow Quadrant',
                    url: 'assets/book-4.jpeg',
                    originalPrice: 11,
                    salePrice: 9,
                    rating: 4.5,
                },
                {
                    id: 8,
                    title: '48 Laws Of Power',
                    url: 'assets/book-5.jpeg',
                    originalPrice: 32,
                    salePrice: 23,
                    rating: 5,
                },
                {
                    id: 9,
                    title: '5-Second Rule',
                    url: 'assets/book-6.jpeg',
                    originalPrice: 52,
                    salePrice: 44,
                    rating: 4.5,
                },
                {
                    id: 10,
                    title: 'Your Next Five Moves',
                    url: 'assets/book-7.jpg',
                    originalPrice: 35,
                    salePrice: 27,
                    rating: 4.5
                },
                {
                    id: 11,
                    title: 'Mastery',
                    url: 'assets/book-8.jpeg',
                    originalPrice: 21,
                    salePrice: 12,
                    rating: 4.5,
                },
            ])
        }, 1000);
    })
}