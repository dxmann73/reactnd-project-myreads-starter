import React, {Component} from 'react';
import PropTypes from 'prop-types';

class BookComponent extends Component {
    static propTypes = {
        book: PropTypes.shape({
            shelf: PropTypes.string,// empty when finding non-shelved books in the search
            title: PropTypes.string.isRequired,
            authors: PropTypes.array, // array of strings; sometimes empty
            imageLinks: PropTypes.shape({
                smallThumbnail: PropTypes.string.isRequired
            })
        }),
        triggerMoveToShelf: PropTypes.func.isRequired
    };

    render = () => {
        let {shelf, title, authors, imageLinks} = this.props.book;

        return <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{
                    width: 128,
                    height: 190,
                    backgroundImage: `url("${imageLinks.smallThumbnail}")`
                }}></div>
                <div className="book-shelf-changer">
                    <select defaultValue={shelf || 'none'} onChange={(event) => this.props.triggerMoveToShelf(event.target.value)}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{title}</div>
            <div className="book-authors">{authors && authors.join(', ')}</div>
        </div>
    }
}

export default BookComponent;