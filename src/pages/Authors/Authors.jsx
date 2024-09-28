import services from '../../services'
import { useEffect, useRef, useState } from 'react';
import Table from '../../components/Table';
import '../Pages.styles.css';
import Main from '../../layouts/Main';
import { useNavigate } from 'react-router-dom';

function Authors() {
  const [authors, setAuthors] = useState([]);

  const navigate = useNavigate();

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

  const handleEdit = (id) => {
    navigate(`/authors/${id}`);
  }

  return (
    <Main>
      <div className='page'>
        <Table 
          title={"Author Records"}
          columns={["Name", "Date of Birth", "Country"]}
          data={authors}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
        <button className='create' onClick={() => navigate('/authors/new')}>New Author</button>
      </div>      
    </Main>
  )
}

export default Authors;