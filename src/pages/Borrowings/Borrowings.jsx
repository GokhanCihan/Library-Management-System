import services from '../../services'
import { useEffect, useState } from 'react';
import Table from '../../components/Table';
import Main from '../../layouts/Main';
import '../Pages.styles.css';
import { useNavigate } from 'react-router-dom';
import { useModal } from "../../context/ModalContext/ModalContext";

function Borrowings() {
  const [borrowings, setBorrowings] = useState([]);

  const navigate = useNavigate();
  const modal = useModal();

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
      modal.alert({
        message: "Borrowing record removed!", 
        status: "success",
      });
    }catch(error) {
      modal.alert({
        message: "Borrowing removal failed!", 
        status: "fail"
      });
    }
  }

  const handleEdit = (id) => {
    navigate(`/borrowings/${id}`);
  }

  return (
    <Main>    
        <Table 
          title={"Borrowing Records"}
          columns={["Borrower", "Mail", "Date Borrowed", "Date Returned", "Book"]}
          data={borrowings.map(item => ({...item, "book": item.book.name,}))}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
        <button className="create" onClick={() => navigate('/borrowings/new')}>New Borrowing</button>
    </Main>
  )
}

export default Borrowings;