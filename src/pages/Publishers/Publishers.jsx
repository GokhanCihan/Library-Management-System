import { useState, useEffect } from "react";
import services from "../../services";
import Table from "../../components/Table";
import Main from "../../layouts/Main";
import './../Pages.styles.css'
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/ModalContext/ModalContext";

function Publishers() {
  const [publishers, setPublishers] = useState([]);

  const navigate = useNavigate();
  const modal = useModal();

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
      modal.alert({
        message: "Publisher record removed!", 
        status: "success",
      });
    }catch(error) {
      modal.alert({
        message: "Publisher removal failed!", 
        status: "fail"
      });
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