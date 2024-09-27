import services from '../../services'
import { useEffect, useState } from 'react';
import Table from '../../components/Table';
import EditCategory from './EditCategory';
import CreateCategory from './CreateCategory';
import Main from '../../layouts/Main';
import '../Pages.styles.css';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  useEffect(() => {
    fetchCategoryList();
  }, [])

  const fetchCategoryList = async () => {
    try {
      const response = await services.categoryService.findAll();
      setCategories(response.data)
    }catch(error) {
      console.log(error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await services.categoryService.remove(id);
      fetchCategoryList();
    }catch(error) {
      console.log(error);
    }
  }

  const handleSubmit = async (newCategory) => {
    try {
      await services.categoryService.create(newCategory);
      setIsCreating(false);
      fetchCategoryList();
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
          title={"Category Records"}
          columns={["Name", "Description"]}
          data={categories}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
        {isEditing && 
          <EditCategory 
            setIsEditing={setIsEditing}
            selectedId={selectedId}
            fetchCategoryList={fetchCategoryList}
            handleCancel={handleCancel}
          />}
        {isCreating && 
          <CreateCategory 
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
          />}
        {(!isCreating && !isEditing) && <button onClick={(() => setIsCreating(true))}>Add New Category</button>}
      </div>
    </Main>
  )
}

export default Categories;