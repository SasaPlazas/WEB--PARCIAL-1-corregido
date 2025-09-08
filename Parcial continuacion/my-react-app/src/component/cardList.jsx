import BooksCard from './booksCard'

function ListCard({books, onAddToLectureList}) {
  return (
    <div className="list-card">
      {books.map((book) => 
        <BooksCard 
          book={book} 
          key={book.key} 
          onAddToLectureList={onAddToLectureList}
        />
      )}
    </div>
  )
}

export default ListCard