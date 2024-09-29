import { useState, useEffect } from "react";
import services from "../../services";
import { useNavigate, useParams } from "react-router-dom";
import { useModal } from "../../context/ModalContext/ModalContext";

function EditPublisher() {
  const [publisher, setPublisher] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();
  const modal = useModal();

  useEffect(() => {
    fetchPublisher();
  },[])

  const fetchPublisher = async () => {
    try {
      const response = await services.publisherService.find(id);
      setPublisher(response.data)
    }catch(error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    setPublisher({...publisher, [e.target.name]: e.target.value})
  }

  const handleSave = async () => {
    try {
      await services.publisherService.update(id, publisher);
      modal.alert({
        message: "Publisher information updated successfuly!", 
        status: "success",
        onClose: () => navigate("/publishers")
      });
    } catch (error) {
      modal.alert({
        message: "Publisher update failed due to incorrect/insufficient information. Please, try again.", 
        status: "fail"
      });
    }
  }

  const handleCancel = () => {
    navigate('/publishers');
  }
  
  return (
    <>
      <h3>Edit Publisher</h3>
      <div className='add-item'>
        <div className='field'>
          <label>Name</label>
          <input onChange={handleChange} value={publisher.name} name='name' type="text" />
        </div>
        <div className='field'>
          <label>Establishment Year</label>
          <input onChange={handleChange} value={publisher.establishmentYear} name='establishmentYear' type="text" />
        </div>
        <div className='field'>
          <label>Address</label>
          <textarea onChange={handleChange} value={publisher.address} name='address' type="text" />
        </div>
        <div className='btn-container'>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </>
  )
}

export default EditPublisher;