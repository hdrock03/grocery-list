import { useEffect, useState } from 'react';
import './App.css';
import List from './components/List';
// import Output from './components/Output';
import Alert from './components/Alert';

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if(list){
    return JSON.parse(localStorage.getItem('list'))
  }
  else{
    return []
  }
}


function App() {
  
 const [name, setName] = useState('')
//  const [list, setList] = useState([]) yeh h use kr rhe qki local storage use kr rhe hai
const [list, setList] = useState(getLocalStorage())
 const [isEditing, setIsEditing] = useState(false)
 const [editID, setEditID] = useState(null)
 const [alert, setAlert] = useState({show: false, msg:'', type:''}) //yaha pe object pass kiye hai aur usko kuch property de diye hai

  const handleSubmit= (e) => {
    e.preventDefault()
    //yaha yeh sochna tha ki input dalne ke baad ka kya conditions ho skta h
    if(!name) { // agr kuch name nhi hai to alert hoga
      // Display alert
      // setAlert({show:true,msg:'please enter value',type:'danger'}) // yeh slow hoga qki bar baar call ho rha hai to function me daal do isko
      showAlert(true,'danger','please enter the value')
    }

    else if (name && isEditing){  // if name hai then isEditing execute hoga 
      // deal with edit
      setList(    // list me set kiye
        list.map((item) => {  // list ko map kiye aur item pass kiye agr 
          if(item.id === editID){  // item ka id aur edit id same hua to
            return {...item, title: name} // item ko spread kr do aur naya title set kr do
          }
          return item  // agr same nh hua to item return kr do
        })
      )
      setName(''); // input field ko empty kr do
      setEditID(null); // id ko null kr do
      setIsEditing(false) // is editing wala button ko deactivate kr do
      showAlert(true, 'success', 'value changed')
    }
    else {
      showAlert(true,'success', 'item added to the list')
      const newItem = {id:new Date().getTime().toString(), title : name} // name ko newItem me save krenge jisme id aur title assign hga
      setList([...list,newItem]) // list se previous item lenge aur usme newItem save kr denge
      setName('')   // iske baad input field apne aap empty ho jayega 
      
    }
  }

  useEffect(() => {
   localStorage.setItem('list', JSON.stringify(list)) 
  },[list])

  const showAlert = (show=false, type= '', msg= '') => {
    setAlert({show, type, msg}) // this step used in ES6
  }

  const clearList = () => {
    showAlert(true, 'danger' , 'empty list')
    setList([])
  }

  const removeItem = (id) => {
    showAlert(true, 'danger' , 'item removed')
    setList(list.filter((item) => item.id !== id))
  }
  
  // edit button
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id) // isse new array milega jo id click kiye hai
    setIsEditing(true) // us particular item pe edit activate hga
    setEditID(id) // usko id denge jo id select hua h
    setName(specificItem.title) // input me uska title copy kr denge
  }


  return (
    
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert}/>} 
        {/* agar alert.show true hoga to Alert component render hoga
        {...alert} se alert ka sara property props ke through pass kr rhe h 
        to jab alert.js me props likhenge to uska properties likhenge */}
        <h3>Grocery bud</h3>
        <div className='form-control'>
          <input type='text' className='grocery' placeholder='e.g. eggs' value={name} onChange={(e)=> setName(e.target.value)} /> 
          {/* jab bhi input me kuch dalenge aur hmko wo display pe chhiye to yeh likhna hoga pur */}
          <button type='submit' className='submit-btn' >
            {isEditing ? 'edit' : 'submit'}
            {/* button ka type submit diye hai to jab isEditing true hoga to edit button milega else submit buttton */}
          </button>
        </div>
      </form>
    {list.length > 0 && (
      <div className='grocery-container'>
      <List items={list} removeItem={removeItem} list={list} editItem={editItem}/>
      <button className='clear-btn' onClick={clearList}>clear items</button>
    </div>
    )}
    </section>

   
  );
}

export default App;
