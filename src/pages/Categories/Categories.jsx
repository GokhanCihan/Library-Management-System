import services from '../../services'
import { useEffect, useState } from 'react';
import Table from '../../components/Table';
import Main from '../../layouts/Main';
import '../Pages.styles.css';
import { useNavigate } from 'react-router-dom';
import { useModal } from "../../context/ModalContext/ModalContext";

function Categories() {
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  const modal = useModal();

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
      modal.alert({
        message: "Category record removed!", 
        status: "success",
      });
    }catch(error) {
      modal.alert({
        message: "Category removal failed!", 
        status: "fail"
      });
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
       <button className="create" onClick={() => navigate('/categories/new')}>New Category</button>
      </div>
    </Main>
  )
}

export default Categories;