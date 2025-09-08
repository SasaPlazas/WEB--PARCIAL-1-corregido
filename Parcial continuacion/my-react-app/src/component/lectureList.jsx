function LectureList({books, onUpdateBook, onRemoveBook}) {
  return (
    <div className="lecture-list">
      {books.map((book) => (
        <div key={book.key} className="lecture-book">
          <h3>{book.title}</h3>
          <p><strong>Author:</strong> {book.author_name ? book.author_name[0] : 'Unknown'}</p>
          <p><strong>Published:</strong> {book.first_publish_year || 'Unknown year'}</p>
          
          <div className="book-controls">
            <div className="control-group">
              <label>Reading Status:</label>
              <select 
                value={book.readingStatus} 
                onChange={(e) => onUpdateBook(book.key, 'readingStatus', e.target.value)}
              >
                <option value="pendiente">To Read</option>
                <option value="leyendo">Reading</option>
                <option value="terminado">Finished</option>
              </select>
            </div>
            
            <div className="control-group">
              <label>Personal Notes:</label>
              <textarea 
                value={book.personalNotes} 
                onChange={(e) => onUpdateBook(book.key, 'personalNotes', e.target.value)}
                placeholder="Add your notes here..."
              />
            </div>
            
            <button 
              onClick={() => onRemoveBook(book.key)}
              className="remove-button"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default LectureList