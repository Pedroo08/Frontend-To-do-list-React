import React from "react";
import './Task.css'



function Task({deletetask,obj,completetask,}){
    
    return(
        <li value={obj._id}>
            
             <span style={{textDecoration: obj.status=='complete'? 'line-through':'' }}> {obj.content} </span>
             <div className="interactions-task">
                <button className="btn-concluir btn-b" onClick={() => completetask(obj._id)} >concluir</button>
                <button type="button" className="btn-apagar  btn-b" onClick={() => deletetask(obj._id)}>Apagar</button>
             </div>
             
        </li>
    )



}

export default Task;