import { useState, useEffect } from "react";
import services from "../../services";

function EditAuthor({setIsEditing, selectedId, fetchAuthorList, handleCancel}) {
  const [author, setAuthor] = useState({
    name: "",
    birthDate: "",
    country: ""
  });

  useEffect(() => {
    fetchAuthor();
  },[selectedId])

  const fetchAuthor = async () => {
    try {
      const response = await services.authorService.find(selectedId);
      setAuthor(response.data)
    }catch(error) {
      console.log(error)
    }
  }

  const handleSave = async () => {
    try {
      await services.authorService.update(selectedId, author);
      fetchAuthorList();
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (e) => {
    setAuthor({...author, [e.target.name]: e.target.value})
  }
  
  return (
    <>
      <h3>Change Author Record</h3>
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
            <button onClick={handleSave}>Save</button>
            <button onClick={() => handleCancel()}>Cancel</button>
          </div>
      </div>
    </>
  )
}

export default EditAuthor;