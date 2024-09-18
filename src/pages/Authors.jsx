import services from '../services'
import { useEffect, useState } from 'react';
import './Pages.styles.css';

function Authors() {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    services.authorService.findAll()
    .then(res => setAuthors(res.data))
    .catch((error) => console.log(error));
  }, [])

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
          <div className='page-list-info'>
            <span>{item.id}</span>
            <span>{item.name}</span>
            <span>{item.birthDate}</span>
            <span>{item.country}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Authors;