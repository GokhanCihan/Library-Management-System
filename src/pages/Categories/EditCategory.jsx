import { useState, useEffect } from "react";
import services from "../../services";
import { useNavigate, useParams } from "react-router-dom";
import { useModal } from "../../context/ModalContext/ModalContext";

function EditCategory() {
  const [category, setCategory] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();
  const modal = useModal();

  useEffect(() => {
    fetchCategory();
  },[])

  const fetchCategory = async () => {
    try {
      const response = await services.categoryService.find(id);
      setCategory(response.data)
    }catch(error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    setCategory({...category, [e.target.name]: e.target.value})
  }

  const handleSave = async () => {
    try {
      await services.categoryService.update(id, category);
      modal.alert({
        message: "Category information updated successfuly!", 
        status: "success",
        onClose: () => navigate("/categories")
      });
    } catch (error) {
      modal.alert({
        message: "Category update failed due to incorrect/insufficient information. Please, try again.", 
        status: "fail"
      });
    }
  }

  const handleCancel = () => {
    navigate('/categories');
  }
  
  return (
    <>
      <h3>Edit Category</h3>
      <div className='add-item'>
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
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </>
  )
}

export default EditCategory;