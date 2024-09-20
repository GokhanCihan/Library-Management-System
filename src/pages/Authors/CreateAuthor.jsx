import { useState } from "react";

function CreateAuthor({handleSubmit, handleCancel}) {
  const [author, setAuthor] = useState({
    name: "",
    birthDate: "",
    country: ""
  });

  const handleCreate = () => handleSubmit(author);

  const handleChange = (e) => setAuthor({...author, [e.target.name]: e.target.value});
  
  return (
    <>
      <h3>New Author Record</h3>
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
          <button onClick={handleCreate}>Create</button>
          <button onClick={() => handleCancel()}>Cancel</button>
        </div>
      </div>
    </>
  )
}

export default CreateAuthor