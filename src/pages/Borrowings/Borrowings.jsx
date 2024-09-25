import services from '../../services'
import { useEffect, useState } from 'react';
import Table from '../../components/Table';
import CreateBorrowing from './CreateBorrowing';
import '../Pages.styles.css';

function Borrowings() {
  const [borrowings, setBorrowings] = useState([]);
  const [selectedId, setSelectedId] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

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

  const handleSubmit = async (newBorrowing) => {
    try {
      await services.borrowingService.create(newBorrowing);
      setIsCreating(false);
      fetchBorrowings();
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
      <h2>Borrowed Books Page</h2>
      <Table 
        title={"Borrowed Books"}
        columns={["ID", "Borrower", "Mail", "Date Borrowed", "Date Returned", "Book"]}
        data={borrowings.map(item => ({...item, "book": item.book.name,}))}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
      {isCreating && 
        <CreateBorrowing 
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        />}
      {(!isCreating && !isEditing) &&
        <button onClick={(() => setIsCreating(true))}>Add New Borrowing</button>}
    </div>
  )
}

export default Borrowings;