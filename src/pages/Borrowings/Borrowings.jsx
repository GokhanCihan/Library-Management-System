import services from '../../services'
import { useEffect, useState } from 'react';
import Table from '../../components/Table';
import Main from '../../layouts/Main';
import '../Pages.styles.css';
import { useNavigate } from 'react-router-dom';

function Borrowings() {
  const [borrowings, setBorrowings] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchBorrowings();
  }, [])

  const fetchBorrowings = async () => {
    try {
      const response = await services.borrowingService.findAll();
      setBorrowings(response.data);
    }catch(error) {
      console.log(error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await services.borrowingService.remove(id);
      fetchBorrowings();
    }catch(error) {
      console.log(error);
    }
  }

  const handleEdit = (id) => {
    navigate(`/borrowings/${id}`);
  }

  return (
    <Main>    
      <div className='page'>
        <Table 
          title={"Borrowing Records"}
          columns={["Borrower", "Mail", "Date Borrowed", "Date Returned", "Book"]}
          data={borrowings.map(item => ({...item, "book": item.book.name,}))}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
        <button onClick={() => navigate('/borrowings/new')}>New Borrowing</button>
      </div>
    </Main>
  )
}

export default Borrowings;