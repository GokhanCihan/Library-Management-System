import { useState, useEffect } from "react";
import services from "../../services";
import { useNavigate, useParams } from "react-router-dom";
import { useModal } from "../../context/ModalContext/ModalContext";

function EditAuthor() {
  const [author, setAuthor] = useState();

  const { id } = useParams();
  const navigate = useNavigate();
  const modal = useModal();

  useEffect(() => {
    fetchAuthor();
  },[])

  const fetchAuthor = async () => {
    try {
      const response = await services.authorService.find(id);
      setAuthor(response.data)
    }catch(error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    setAuthor({...author, [e.target.name]: e.target.value})
  }

  const handleSave = async () => {
    try {
      await services.authorService.update(id, author);
      modal.alert({
        message: "Author information updated successfuly!", 
        status: "success",
        onClose: () => navigate("/authors")
      });
    } catch (error) {
      modal.alert({
        message: "Author update failed due to incorrect/insufficient information. Please, try again.", 
        status: "fail"
      });
    }
  }

  const handleCancel = () => {
    navigate('/authors');
  }
  
  return (
    <div className="form">
      <h3>Edit Author</h3>
      <div className='add-item'>
        <div className='field'>
          <label>Name:</label>
          <input 
            name="name"
            type="text"
            onChange={handleChange} 
            value={author?.name ? author.name : "Loading"} 
          />
        </div>
        <div className='field'>
          <label>Birth Date:</label>
          <input 
            name='birthDate' 
            type="date"
            onChange={handleChange} 
            value={author?.birthDate ? author.birthDate : "Loading"} 
          />
        </div>
        <div className='field'>
          <label>Country</label>
          <input 
            name='country' 
            type="text" 
            onChange={handleChange} 
            defaultValue={"Loading"}
            value={author?.country ? author.country : "Loading"} 
          />
        </div>
          <div className='btn-container'>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
      </div>
    </div>
  )
}

export default EditAuthor;