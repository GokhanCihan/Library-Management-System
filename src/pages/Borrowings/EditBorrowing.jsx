import { useState, useEffect } from "react";
import services from "../../services";

function EditBorrowing({setIsEditing, selectedId, handleCancel, fetchBorrowings}) {

  const [selectedBorrowing, setSelectedBorrowing] = useState([]);
  const [borrowing, setBorrowing] = useState([]);

  useEffect(() => {
    fetchBorrowing();
  },[])

  const fetchBorrowing = async () => {
    try {
      const response = await services.borrowingService.find(selectedId);
      setSelectedBorrowing(response.data);
    }catch(error) {
      console.log(error);
    }
  }

  const handleSave = async () => {
    try {
      await services.borrowingService.update(selectedId, borrowing);
      fetchBorrowings();
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (e) => setBorrowing({
    borrowerName: selectedBorrowing.borrowerName,
    borrowingDate: selectedBorrowing.borrowingDate,
    [e.target.name]: e.target.value,
  });
  
  return (
    <>
      <h3>Edit Borrowing Record</h3>
      <div className='add-item'>
        <div className='field'>
          <label>Borrower Name:</label>
          <input name="borrowerName" type="text" disabled={true} value={selectedBorrowing.borrowerName} />
        </div>
        <div className='field'>
          <label>Date Borrowed:</label>
          <input name='borrowingDate' type="date" disabled={true} value={selectedBorrowing.borrowingDate} />
        </div>
        <div className='field'>
          <label>Date Returned:</label>
          <input name='returnDate' type="date" value={selectedBorrowing.returnDate} onChange={handleChange} />
        </div>
        <div className='btn-container'>
          <button onClick={handleSave}>Save</button>
          <button onClick={() => handleCancel()}>Cancel</button>
        </div>
      </div>
    </>
  )
}

export default EditBorrowing;