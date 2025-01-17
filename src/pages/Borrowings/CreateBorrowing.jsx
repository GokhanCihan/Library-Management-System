import { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useEffect } from "react";
import services from "../../services";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/ModalContext/ModalContext";

function CreateBorrowing() {
  const [borrowing, setBorrowing] = useState({id: 0,});
  const [books, setBooks] = useState([]);

  const navigate = useNavigate();
  const modal = useModal();

  useEffect(() => {
    fetchBooks();
  },[])

  const fetchBooks = async () => {
    try {
      const response = await services.bookService.findAll();
      setBooks(response.data);
    }catch(error) {
      console.log(error);
    }
  }

  const handleChange = (e) => setBorrowing({...borrowing, [e.target.name]: e.target.value});

  const handleChangeBook = (value) => setBorrowing({...borrowing, 
    bookForBorrowingRequest: {
      id: value.id, 
      name: value.name,
      publicationYear: value.publicationYear,
      stock: value.stock
    }
  });

  const handleSave = async (newBorrowing) => {
    try {
      await services.borrowingService.create(newBorrowing);
      modal.alert({
        message: "Borrowing record created successfuly!", 
        status: "success",
        onClose: () => navigate("/borrowings")
      });
    }catch(error) {
      modal.alert({
        message: "Borrowing save failed due to incorrect/insufficient information. Please, try again.", 
        status: "fail"
      });
    }
  }

  const handleCancel = () => {
    navigate('/borrowings');
  }

  return (
    <div className="form">
      <h3>New Borrowing</h3>
      <div className='add-item'>
        <div className='field'>
          <label>Borrower Name:</label>
          <input name="borrowerName" type="text" onChange={handleChange} />
        </div>
        <div className='field'>
          <label>Borrower Mail:</label>
          <input name='borrowerMail' type="text" onChange={handleChange} />
        </div>
        <div className='field'>
          <label>Date Borrowed:</label>
          <input name='borrowingDate' type="date" onChange={handleChange} />
        </div>
        <Autocomplete 
          options={books}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} label="select a book" placeholder="books" />}
          onChange={(event, value, reason) => handleChangeBook(value)}
        />
        <div className='btn-container'>
          <button onClick={() => handleSave(borrowing)}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default CreateBorrowing