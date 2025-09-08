import { useState } from 'react'

function BooksCard({book, onAddToLectureList}) {
  const [isAdded, setIsAdded] = useState(false)

  const handleClick = () => {
    onAddToLectureList(book);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  }

  return (
    <div className='books-card'>
      <h3>{book.title || 'Unknown Title'}</h3>
      <p><strong>Author:</strong> {book.author_name ? book.author_name[0] : 'Unknown'}</p>
      <p><strong>Published:</strong> {book.first_publish_year || 'Unknown year'}</p>
      <button 
        onClick={handleClick} 
        className={isAdded ? 'added-button' : 'add-button'}
        disabled={isAdded}
      >
        {isAdded ? 'Added!' : 'Add to List'}
      </button>
    </div>
  )
}

export default BooksCard