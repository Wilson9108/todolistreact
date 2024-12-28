// import {useState,useEffect} from 'react';

// function Pending() {
//   const [pendingData,setPendingData]=useState([])
//   useEffect(()=>{
//     let fetchPending = async ()=>{
//       let response = await fetch("http://localhost:2030/pending/data",{
//         method:"Get"
//       })
//       let data = await response.json()
//       setPendingData(data)
//     }
//     fetchPending()
  
//   },[])
//   return (
//     <div>
        

//    {pendingData.map((pendata,index)=>{


// <div class="accordion" id="accordionExample">
// <div class="accordion-item">
//  <h2 class="accordion-header">
//    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
//      Accordion Item #1
//    </button>
//  </h2>
//  <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
//    <div class="accordion-body">
//      <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
//    </div>
//  </div>
// </div>
// </div>
// })}


      
//     </div>
//   )
// }

// export default Pending
