import { useState, useEffect } from "react";
import services from "../../services";
import Table from "../../components/Table";
import Main from "../../layouts/Main";
import './../Pages.styles.css'
import { useNavigate } from "react-router-dom";

function Publishers() {
  const [publishers, setPublishers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchPublisherList();
  }, [])

  const fetchPublisherList = async () => {
    try {
      const response = await services.publisherService.findAll();
      setPublishers(response.data);
    }catch(error) {
      console.log(error);
    }
  }

  const handleDelete = async (id) => {
    try {
      await services.publisherService.remove(id);
      fetchPublisherList();
    }catch(error) {
      console.log(error);
    }
  }

  const handleEdit = (id) => {
    navigate(`/publishers/${id}`);
  }

  return (
    <Main>
      <div className='page'>
        <Table 
          title={"Publisher Records"}
          columns={["Name", "Establisment Year", "Address"]}
          data={publishers}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      <button className="create" onClick={() => navigate('/publishers/new')}>New Publisher</button>
      </div>
    </Main>
  )
}

export default Publishers;