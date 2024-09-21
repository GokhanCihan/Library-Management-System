import { useState, useEffect } from "react";
import services from "../../services";

function EditPublisher({setIsEditing, selectedId, fetchPublisherList, handleCancel}) {
  const [publisher, setPublisher] = useState(
    {
      id: "",
      name: "",
      establishmentYear: "",
      address: ""
    }
  );

  useEffect(() => {
    fetchPublisher();
  },[selectedId])

  const fetchPublisher = async () => {
    try {
      const response = await services.publisherService.find(selectedId);
      setPublisher(response.data)
    }catch(error) {
      console.log(error)
    }
  }

  const handleSave = async () => {
    try {
      await services.publisherService.update(selectedId, publisher);
      fetchPublisherList();
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (e) => {
    setPublisher({...publisher, [e.target.name]: e.target.value})
  }
  
  return (
    <>
      <h3>Edit Publisher Record</h3>
      <div className='add-item'>
        <div className='field'>
          <label>ID:</label>
          <input onChange={handleChange} value={publisher.id} name="id" type="text" />
        </div>
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
          <button onClick={() => handleCancel()}>Cancel</button>
        </div>
      </div>
    </>
  )
}

export default EditPublisher;