import React from 'react'
import { FaTrash, FaEdit } from 'react-icons/fa';

export default function List({items,removeItem,editItem}) {
  return (
    <div className='grocery-list'>
      {items.map((item) =>{
        const {id , title} = item
        return (
          <article key={id} className='grocery-item'>
            <p className='title'>{title}</p>
            <div className='btn-container'>
              <button type='button' className='edit-btn' onClick={()=>editItem(id)}>
                <FaEdit />
              </button>
              <button type='button' className='del-btn' onClick={()=>removeItem(id)}>
                <FaTrash />
              </button>
            </div>
          </article>
        )
      }) }
    </div>
  )
}
