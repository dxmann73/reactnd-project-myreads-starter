import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BookComponent from "./BookComponent";
import * as BooksAPI from "./BooksAPI";
import {Link} from "react-router-dom";

class SearchComponent extends Component {
    static propTypes = {
        onChangeShelf: PropTypes.func.isRequired
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
            this.searchTimer = setTimeout(
                // since the error message is misleading ("Empty query" when searching for 'xyz'), we don't use it here.
                // Normally there would be a user feedback component (a growl or something like this)
                // TODO maybe figure it out in the API and give a clean result
                () => BooksAPI
                    .search(searchTerm)
                    .then((results) => {
                        // when an error occurs in the search, the service returns not with an empty set, but with a different response structure.
                        if (results && Array.isArray(results)) {
                            this.setState({
                                searchResponse: `Found ${results.length} books for term '${searchTerm}'`,
                                bookSearchResults: results
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
