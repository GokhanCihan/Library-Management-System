import { useEffect, useRef } from 'react'
import './Table.styles.css'

function Table({title, columns, data, handleDelete, handleEdit}) {
  const headerRef = useRef(null);
  const tableRef = useRef(null)

  useEffect(() => {
    if (headerRef.current && tableRef.current) {
      headerRef.current.style.gridTemplateColumns = `repeat(${columns.length+1}, minmax(100px, 1fr))`;
    }
  },[])
  
  console.log(data);
  return (
    <div ref={tableRef} className='table'>
      <div className='header'>
        <h3>{title}</h3>
        <div ref={headerRef} className='header-row'>
          {columns.map((column,index) => <span key={index}>{column}</span>)}
        </div>
      </div>
      <div className='row-container'>
        {data.map((item) => <Row key={item.id} handleDelete={handleDelete} handleEdit={handleEdit} rowItem={item}/>)}
      </div>
    </div>
  )
}

function Row({handleDelete, handleEdit, rowItem}) {
  const rowRef = useRef(null);

  useEffect(() => {
    if (rowRef.current) {
      rowRef.current.style.gridTemplateColumns = `repeat(${Object.keys(rowItem).length}, minmax(50px, 1fr))`;
    }
  },[])

  return (
    <div ref={rowRef} className='row'>
      {Object.keys(rowItem).map((key, index) => {
        if(key !== "id"){
          return (
            <span key={index} className={`cell ${key}`}>{rowItem[key]}</span>
          )
        } 
      })}
      <span className='btn-container'>
        <button className='del-btn' onClick={() => handleDelete(rowItem.id)}>delete</button>
        <button className='edit-btn' onClick={() => handleEdit(rowItem.id)}>edit</button>
      </span>
    </div>
  )
}

export default Table