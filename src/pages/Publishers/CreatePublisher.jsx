import { useState } from "react"

function CreatePublisher({handleSubmit, handleCancel}) {
  const [publisher, setPublisher] = useState([
    {
      id: 0,
      name: "",
      establishmentYear: 0,
      address: ""
    }
  ]);

  const handleCreate = () => handleSubmit(publisher);

  const handleChange = (e) => setPublisher({...publisher, [e.target.name]: e.target.value});

  return (
    <>
      <h3>New Publisher Record</h3>
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
          <button onClick={handleCreate}>Create</button>
          <button onClick={() => handleCancel()}>Cancel</button>
        </div>
      </div>
    </>
  )
}

export default CreatePublisher