import React from 'react';
import './App.css';
import {Link, Route} from 'react-router-dom';
import BookshelfComponent from "./BookshelfComponent";
import * as BooksAPI from './BooksAPI';

class BooksApp extends React.Component {
    state = {
        currentlyReading: [],
        wantToRead: [],
        read: []
    };

    componentDidMount() {
        BooksAPI.getAll().then(books => {
            this.setState({
                currentlyReading: books.filter(book => book.shelf === 'currentlyReading'),
                wantToRead: books.filter(book => book.shelf === 'wantToRead'),
                read: books.filter(book => book.shelf === 'read'),
            });
        });
    }

    moveToShelf = (bookToMove, toShelf) => {
        let fromShelf = bookToMove.shelf;// old shelf
        if (!this.state[fromShelf] && !this.state[toShelf]) {
            console.log('server would validate if this shelf even exists, so we did no validation, would just re-fetch everything on error');// TODO
            return;
        }

        // move book within the internal shelves
        this.setState(prevState => {
                let newState = {};
                // remove from old...
                newState[fromShelf] = prevState[fromShelf].filter(book => book.id !== bookToMove.id);
                // ... and add to new shelf
                bookToMove.shelf = toShelf;
                prevState[toShelf].push(bookToMove);
                newState[toShelf] = prevState[toShelf];
                return newState;
            }
        );
    };

    render() {
        return (
            <div className="app">
                <Route exact path="/search" render={() =>
                    <div className="search-books">
                        <div className="search-books-bar">
                            <Link to="/" className="close-search">Close</Link>
                            <div className="search-books-input-wrapper">
                                <input type="text" placeholder="Search by title or author" />
                            </div>
                        </div>
                        <div className="search-books-results">
                            <ol className="books-grid"></ol>
                        </div>
                    </div>
                } />

                <Route exact path="/" render={() =>
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads Application</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                <BookshelfComponent title="Currently Reading" books={this.state.currentlyReading} onChangeShelf={this.moveToShelf} />
                                <BookshelfComponent title="Want to Read" books={this.state.wantToRead} onChangeShelf={this.moveToShelf} />
                                <BookshelfComponent title="Read" books={this.state.read} onChangeShelf={this.moveToShelf} />
                            </div>
                        </div>
                        <div className="open-search">
                            <Link to="/search">Add a book</Link>
                        </div>
                    </div>
                } />
            </div>
        )
    }
}

export default BooksApp;
