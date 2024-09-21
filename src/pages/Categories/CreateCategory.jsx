import { useState } from "react";

function CreateCategory({handleSubmit, handleCancel}) {
  const [category, setCategory] = useState({
    name: "",
    birthDate: "",
    country: ""
  });

  const handleCreate = () => handleSubmit(category);

  const handleChange = (e) => setCategory({...category, [e.target.name]: e.target.value});
  
  return (
    <>
      <h3>New Category Record</h3>
      <div className='add-item'>
        <div className='field'>
          <label>ID:</label>
          <input onChange={handleChange} value={category.id} name="id" type="text" />
        </div>
        <div className='field'>
          <label>Name:</label>
          <input onChange={handleChange} value={category.name} name='name' type="text" />
        </div>
        <div className='field'>
          <label>Description</label>
          <textarea onChange={handleChange} value={category.description} name='description' type="text" />
        </div>
        <div className='btn-container'>
          <button onClick={handleCreate}>Create</button>
          <button onClick={() => handleCancel()}>Cancel</button>
        </div>
      </div>
    </>
  )
}

export default CreateCategory