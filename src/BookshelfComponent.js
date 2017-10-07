import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BookComponent from "./BookComponent";

class BookshelfComponent extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
        onChangeShelf: PropTypes.func.isRequired
    };

    render = () => {
        let {title, books} = this.props;

        // TODO we could still refactor out the <ol className="books-grid"> part, because it is used in the search as well. But this could be a trap- we would tightly couple markup and component implementation
        return <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map(b =>
                        <li key={b.id}>
                            <BookComponent book={b} triggerMoveToShelf={(toShelf) => this.props.onChangeShelf(b, toShelf)} />
                        </li>
                    )}
                </ol>
            </div>
        </div>
    }
}

export default BookshelfComponent;