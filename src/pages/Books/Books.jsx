import services from '../../services'
import { useEffect, useState } from 'react';
import Table from '../../components/Table';
import '../Pages.styles.css';
import Main from '../../layouts/Main';
import { useNavigate } from 'react-router-dom';

function Books() {
  const [books, setBooks] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, [])

  const fetchBooks = async () => {
    try {
      const response = await services.bookService.findAll();
      setBooks(response.data);
    }catch(error) {
      console.log(error);
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

  const handleEdit = (id) => {
    navigate(`/books/${id}`);
  }

  return (
    <Main>
      <div className='page'>
        <Table 
          title={"Book Records"}
          columns={["Name", "Publication Year", "Stock", "Author", "Publisher","Categories"]}
          data={books.map(item => {
            return {...item, 
              "author": item.author.name,
              "categories": item.categories.map(category => {
                return category.name
              }).join(', '),
              "publisher": item.publisher.name, 
              "stock": item.stock
            }
          })}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
       <button onClick={() => navigate('/books/new')}>New Book</button>
      </div>
    </Main>
  )
}

export default Books;