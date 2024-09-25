import { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useEffect } from "react";
import services from "../../services";

function CreateBorrowing({handleSubmit, handleCancel}) {
  const [borrowing, setBorrowing] = useState({id: 0,});
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  },[])

  const fetchBooks = async () => {
    try {
      const response = await services.bookService.findAll();
      setBooks(response.data)
    }catch(error) {
      console.log(error)
    }
  }

  const handleCreate = () => handleSubmit(borrowing);

  const handleChange = (e) => setBorrowing({...borrowing, [e.target.name]: e.target.value});

  const handleChangeBook = (value) => setBorrowing({...borrowing, 
    bookForBorrowingRequest: {
      id: value.id, 
      name: value.name,
      publicationYear: value.publicationYear,
      stock: value.stock
    }
  });

  return (
    <>
      <h3>New Borrowing Record</h3>
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
          <button onClick={handleCreate}>Create</button>
          <button onClick={() => handleCancel()}>Cancel</button>
        </div>
      </div>
    </>
  )
}

export default CreateBorrowing