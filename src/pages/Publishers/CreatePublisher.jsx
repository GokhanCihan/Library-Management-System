import { useState } from "react"
import { useNavigate } from "react-router-dom";
import services from "../../services";
import { useModal } from "../../context/ModalContext/ModalContext";

function CreatePublisher() {
  const [publisher, setPublisher] = useState("");

  const navigate = useNavigate();
  const modal = useModal();

  const handleChange = (e) => setPublisher({...publisher, [e.target.name]: e.target.value});

  const handleSave = async (newPublisher) => {
    try {
      await services.publisherService.create(newPublisher);
      modal.alert({
        message: "Publisher record created successfuly!", 
        status: "success",
        onClose: () => navigate("/publishers")
      });
    }catch(error) {
      modal.alert({
        message: "Publisher save failed due to incorrect/insufficient information. Please, try again.", 
        status: "fail"
      });
    }
  }

  const handleCancel = () => {
    navigate('/publishers');
  }

  return (
    <div className="form">
      <h3>New Publisher</h3>
      <div className='add-item'>
        <div className='field'>
          <label>Name</label>
          <input onChange={handleChange} name='name' type="text" />
        </div>
        <div className='field'>
          <label>Establishment Year</label>
          <input onChange={handleChange} name='establishmentYear' type="text" />
        </div>
        <div className='field'>
          <label>Address</label>
          <textarea onChange={handleChange} name='address' type="text" />
        </div>
        <div className='btn-container'>
          <button onClick={() => handleSave(publisher)}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default CreatePublisher