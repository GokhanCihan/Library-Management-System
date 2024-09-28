import services from '../../services'
import { useEffect, useState } from 'react';
import Table from '../../components/Table';
import Main from '../../layouts/Main';
import '../Pages.styles.css';
import { useNavigate } from 'react-router-dom';

function Categories() {
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCategoryList();
  }, [])

  const fetchCategoryList = async () => {
    try {
      const response = await services.categoryService.findAll();
      setCategories(response.data);
    }catch(error) {
      console.log(error);
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

  const handleEdit = (id) => {
    navigate(`/categories/${id}`);
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
       <button onClick={() => navigate('/categories/new')}>New Category</button>
      </div>
    </Main>
  )
}

export default Categories;