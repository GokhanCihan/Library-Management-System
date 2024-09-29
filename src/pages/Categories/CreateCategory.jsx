import { useState } from "react";
import { useNavigate } from "react-router-dom";
import services from "../../services";
import { useModal } from "../../context/ModalContext/ModalContext";

function CreateCategory() {
  const [category, setCategory] = useState("");

  const navigate = useNavigate();
  const modal = useModal();

  const handleChange = (e) => setCategory({...category, [e.target.name]: e.target.value});

  const handleSave = async (newCategory) => {
    try {
      await services.categoryService.create(newCategory);
      modal.alert({
        message: "Category record created successfuly!", 
        status: "success",
        onClose: () => navigate("/categories")
      });
    }catch(error) {
      modal.alert({
        message: "Category save failed due to incorrect/insufficient information. Please, try again.", 
        status: "fail"
      });
    }
  }

  const handleCancel = () => {
    navigate('/categories');
  }
  
  return (
    <div className="form">
      <h3>New Category</h3>
      <div className='add-item'>
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
    </div>
  )
}

export default CreateCategory