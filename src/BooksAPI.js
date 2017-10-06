/** this page has a little API overview. */
const api = "https://reactnd-books-api.udacity.com";

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token;
if (!token) {
    token = localStorage.token = 'dxmann73';
}

const headers = {
    'Accept': 'application/json',
    'Authorization': token
};


/**
 * GET a certain book by ID
 * @param bookId
 */
export const get = (bookId) =>
    fetch(`${api}/books/${bookId}`, {headers})
        .then(res => res.json())
        .then(data => data.book);

/**
 * GET all books
 */
export const getAll = () =>
    fetch(`${api}/books`, {headers})
        .then(res => res.json())
        .then(data => data.books);


/**
 * Update the "shelf" part of a book. This should set the property "shelf" on the book TODO check on the structure; API page doesn't really tell
 * @param book
 * @param shelf
 */
export const update = (book, shelf) =>
    fetch(`${api}/books/${book.id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({shelf})
    }).then(res => res.json());


/**
 * Query all books for a certain string. Categories seem to exist somewhere, there is a fixed set of search terms TODO check on this
 * @param query
 * @param maxResults
 */
export const search = (query, maxResults) =>
    fetch(`${api}/search`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({query, maxResults})
    }).then(res => res.json())
        .then(data => data.books);
