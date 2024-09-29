import { useState, useEffect } from "react";
import services from "../../services";
import { useNavigate, useParams } from "react-router-dom";
import { useModal } from "../../context/ModalContext/ModalContext";

function EditBorrowing() {
  const [selectedBorrowing, setSelectedBorrowing] = useState([]);
  const [borrowing, setBorrowing] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();
  const modal = useModal();

  useEffect(() => {
    fetchBorrowing();
  },[])

  const fetchBorrowing = async () => {
    try {
      const response = await services.borrowingService.find(id);
      setSelectedBorrowing(response.data);
    }catch(error) {
      console.log(error);
    }
  }

  const handleChange = (e) => setBorrowing({
    borrowerName: selectedBorrowing.borrowerName,
    borrowingDate: selectedBorrowing.borrowingDate,
    [e.target.name]: e.target.value,
  });

  const handleSave = async () => {
    try {
      await services.borrowingService.update(id, borrowing);
      modal.alert({
        message: "Borrowing information updated successfuly!", 
        status: "success",
        onClose: () => navigate("/borrowings")
      });
    } catch (error) {
      modal.alert({
        message: "Borrowing update failed due to incorrect/insufficient information. Please, try again.", 
        status: "fail"
      });
    }
  }

  const handleCancel = () => {
    navigate('/borrowings');
  }
  
  return (
    <div className="form">
      <h3>Edit Borrowing</h3>
      <div className='add-item'>
        <div className='field'>
          <label>Borrower Name:</label>
          <input name="borrowerName" type="text" disabled={true} defaultValue={selectedBorrowing.borrowerName} />
        </div>
        <div className='field'>
          <label>Date Borrowed:</label>
          <input name='borrowingDate' type="date" disabled={true} defaultValue={selectedBorrowing.borrowingDate} />
        </div>
        <div className='field'>
          <label>Date Returned:</label>
          <input name='returnDate' type="date" defaultValue={selectedBorrowing.returnDate} onChange={handleChange} />
        </div>
        <div className='btn-container'>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default EditBorrowing;