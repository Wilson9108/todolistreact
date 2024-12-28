import {useState,useEffect} from 'react';
import './homepage.css'
export default function Homepage(){
  const [data,setData]=useState([])
  const [pendingCount,setPendingCount]=useState([])
  const [completedCount,setCompletedCount]=useState([])
  const [pendingData,setPendingData]=useState([])
  const [completedData,setCompletedData]=useState([])
  const [taskName , setTaskName]=useState("")
  const [description,setDescription]=useState("")
  const[updateDescription,setUpdateDescription]=useState("")
  const[toggleInput,setToggleInput]=useState(null)

//FETCHING ALL TODOLIST DATA
  useEffect(()=>{
  let fetchData = async ()=>{
    let response = await fetch("http://localhost:2030/api/todolist",{
      method:"get",
    })
    let data = await response.json()
    setData(data)
  }
  fetchData()
},[])

// FETCHING AND COUNTING ALL PENDING DATA
useEffect(()=>{
  let fetchPendingCount= async()=>{
  let response = await fetch("http://localhost:2030/pending/count",{
    method:"get"
  })
  let data = await response.json()
  setPendingCount(data)
}
fetchPendingCount()
  
},[])

//FETCING ALD COUTING ALL COMPLETED DATA

useEffect(()=>{
  let fetchCompletedCount = async()=>{
    let response = await fetch("http://localhost:2030/completed/count",{
      method:"GET"
    })
    let data = await response.json()
    setCompletedCount(data)

  }
  fetchCompletedCount()
},[])

//FETCHING ALL PENDING DATA

useEffect(()=>{
  let fetchPending = async ()=>{
    let response = await fetch("http://localhost:2030/pending/data",{
      method:"Get"
    })
    let data = await response.json()
    setPendingData(data)
  }
  fetchPending()

},[])

//FETCHING ALL COMPLETED DATA
useEffect(()=>{
  let fetchCompleted = async()=>{
    let response = await fetch("http://localhost:2030/completed/data",{
      method:"GET"
    })
    let data = await  response.json()
    setCompletedData(data)
  }
  fetchCompleted()

},[])

//HANDLING SUBMIT INSERT  FORM 

  let handleSubmit= async(e)=>{
    if(!validation()){
       e.preventDefault()
    }
    let response = await fetch("http://localhost:2030/insert",{
      method:"post",
      headers:{
        'Content-Type':'Application/json'
      },
      body:JSON.stringify({taskName,description})
    })
    let data = await response.json()
    setTaskName("")
    setDescription("")
  }

  //HANDLING EDIT DATA
  // useEffect(()=>{


  let handleUpdate = async(id)=>{
    let description = document.querySelector(".update-Description")
    let updateBtn = document.querySelector(".update-btn")
    let editBtn = document.querySelector(".edit-btn")
    let error = document.querySelector(".description-error")
    if(description.value === ""){
      // error.classList.remove("d-none")

      return 
    }else{
      console.log("Description field is empty")
      // error.classList.add("d-none")
    }

    let response = await fetch(`http://localhost:2030/update/${id}`,{
      method:"PUT",
      headers:{
        'Content-Type':'Application/json'
      },
      body:JSON.stringify({updateDescription})
    })
    let updateddata = await  response.json()
    setUpdateDescription("")
    setData((tododata)=>tododata.map(data=>data.task_id === id? {...data,task_description:updateDescription}:data))
    // description.classList.add("d-none")
    // error.classList.add("d-none")
    // updateBtn.classList.add("d-none")
    // editBtn.classList.remove("d-none")
  }

  function handleToggleInput(index){
    let editBtn = document.querySelector(`.edit-btn${index}`)
    if(toggleInput===index){
      editBtn.innerText="Edit"
      setToggleInput("")
      console.log(`if ${index}`)
    }else{
      console.log(`else${index}`)
      setToggleInput(index)
      editBtn.innerText="Close"
    }

    // let description  = document.querySelector(`.update-Description${index}`)
    // let error = document.querySelector(".description-error")
    // let editBtn = document.querySelector(`.edit-btn${index}`)
    // let updateBtn = document.querySelector(`.update-btn${index}`)
    // if(description.value===""){
    //   description.classList.remove("d-none")
    //   error.classList.remove("d-none")
    //   editBtn.classList.add("d-none")
    //   updateBtn.classList.remove("d-none")
    //   return false
    // }else{
    //   error.classList.add("d-none")
    //   return true
    // }
  }


  //HANDLING DELETING DATA 
  let handleDelete= async(id)=>{
    let response  = await fetch(`http://localhost:2030/delete/${id}`,{
      method:"delete"
    })
    console.log(response)
    if(response.ok){
    setData( function(prevdata){
      console.log(prevdata)
      return prevdata.filter(tododata=>tododata.task_id!==id)
    })}
  }

    //HANDLING AND SETTING TASK STATUS = 1

  let handleComplete= async(id)=>{
    let response = await fetch(`http://localhost:2030/complete/${id}`,{
      method:"post",
      headers:{
        'Content-Type':'application/json'
      }
    })
    if(response.ok){
    setData(data.map(item=>item.task_id === id? {...item,task_status:1}:item))
  }
  }

  //HANDLING ALL TASKS DATA SHOWING AND HIDING 
  let handleAccordion = (e)=>{
    // e.preventDefault()
    let viewTasks = document.querySelector(".view-tasks-btn")
    let accordion = document.querySelectorAll(".accordion-container .accordion")
    let accordionContainer = document.querySelectorAll(".accordion-container")
    console.log(accordion)
    if(viewTasks.innerText==='View Tasks'){
      accordionContainer.forEach(acc=>{
        acc.style.display="flex"
      })
     accordion.forEach(acc=>{
      acc.classList.remove("d-none")
      
    })
      viewTasks.innerText="Hide Tasks"
       
}else{
  accordionContainer.forEach(acc=>{
    acc.style.display="none"
  })
  accordion.forEach(acc=>{
     acc.classList.add("d-none")
  })
  viewTasks.innerText="View Tasks"
}
  }

  //HANDLING ALL PENDING TASKS DATA SHOWING AND HIDING
  let handleViewPending =(e)=>{
    let pendingbtn= document.querySelector(".pending-btn")
    let accordion = document.querySelectorAll(".pending-data-container .accordion")
    let accordionContainer = document.querySelectorAll(".pending-data-container")
    let hideTasks = document.querySelector(".hide")

    if(pendingbtn.innerText === "Pending"){
    accordionContainer.forEach(acc=>{
      acc.style.display="flex"
    })
      accordion.forEach(acc=>{
      acc.classList.remove("d-none")
    })
      // pendingbtn.innerText="Cancel"
    }else{
      accordionContainer.forEach(acc=>{
        acc.style.display="none"
      })
      accordion.forEach(acc=>{
      acc.classList.add("d-none")
    })
      pendingbtn.innerText="Pending"
    }
  }

  //HANDLING ALL COMPLETING TASKS DATA SHOWING AND HIDING
  let handleViewCompleted = (e)=>{
    let completedbtn = document.querySelector(".completed-btn")
    let accordion = document.querySelectorAll(".completed-data-container .accordion")
    let accordionContainer = document.querySelectorAll(".completed-data-container")
    if(completedbtn.innerText =="Completed"){
      accordionContainer.forEach(acc=>{
        acc.style.display="flex"
      })
      accordion.forEach(acc=>{
      acc.classList.remove("d-none")
    })
      // completedbtn.innerText="Cancel"
    }else{
      accordionContainer.forEach(acc=>{
        acc.style.display="none"
      })
      accordion.forEach(acc=>{
      acc.classList.add("d-none")     
    })
      completedbtn.innerText="Completed"
    }
  }



//SIMPLE VALIDATION   
  function validation(){
    let taskname = document.querySelector(".taskname")
    let description = document.querySelector(".description")
    let isValid = true;
    if(taskname.value ===""){
      alert("Please Enter Your Name")
      return false
    }else if(description.value ===""){
      alert("Please Enter Description")
      return  false;
    }
    return isValid;
  }

    return (
        <>
        <div className="form-container vh-100 d-flex justify-content-center align-items-center mt-5">
            <div className="form-box">
            <form onSubmit={handleSubmit}>
              <h1 className="text-center mb-5 text-capitalize text-light fw-bold">to do list</h1>
              <div className='d-flex justify-content-center gap-5 mb-2'>
          {pendingCount.map((num,index)=>(
          
          <h4 key={index}>Pending : <span className='text-success fw-bold'>{num.count}</span></h4>
        ))}
        {completedCount.map((num,index)=>(
          <h4>Completed : <span className='text-success fw-bold'>{num.count}</span></h4>
        ))}
        </div>
              <div class="inputt-group">
                <div className='input-box'>
                <input type="text" placeholder='Task Name' className="taskname" value={taskName} onChange={(e)=>setTaskName(e.target.value)}></input>
                    <textarea className="description" maxLength={200} placeholder='Description' value={description} onChange={(e)=>{
                      console.log("description" ,e.target.value)
                      return setDescription(e.target.value)
                    }} ></textarea>
                    
                </div>
                </div>
                <div className='view-task-container d-flex justify-content-center'>
                <div className="view-task-box">
                <button type="submit" className="add-task-btn">Add Task</button>
                    {/* <button type="button" href="" className="view-tasks-btn" onClick={handleAccordion}>View Tasks</button>
                    <button type="button" href="" className="pending-btn" onClick={handleViewPending}>Pending</button>
                    <button type="button" href="" className="completed-btn" onClick={handleViewCompleted}>Completed</button> */}
                </div>
                </div>
                </form>

<div className="all-accordions">
   <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active view-tasks-btn" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true" onClick={handleAccordion}>View Tasks</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link pending-btn" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false" onClick={handleViewPending}>Pending</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link completed-btn" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false" onClick={handleViewCompleted}>Completed</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link hide-tasks-btn" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" aria-selected="false"  >Hide Tasks</button>
  </li>
  
</ul>
<div class="tab-content" id="pills-tabContent">
  <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
  {data.map((todolistdata,index)=>(
      <div className='accordion-container'>  
      <div>  
  <div className="accordion d-none " id="accordionExample" key={index}>
  <div className="accordion-item">
    <h2 className="accordion-header"  style={{border:"2px solid yellow",borderRadius:"8px"}}>
      <button className="accordion-button fw-semibold border border-warning" style={{backgroundColor:todolistdata.task_status===0?"#e75b65":"#9fd8b4" , color:todolistdata.task_status===0? "white":"#271f1f"}}  type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="true" aria-controls={`collapse${index}`}>
      {(todolistdata.task_name!==null)?todolistdata.task_name.toUpperCase(): "Empty"} <span className="mx-auto text-center"><span> {(todolistdata.task_status===0)? "Pending" : "Completed"}</span> </span> <span className="ms-auto">{todolistdata.task_date}</span> <span className='mx-3'>{(todolistdata.task_status==1)?`Finished in ${todolistdata.dateDiff} days`:""}</span>
      </button>
    </h2>
    <div id={`collapse${index}`} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className="accordion-body">
       <p className="description text-start">{todolistdata.task_description}</p>
       <div className="text-start">
       <input type="text" value={updateDescription} className={`update-Description ${toggleInput===index? "d-block" : 'd-none' }`} placeholder='Enter Description'onChange={(e)=>setUpdateDescription(e.target.value)}></input>
       <span className={`description-error text-danger ${toggleInput===index && updateDescription==="" ?"":'d-none' }`}>Please Enter description</span>
       </div>
      </div>
      <button className={` btn btn-primary bg-primary edit-btn${index}`} onClick={()=>handleToggleInput(index)}>Edit</button>
      <button className={` btn btn-success update-btn ${toggleInput===index? "" : 'd-none'}`} onClick={(e)=>handleUpdate(todolistdata.task_id)}>Update</button>
      <button className="bg-danger delete-btn" onClick={(e)=>handleDelete(todolistdata.task_id)}>Delete</button>
      <button className=" complete-btn bg-success" onClick={(e)=>handleComplete(todolistdata.task_id) }>Complete</button>
    </div> 
  </div>
  </div>
  </div>
  </div>
   ))}
  </div>
  <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0">
    
{pendingData.map((pendingdata,index)=>(
<div className='pending-data-container' key={index} >
   <div className="accordion d-none" id="accordionExample" key={index}>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button"type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="true" aria-controls={`collapse${index}`}>
        <span className="text-center">{pendingdata.task_name}</span> <span className="ms-auto">{pendingdata.task_status===0? "Pending":"completed"}</span>
        <span className="mx-auto">{pendingdata.task_date}</span>
      </button>
    </h2>
    <div id={`collapse${index}`} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className="accordion-body ">
       <p className="text-start">{pendingdata.task_description}</p>
      </div>
    </div>
  </div>
</div>

</div>
 ))}

  </div>
  <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabindex="0">
  {completedData.map((completeddata,index)=>(
<div className="completed-data-container" key={index}>
<div class="accordion  d-none" id="accordionExample ">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="true" aria-controls={`collapse${index}`}>
        <span>{completeddata.task_name}</span><span className="ms-auto">{completeddata.task_status===1? "Completed" :"Pending" }</span><span className="mx-auto">{completeddata.task_date}</span>
      </button>
    </h2>
    <div id={`collapse${index}`} class="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <p className=' text-start'>{completeddata.task_description}</p>
      </div>
    </div>
  </div>

  
</div>
</div>

))}
  </div>

</div>

{/* SHOWING ALL TASKS COMPLETED AND PENDING TOGETHER ----------  */}
     {/* {data.map((todolistdata,index)=>(
      <div className='accordion-container'>  
      <div>  
  <div className="accordion d-none " id="accordionExample" key={index}>
  <div className="accordion-item">
    <h2 className="accordion-header"  style={{border:"2px solid yellow",borderRadius:"8px"}}>
       
      <button className="accordion-button fw-semibold border border-warning" style={{backgroundColor:todolistdata.task_status===0?"#e75b65":"#9fd8b4" , color:todolistdata.task_status===0? "white":"#271f1f"}}  type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="true" aria-controls={`collapse${index}`}>
      {(todolistdata.task_name!==null)?todolistdata.task_name.toUpperCase(): "Empty"} <span className="mx-auto text-center"><span> {(todolistdata.task_status===0)? "Pending" : "Completed"}</span> </span> <span className="ms-auto">{todolistdata.task_date}</span> <span className='mx-3'>{(todolistdata.task_status==1)?`Finished in ${todolistdata.dateDiff} days`:""}</span>
      </button>
    </h2>
    <div id={`collapse${index}`} className="accordion-collapse collapse" data-bs-parent="#accordionExample ">
      <div className="accordion-body">
       <p className="task-description text-start" >{todolistdata.task_description}</p>
      </div>
      <button className="bg-primary edit-btn">Edit</button>
      <button className="bg-danger delete-btn" onClick={(e)=>handleDelete(todolistdata.task_id)}>Delete</button>
     
      <button className=" complete-btn bg-success" onClick={(e)=>handleComplete(todolistdata.task_id) }>Complete</button>
      
    </div> 
  </div>
  </div>
  </div>
  </div>
   ))} */}

{/* SHOWING ALL PENDING TASKS ------------- */}
{/* 
{pendingData.map((pendingdata,index)=>(
<div className='pending-data-container' key={index} >
   
   <div className="accordion d-none" id="accordionExample" key={index}>
  <div className="accordion-item">
    <h2 className="accordion-header" >
      
      <button className="accordion-button"type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="true" aria-controls={`collapse${index}`}>
        <span className="text-center">{pendingdata.task_name}</span> <span className="ms-auto">{pendingdata.task_status===0? "Pending":"completed"}</span>
        <span className="mx-auto">{pendingdata.task_date}</span>
      </button>
    </h2>
    <div id={`collapse${index}`} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className="accordion-body ">
       <p className="text-start">{pendingdata.task_description}</p>
      </div>
    </div>
  </div>
</div>

</div>
 ))}  */}


{/* SHOWING ALL COMPLTED TASKS----------- */}

 {/* {completedData.map((completeddata,index)=>(
<div className="completed-data-container" key={index}>
<div class="accordion  d-none" id="accordionExample ">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="true" aria-controls={`collapse${index}`}>
        <span>{completeddata.task_name}</span><span className="ms-auto">{completeddata.task_status===1? "Completed" :"Pending" }</span><span className="mx-auto">{completeddata.task_date}</span>
      </button>
    </h2>
    <div id={`collapse${index}`} class="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <p className=' text-start'>{completeddata.task_description}</p>
      </div>
    </div>
  </div>

  
</div>
</div>

))}  */}
</div>
 
            
            </div>
        </div>

        </>
    )
}