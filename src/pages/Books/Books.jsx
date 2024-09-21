import services from '../../services'
import { useEffect, useState } from 'react';
import Table from '../../components/Table';
import '../Pages.styles.css';

function Books() {
  const [books, setBooks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  
  useEffect(() => {
    fetchBookList();
  }, [])

  const fetchBookList = async () => {
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
      fetchBookList();
    }catch(error) {
      console.log(error);
    }
  }

  const handleSubmit = async (newBook) => {
    try {
      await services.bookService.create(newBook);
      setIsCreating(false);
      fetchBookList();
    }catch(error) {
      console.log(error.response.data);
    }
  }

  const handleEdit = (id) => {
    setIsEditing(true);
    setSelectedId(id);
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
      {/* isEditing && 
      <EditBook 
        setIsEditing={setIsEditing}
        selectedId={selectedId}
        fetchBookList={fetchBookList}
        handleCancel={handleCancel}
      />}
      {isCreating && 
      <CreateBook 
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />}
      {(!isCreating && !isEditing) && <button onClick={(() => setIsCreating(true))}>Add New Book</button>*/}
    </div>
  )
}

export default Books;