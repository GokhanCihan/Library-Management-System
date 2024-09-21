import { useState, useEffect } from "react";
import services from "../../services";

function EditCategory({setIsEditing, selectedId, fetchCategoryList, handleCancel}) {
  const [category, setCategory] = useState({
    name: "",
    birthDate: "",
    country: ""
  });

  useEffect(() => {
    fetchCategory();
  },[selectedId])

  const fetchCategory = async () => {
    try {
      const response = await services.categoryService.find(selectedId);
      setCategory(response.data)
    }catch(error) {
      console.log(error)
    }
  }

  const handleSave = async () => {
    try {
      await services.categoryService.update(selectedId, category);
      fetchCategoryList();
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (e) => {
    setCategory({...category, [e.target.name]: e.target.value})
  }
  
  return (
    <>
      <h3>Change Category Record</h3>
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
          <button onClick={handleSave}>Save</button>
          <button onClick={() => handleCancel()}>Cancel</button>
        </div>
      </div>
    </>
  )
}

export default EditCategory;