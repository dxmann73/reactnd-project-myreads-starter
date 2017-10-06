import React from 'react';
import './App.css';
import {Link, Route} from 'react-router-dom';
import BookshelfComponent from "./BookshelfComponent";

class BooksApp extends React.Component {
    state = {
        currentlyReading: [
            {
                id: 10,
                width: 128,
                height: 193,
                backgroundImage: 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")',
                shelf: 'currentlyReading',
                title: 'To Kill a Mockingbird',
                authors: 'Harper Lee'
            }, {
                id: 11,
                width: 128,
                height: 188,
                backgroundImage: 'url("http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api")',
                shelf: 'currentlyReading',
                title: 'Ender\'s Game',
                authors: 'Orson Scott Card'
            }
        ],
        wantToRead: [
            {
                id: 20,
                width: 128,
                height: 192,
                backgroundImage: 'url("http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api")',
                shelf: 'wantToRead',
                title: '1776',
                authors: 'David McCullough'
            }, {
                id: 21,
                width: 128,
                height: 188,
                backgroundImage: 'url("http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api")',
                shelf: 'wantToRead',
                title: 'Harry Potter and the Sorcerer\'s Stone',
                authors: 'J.K. Rowling'
            }
        ],
        read: [
            {
                id: 30,
                width: 128,
                height: 192,
                backgroundImage: 'url("http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api")',
                shelf: 'read',
                title: ' The Hobbit',
                authors: 'J.R.R. Tolkien'
            }, {
                id: 31,
                width: 128,
                height: 174,
                backgroundImage: 'url("http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api")',
                shelf: 'read',
                title: 'Oh, the Places You\'ll Go!',
                authors: 'Seuss'
            }, {
                id: 32,
                width: 128,
                height: 192,
                backgroundImage: 'url("http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api")',
                shelf: 'read',
                title: 'The Adventures of Tom Sawyer',
                authors: 'Mark Twain'
            }
        ]
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
                                <BookshelfComponent title="Currently Reading" books={this.state.currentlyReading} />
                                <BookshelfComponent title="Want to Read" books={this.state.wantToRead} />
                                <BookshelfComponent title="Read" books={this.state.read} />
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
