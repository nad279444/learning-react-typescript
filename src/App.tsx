import React ,{useCallback,useEffect,useState,useRef}from "react";

import "./App.css";

const Heading = ({ title }: { title: string }) => <h2>{title}</h2>;
const Box: React.FunctionComponent = ({children}) => (
  <div>
    {children}
  </div>

)

const List: React.FunctionComponent<{
 items: string[];
 onClick?: (item : string) => void
 }> = ({ items,onClick }) => (
  <ul>
    {items.map((item, index) => (
      <li onClick = {() => onClick?.(item)} key={index}>{item}</li>
    ))}
  </ul>

 
);

interface Payload  {
  text: string
}

function App() {
  const onListClick = useCallback((item:string) => {
    alert(item)
  },[])

  useEffect(() => {
    fetch('./data.json')
    .then(res => res.json())
    .then(data => {
      setpayload(data)
    })
  },[])

  const newTodoRef = useRef<HTMLInputElement>(null)

  const onAddTodo = useCallback(() => {
    if(newTodoRef.current){
      dispatch({
        type:"ADD",
        text: newTodoRef.current.value
      })
      newTodoRef.current.value= ""
    }
    
  },[])

  const[todos,dispatch] = React.useReducer((state: Todo[],action: ActionType) => {
    switch(action.type){
      case "ADD": 
      return [
        ...state,
        {
          id: state.length,
          done: false,
          text: action.type,
        }
      ]
      case "REMOVE":
        return state.filter(({id}) => id !== action.ID)
      default:
        throw new Error()
    }
  },
    []
  )
  

  const [payload,setpayload] = useState< Payload  | null> (null)
  return (
    <div>
      <Heading title="introduction" />
      <List items={["one", "two", "three"]} onClick = {onListClick} />
      <Box>{JSON.stringify(payload)}</Box>
      <Heading title = "Todos" />
        {todos.map((todo) => (
          <div key = {todo.id}>
              {todo.text}
              <button onClick = {() => dispatch({
                type: "REMOVE",
                ID:todo.id 
              })}>REMOVEe</button>
          </div>
        ))}
        <div>
          <input type='text' ref={newTodoRef}/>
          <button onClick = {onAddTodo}> Add Todo </button>
        </div>
    </div>
  );
}

type ActionType = 
|{type: 'ADD',text: string}
|{type: 'REMOVE',ID: number}



interface Todo {
  id: number,
  done: boolean,
  text: string,
}


export default App;
