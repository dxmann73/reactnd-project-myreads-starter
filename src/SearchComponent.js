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
        bookSearchResults: []
    };

    /** don't hammer on the backend every time the user presses a key */
    searchInputDelay = 400;//ms

    handleSearch = (e) => {
        const searchTerm = e.target.value;
        if (searchTerm) {
            clearTimeout(this.searchTimer);
            this.searchTimer = setTimeout(
                // when an error occurs in the search, the service returns not with an empty set, but with a different response structure.
                // since the error message is misleading ("Empty query" when searching for 'xyz'), we don't use it here.
                // Normally there would be a user feedback component (a growl or something like this)
                // TODO maybe figure it out in the API and give a clean result
                () => BooksAPI
                    .search(searchTerm)
                    .then((results) => results && Array.isArray(results) && this.setState({bookSearchResults: results})),
                this.searchInputDelay);
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
