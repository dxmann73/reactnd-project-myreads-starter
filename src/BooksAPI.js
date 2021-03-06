/** see this page for a little API overview. */
const api = "https://reactnd-books-api.udacity.com";


// Use a unique token for storing bookshelf data on the backend server.
const token = 'dxmann73';

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
 *
 * Returns a Promise which resolves to a JSON object containing a collection of book objects.
 * This collection represents the books currently in the bookshelves in your app.
 */
export const getAll = () =>
    fetch(`${api}/books`, {headers})
        .then(res => res.json())
        .then(data => data.books);


/**
 * Update the "shelf" part of a book. This updates the property "shelf" of the book on the server.
 * Returns a Promise which resolves to a JSON object containing all current shelves with the IDs of their respective books.
 *
 * @param book: `<Object>` containing at minimum an `id` attribute
 * @param shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]
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
 * Query all books for a certain string. Tere is a fixed set of search terms, see the README.md
 *
 * query: `<String>`
 * maxResults: `<Integer>` Due to the nature of the backend server, search results are capped at 20, even if this is set higher.
 *
 * Returns a Promise which resolves to a JSON object containing a collection of book objects.
 * These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.
 *
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
