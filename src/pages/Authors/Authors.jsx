import services from '../../services'
import { useEffect, useRef, useState } from 'react';
import Table from '../../components/Table';
import '../Pages.styles.css';
import Main from '../../layouts/Main';
import { useNavigate } from 'react-router-dom';
import { useModal } from "../../context/ModalContext/ModalContext";

function Authors() {
  const [authors, setAuthors] = useState([]);

  const navigate = useNavigate();
  const modal = useModal();

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
      fetchAuthorList()
      modal.alert({
        message: "Author record removed!", 
        status: "success",
      });
    }catch(error) {
      modal.alert({
        message: "Author removal failed!", 
        status: "fail"
      });
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