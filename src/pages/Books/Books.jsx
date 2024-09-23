import services from '../../services'
import { useEffect, useState } from 'react';
import Table from '../../components/Table';
import CreateBook from './CreateBook';
import EditBook from'./EditBook';
import '../Pages.styles.css';

function Books() {
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, [])

  const fetchBooks = async () => {
    try {
      const response = await services.bookService.findAll();
      setBooks(response.data);
    }catch(error) {
      console.log(error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await services.bookService.remove(id);
      fetchBooks();
    }catch(error) {
      console.log(error);
    }
  }

  const handleSubmit = async (newBook) => {
    try {
      await services.bookService.create(newBook);
      setIsCreating(false);
      fetchBooks();
    }catch(error) {
      console.log(error.response.data);
    }
  }

  const handleEdit = (id) => {
    setIsEditing(true);
    setSelectedBookId(id);
  }

  const handleCancel = () => {
    setIsCreating(false);
    setIsEditing(false);
  }

  return (
    <div className='page'>
      <h2>Book Page</h2>
      <Table 
        title={"Books"}
        columns={["ID", "Name", "Publication Year", "Author", "Categories", "Publisher", "Stock"]}
        data={books.map(item => {
          return {...item, 
            "author": item.author.name, 
            "publisher": item.publisher.name, 
            "categories": item.categories.map(category => {
              return category.name
            }).join(', ')}
        })}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
      {isEditing && 
      <EditBook 
        setIsEditing={setIsEditing}
        selectedId={selectedBookId}
        fetchBooks={fetchBooks}
        handleCancel={handleCancel}
      />}
      {isCreating && 
        <CreateBook 
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        />}
        {(!isCreating && !isEditing) && <button onClick={(() => setIsCreating(true))}>Add New Book</button>}
    </div>
  )
}

export default Books;