import { useState, useEffect } from "react";
import services from "../../services";
import Table from "../../components/Table";
import CreatePublisher from "./CreatePublisher";
import EditPublisher from "./EditPublisher";
import Main from "../../layouts/Main";
import './../Pages.styles.css'

function Publishers() {
  const [publishers, setPublishers] = useState([]);
  const [selectedId, setSelectedId] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchPublisherList();
  }, [])

  const fetchPublisherList = async () => {
    try {
      const response = await services.publisherService.findAll();
      setPublishers(response.data)
    }catch(error) {
      console.log(error)
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

  const handleSubmit = async (newPublisher) => {
    try {
      await services.publisherService.create(newPublisher);
      setIsCreating(false);
      fetchPublisherList();
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
          title={"Publisher Records"}
          columns={["Name", "Establisment Year", "Address"]}
          data={publishers}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
        {isEditing &&
          <EditPublisher
            setIsEditing={setIsEditing}
            selectedId={selectedId}
            fetchPublisherList={fetchPublisherList}
            handleCancel={handleCancel}
          />  
        }
        {isCreating &&
          <CreatePublisher
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        />}
        {(!isCreating && !isEditing) && <button onClick={(() => setIsCreating(true))}>Add New Publisher</button>}
      </div>
    </Main>
  )
}

export default Publishers;