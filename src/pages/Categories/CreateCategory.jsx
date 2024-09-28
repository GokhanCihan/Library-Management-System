import { useState } from "react";
import { useNavigate } from "react-router-dom";
import services from "../../services";

function CreateCategory() {
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => setCategory({...category, [e.target.name]: e.target.value});

  const handleSave = async (newCategory) => {
    try {
      await services.categoryService.create(newCategory);
      navigate('/categories');
    }catch(error) {
      console.log(error);
    }
  }

  const handleCancel = () => {
    navigate('/categories');
  }
  
  return (
    <>
      <h3>New Category</h3>
      <div className='add-item'>
        <div className='field'>
          <label>ID:</label>
          <input onChange={handleChange} name="id" type="text" />
        </div>
        <div className='field'>
          <label>Name:</label>
          <input onChange={handleChange} name='name' type="text" />
        </div>
        <div className='field'>
          <label>Description</label>
          <textarea onChange={handleChange} name='description' type="text" />
        </div>
        <div className='btn-container'>
          <button onClick={() => handleSave(category)}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </>
  )
}

export default CreateCategory