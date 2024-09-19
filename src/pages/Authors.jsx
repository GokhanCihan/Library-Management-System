import services from '../services'
import { useEffect, useRef, useState } from 'react';
import './Pages.styles.css';

function Authors() {
  const [authors, setAuthors] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  useEffect(() => {
    fetchAuthorList();
  }, [])

  const fetchAuthorList = async () => {
    try {
      const response = await services.authorService.findAll();
      setAuthors(response.data)
    }catch(error) {
      console.log(error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await services.authorService.remove(id);
      fetchAuthorList();
    }catch(error) {
      console.log(error);
    }
  }

  const handleSubmit = async (newAuthor) => {
    try {
      await services.authorService.create(newAuthor)
      fetchAuthorList();
    }catch(error) {
      console.log(error.response.data);
    }
  }

  const handleEdit = (id) => {
    setIsEditing(true);
    setSelectedId(id);
  }

  return (
    <div className='page'>
      <h2>Author Page</h2>
      <div className='page-list'>
        <h3>Authors</h3>
        <div className='page-list-header'>
          <span>ID</span>
          <span>Name</span>
          <span>Date of Birth</span>
          <span>Country</span>
        </div>
        {authors.map((item) =>  (
          <div key={item.id} className='page-list-info'>
            <span>{item.id}</span>
            <span>{item.name}</span>
            <span>{item.birthDate}</span>
            <span>{item.country}</span>
            <button onClick={() => handleDelete(item.id)}>delete</button>
            <button onClick={() => handleEdit(item.id)}>edit</button>
          </div>
        ))}
      </div>
      {isEditing && 
      <EditAuthor 
        setIsEditing={setIsEditing}
        selectedId={selectedId}
        fetchAuthorList={fetchAuthorList}
      />}
      <NewAuthor handleSubmit={handleSubmit} />
    </div>
  )
}

function NewAuthor({handleSubmit}) {
  const [author, setAuthor] = useState({
    name: "",
    birthDate: "",
    country: ""
  });

  const handleClick = () => handleSubmit(author);

  const handleChange = (e) => setAuthor({...author, [e.target.name]: e.target.value});
  
  return (
    <>
      <h3>New Author Record</h3>
      <div className='record-item'>
        <div className='field'>
          <label>Name:</label>
          <input onChange={handleChange} value={author.name} name="name" type="text" />
        </div>
        <div className='field'>
          <label>Birth Date:</label>
          <input onChange={handleChange} value={author.birthDate} name='birthDate' type="date" />
        </div>
        <div className='field'>
          <label>Country</label>
          <input onChange={handleChange} value={author.country} name='country' type="text" />
        </div>
        <button onClick={handleClick}>Create</button>
      </div>
    </>
  )
}

function EditAuthor({setIsEditing, selectedId, fetchAuthorList}) {
  const [author, setAuthor] = useState({
    name: "",
    birthDate: "",
    country: ""
  });

  useEffect(() => {
    fetchAuthor();
  },[selectedId])

  const fetchAuthor = async () => {
    try {
      const response = await services.authorService.find(selectedId);
      setAuthor(response.data)
    }catch(error) {
      console.log(error)
    }
  }

  const handleSave = async () => {
    try {
      await services.authorService.update(selectedId, author);
      fetchAuthorList();
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (e) => {
    setAuthor({...author, [e.target.name]: e.target.value})
  }
  
  return (
    <>
      <h3>Change Author Record</h3>
      <div className='record-item'>
        <div className='field'>
          <label>Name:</label>
          <input onChange={handleChange} value={author.name} name="name" type="text" />
        </div>
        <div className='field'>
          <label>Birth Date:</label>
          <input onChange={handleChange} value={author.birthDate} name='birthDate' type="date" />
        </div>
        <div className='field'>
          <label>Country</label>
          <input onChange={handleChange} value={author.country} name='country' type="text" />
        </div>
        <button onClick={handleSave}>Save</button>
      </div>
    </>
  )
}

export default Authors;