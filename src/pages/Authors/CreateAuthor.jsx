import { useState } from "react";
import { useNavigate } from "react-router-dom";
import services from "../../services";
import { useModal } from "../../context/ModalContext/ModalContext";

function CreateAuthor() {
  const [author, setAuthor] = useState({
    name: "",
    birthDate: "",
    country: ""
  });

  const navigate = useNavigate();
  const modal = useModal();
  
  const handleChange = (e) => setAuthor({...author, [e.target.name]: e.target.value});

  const handleSave = async (newAuthor) => {
    try {
      await services.authorService.create(newAuthor);
      modal.alert({
        message: "Author created successfuly!", 
        status: "success",
        onClose: () => navigate("/authors")
      });
    }catch(error) {
      modal.alert({
        message: "Author save failed due to incorrect/insufficient information. Please, try again.", 
        status: "fail"
      });
    }
  }

  const handleCancel = () => {
    navigate('/authors');
  }
  
  return (
    <>
      <h3>New Author</h3>
      <div className='add-item'>
        <div className='field'>
          <label>Name:</label>
          <input onChange={handleChange} value={author.name} name="name" type="text" />
        </div>
        <div className='field'>
          <label>Birth Date:</label>
          <input onChange={handleChange} value={author.birthDate} name='birthDate' type="date" />
        </div>
        <div className='field'>
          <label>Country</label>
          <input onChange={handleChange} value={author.country} name='country' type="text" />
        </div>
        <div className='btn-container'>
          <button onClick={() => handleSave(author)}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </>
  )
}

export default CreateAuthor