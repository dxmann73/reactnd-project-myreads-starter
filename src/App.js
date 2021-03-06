import React from 'react';
import './App.css';
import {Link, Route} from 'react-router-dom';
import BookshelfComponent from "./BookshelfComponent";
import * as BooksAPI from './BooksAPI';
import SearchComponent from "./SearchComponent";

class BooksApp extends React.Component {
    state = {
        currentlyReading: [],
        wantToRead: [],
        read: [],
        none: []
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
        BooksAPI.update(bookToMove, toShelf).then(() => {
                // 'update' returns all shelves, but only with the book IDs for some reason; so count this as success and handle state manually here.
                let oldShelf = bookToMove.shelf || 'none';// BooksAPI gives null as a shelf ID, treat this as "none"
                bookToMove.shelf = toShelf;
                this.setState(prevState => ({
                    [oldShelf]: prevState[oldShelf].filter(book => book.id !== bookToMove.id),
                    [toShelf]: [...prevState[toShelf], bookToMove]
                }));
            }
        );
    };

    render() {
        return (
            <div className="app">
                <Route exact path="/search" render={() =>
                    <SearchComponent onChangeShelf={this.moveToShelf}
                                     allBooks={[...this.state.currentlyReading, ...this.state.wantToRead, ...this.state.read]} />
                }
                />

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
