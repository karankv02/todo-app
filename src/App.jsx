import { useState ,useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import "./App.css"
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";



function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)
  useEffect(() => {
    let todoString  = localStorage.getItem("todos")
    if(todoString){

      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  
  const saveToLS = (params) => { 
    localStorage.setItem("todos", JSON.stringify(todos))
   }
  const handleEdit = (e,id) =>{
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id !== id
    })
    
    setTodos(newTodos);
    saveToLS();
  }
  const handleDelete = (e,id) =>{
    
    let newTodos = todos.filter(item=>{
      return item.id !== id
    })
    
    setTodos(newTodos);
    saveToLS();
  }
  const handleAdd = () =>{
    setTodos([...todos, {id: uuidv4(),todo, isCompleted : false}])
    setTodo("")
    saveToLS();
  }
  const handleChange = (e) =>{
    setTodo(e.target.value)
  }
  const handleCheckbox = (e) =>{   
    let id = e.target.name
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted=!newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();

  }
  const toggleFinished = (e) => { 
      setShowFinished(!showFinished)
   }

  return (
    <>
      <Navbar/>
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-200  min-h-[80vh] md:w-1/2">  
          <h1 className='text-center font-bold text-xl'>iTask - Manage your tasks at one place</h1> 
          <div className="addtodo my-5 flex flex-col gap-3 ">
            <h2 className='text-lg font-bold'>Add a todo</h2>
            <input type="text" onChange={handleChange} value={todo} className='rounded-lg px-2' />
            <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md cursor-pointer '>Save</button>
          </div>  
          <input type="checkbox" onChange={toggleFinished} name="" checked={showFinished}  id="" /> Show finished
          <h2 className='text-lg font-bold'>your todos</h2>  
      <div className="todos  ">
        {todos.length ===0 && <div className='m-5 text-wrap'> No Todo's to display</div>}
        {todos.map(item=>{
          

          return (showFinished || !item.isCompleted)&& <div key={item.id} className="todo bg-violet-50 flex  justify-between my-2 py-3 rounded-md">
            <div className='flex gap-4 todo-txt '>

            <input onChange={handleCheckbox} type="checkbox" name={item.id} checked={todo.isCompleted} id="" />
            <div  className= {item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
            <div className="buttons flex h-full">

            <button onClick={(e)=>handleEdit(e,item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1 ' ><FaEdit /></button>
            <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1 '><MdDelete/></button>
            </div>
        </div>
        
        })}
      </div>
      </div>

    </>
  )
}

export default App
