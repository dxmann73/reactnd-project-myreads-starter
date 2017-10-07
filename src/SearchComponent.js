import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BookComponent from "./BookComponent";
import * as BooksAPI from "./BooksAPI";
import {Link} from "react-router-dom";

class SearchComponent extends Component {
    static propTypes = {
        onChangeShelf: PropTypes.func.isRequired,
        allBooks: PropTypes.array.isRequired
    };

    state = {
        searchResponse: '',
        bookSearchResults: []
    };

    /** don't hammer on the backend every time the user presses a key */
    searchInputDelay = 350;//ms

    handleSearch = (e) => {
        clearTimeout(this.searchTimer);
        const searchTerm = e.target.value;
        if (searchTerm) {
            this.setState({
                searchResponse: `Searching for ${searchTerm}, please wait...`
            });
            this.searchTimer = setTimeout(() =>
                    BooksAPI
                        .search(searchTerm)
                        .then((results) => {
                            // when an error occurs in the search, the service returns not with an empty set, but with a different response structure.
                            if (results && Array.isArray(results)) {
                                this.setState({
                                    searchResponse: `Found ${results.length} books for term '${searchTerm}'`,
                                    bookSearchResults: this.updateShelfInfo(results)
                                });
                            } else {
                                this.setState({
                                    searchResponse: 'Nothing found, please refine your search. Note that not all keywords are picked up by the API. See the README.md for a list',
                                    bookSearchResults: []
                                });
                            }
                        }),
                this.searchInputDelay);
        } else {
            this.setState({
                searchResponse: '',
                bookSearchResults: []
            });
        }
        e.preventDefault();
    };

    /**
     * This is needed because search returns all books without shelf info (always null}, even if shelf info has been persisted per book. See BooksAPI comments.
     * Thus, we need to pass all shelved books from the parent and match the shelf info found in those against each search result.
     *
     * @param bookResults results of the search
     */
    updateShelfInfo = (bookResults) => {
        bookResults.forEach(book => {
                let bookOnShelf = this.props.allBooks.find((shelvedBook) => shelvedBook.id === book.id);
                book.shelf = bookOnShelf ? bookOnShelf.shelf : 'none';
            }
        );
        return bookResults;
    };

    /** don't forget to clean up :-) */
    componentWillUnmount() {
        clearTimeout(this.searchTimer);
    }

    render() {
        return <div className="search-books">
            <div className="search-books-bar">
                <Link to="/" className="close-search">Close</Link>
                <div className="search-books-input-wrapper">
                    <input type="text" autoFocus placeholder="Search by title or author" onChange={(event) => this.handleSearch(event)} />
                </div>
            </div>
            <div className="search-books-feedback"><p>{this.state.searchResponse}</p></div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {this.state.bookSearchResults.map(b =>
                        <li key={b.id}>
                            <BookComponent book={b} triggerMoveToShelf={(toShelf) => this.props.onChangeShelf(b, toShelf)} />
                        </li>
                    )}
                </ol>
            </div>
        </div>
    }
}

export default SearchComponent;
