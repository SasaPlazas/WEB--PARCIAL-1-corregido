import { useState, useEffect } from 'react'
import ListCard from './component/cardList';
import LectureList from './component/lectureList';
import './App.css'

function App() {
  const [search, setSearch] = useState('');
  const [books, setBooks] = useState([]);
  const [lectureBooks, setLectureBooks] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const sendSearch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      const response = await fetch(`https://openlibrary.org/search.json?q=${search}&limit=10`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setBooks(data.docs || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  const addToLectureList = (book) => {
    // Verificar si el libro ya está en la lista
    const exists = lectureBooks.some(item => item.key === book.key);
    if (!exists) {
      const newBook = {
        ...book,
        readingStatus: 'pendiente',
        personalNotes: ''
      };
      setLectureBooks([...lectureBooks, newBook]);
    }
  }

  const updateLectureBook = (key, field, value) => {
    setLectureBooks(lectureBooks.map(book => 
      book.key === key ? { ...book, [field]: value } : book
    ));
  }

  const removeFromLectureList = (key) => {
    setLectureBooks(lectureBooks.filter(book => book.key !== key));
  }

  if (loading) return <p className="loading">Está cargando...</p>
  if (error) return <p className="error">Hay un error: {error}</p>

  return (
    <div className="app">
      <header>
        <h1>BookTrack</h1>
        <form onSubmit={(e) => sendSearch(e)} className="search-form">
          <input
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search a book"
            value={search}
            className="search-input"
          />
          <button type='submit' className="search-button">Search</button>
        </form>
      </header>

      <main>
        <section className="results-section">
          <h2>Search Results</h2>
          {books.length === 0 && search !== '' ? (
            <p className="no-results">No books found</p>
          ) : (
            <ListCard books={books} onAddToLectureList={addToLectureList} />
          )}
        </section>

        <section className="lecture-section">
          <h2>My Reading List</h2>
          {lectureBooks.length === 0 ? (
            <p className="empty-list">Your reading list is empty</p>
          ) : (
            <LectureList 
              books={lectureBooks} 
              onUpdateBook={updateLectureBook}
              onRemoveBook={removeFromLectureList}
            />
          )}
        </section>
      </main>
    </div>
  )
}

export default App