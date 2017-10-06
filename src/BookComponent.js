import React, {Component} from 'react';
import PropTypes from 'prop-types';

class BookComponent extends Component {
    static propTypes = {
        book: PropTypes.shape({
            width: PropTypes.number.isRequired,
            height: PropTypes.number.isRequired,
            backgroundImage: PropTypes.string,
            shelfId: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            authors: PropTypes.string.isRequired
        }),
        triggerMoveToShelf: PropTypes.func.isRequired
    };

    render = () => {
        let {height, width, backgroundImage, shelfId, title, authors} = this.props.book;

        return <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{
                    width: width,
                    height: height,
                    backgroundImage: backgroundImage
                }}></div>
                <div className="book-shelf-changer">
                    <select defaultValue={shelfId} onChange={(event) => this.props.triggerMoveToShelf(event.target.value)}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{title}</div>
            <div className="book-authors">{authors}</div>
        </div>
    }
}

export default BookComponent;