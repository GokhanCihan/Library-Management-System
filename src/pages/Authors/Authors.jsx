import services from '../../services'
import { useEffect, useRef, useState } from 'react';
import Table from '../../components/Table';
import '../Pages.styles.css';
import EditAuthor from './EditAuthor';
import CreateAuthor from './CreateAuthor';
import Main from '../../layouts/Main';

function Authors() {
  const [authors, setAuthors] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
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
      await services.authorService.create(newAuthor);
      setIsCreating(false);
      fetchAuthorList();
    }catch(error) {
      console.log(error.response.data);
    }
  }

  const handleEdit = (id) => {
    setIsEditing(true);
    setSelectedId(id);
  }

  const handleCancel = () => {
    setIsCreating(false);
    setIsEditing(false);
  }

  return (
    <Main>
      <div className='page'>
        <Table 
          title={"Author Records"}
          columns={["Name", "Date of Birth", "Country"]}
          data={authors}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
        {isEditing && 
        <EditAuthor 
          setIsEditing={setIsEditing}
          selectedId={selectedId}
          fetchAuthorList={fetchAuthorList}
          handleCancel={handleCancel}
        />}
        {isCreating && 
        <CreateAuthor 
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        />}
        {(!isCreating && !isEditing) && <button onClick={(() => setIsCreating(true))}>Add New Author</button>}
      </div>      
    </Main>
  )
}

export default Authors;