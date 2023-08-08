import {Card, Tree,Input} from '@arco-design/web-react';
import {useImperativeHandle,forwardRef, useRef, useState, useMemo} from 'react';

export default function day1(){
  const ref=useRef(null)
  const [num,setNum]=useState(1)
  const [num1,setNum1]=useState("ALL")
  const [a,setA]=useState(["a1","b","c1","d1","e","f"])
  const numbol=useMemo(()=> {
       switch (num1) {
        case "ALL":
          return a
          break;
        case "first": return a.filter((e)=>{
          
           return  e.indexOf("1")===1
          })
        default: 
          return ["kong"]
          break;
       }

  }, [num1,a])

return <>
<Card>
  <button onClick={()=>{setNum1("first")}}>FIRST</button>
  <button onClick={()=>{setNum1("ALL")}}>ALL</button>
     {/* {numbol.forEach(element => {
       <h1 key={element}>{element}</h1>
     })} */}
   <ul>
    {numbol.map(element=>
      <li key={element}>{element}</li>)}
   </ul>
   </Card>
  </>
}
