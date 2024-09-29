import { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useEffect } from "react";
import services from "../../services";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/ModalContext/ModalContext";

function CreateBook() {
  const [book, setBook] = useState("");

  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [publishers, setPublishers] = useState([]);

  const navigate = useNavigate();
  const modal = useModal();
  
  useEffect(() => {
    fetchAuthors();
    fetchCategories();
    fetchPublishers();
  },[])

  const fetchAuthors = async () => {
    try {
      const response = await services.authorService.findAll();
      setAuthors(response.data)
    }catch(error) {
      console.log(error)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await services.categoryService.findAll();
      setCategories(response.data);
    }catch(error) {
      console.log(error)
    }
  }

  const fetchPublishers = async () => {
    try {
      const response = await services.publisherService.findAll();
      setPublishers(response.data)
    }catch(error) {
      console.log(error)
    }
  }

  const handleChange = (e) => setBook({...book, [e.target.name]: e.target.value});

  const handleChangeAuthor = (value) => setBook({...book, author: value});

  const handleChangeCategories = (value) => setBook({...book, categories: value});

  const handleChangePublisher = (value) => setBook({...book, publisher: value});

  const handleSave = async (newBook) => {
    try {
      await services.bookService.create(newBook);
      modal.alert({
        message: "Book record created successfuly!", 
        status: "success",
        onClose: () => navigate("/books")
      });
    }catch(error) {
      modal.alert({
        message: "Book save failed due to incorrect/insufficient information. Please, try again.", 
        status: "fail"
      });
    }
  }

  const handleCancel = () => {
    navigate('/books');
  }
  
  return (
    <>
      <h3>New Book</h3>
      <div className='add-item'>
        <div className='field'>
          <label>Name:</label>
          <input name="name" type="text" value={book.name} onChange={handleChange} />
        </div>
        <div className='field'>
          <label>Publication Year:</label>
          <input name='publicationYear' type="text" value={book.publicationYear} onChange={handleChange} />
        </div>
          <Autocomplete
            options={authors}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label="select author" placeholder="authors" />}
            onChange={(event, value, reason) => handleChangeAuthor(value)}
          />
          <Autocomplete
            multiple
            options={categories}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (<TextField {...params} label="select categories" placeholder="categories" />)}
            onChange={(event, value, reason ) => handleChangeCategories(value)}
          />
          <Autocomplete 
            options={publishers}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label="select publisher" placeholder="publishers" />}
            onChange={(event, value, reason) => handleChangePublisher(value)}
          />
        <div className='field'>
          <label>Stock</label>
          <input name='stock' type="text" value={book.stock} onChange={handleChange} />
        </div>
        <div className='btn-container'>
          <button onClick={() => handleSave(book)}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </>
  )
}

export default CreateBook