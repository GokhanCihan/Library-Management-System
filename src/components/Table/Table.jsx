import './Table.styles.css'

function Table({title, columns, data, handleDelete, handleEdit}) {
  
  return (
    <div className='table'>
      <div className='header'>
        <h3>{title}</h3>
        <div className='header-row'>
          {columns.map(item => <span>{item}</span>)}
        </div>
      </div>
      <div className='row-container'>
        {data.map((item) =>  (
          <div key={item.id} className='row'>
            {Object.values(item).map((value) => {
              return (
                <span className="cell">{value}</span>
              )
            })}
            <button onClick={() => handleDelete(item.id)}>delete</button>
            <button onClick={() => handleEdit(item.id)}>edit</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Table