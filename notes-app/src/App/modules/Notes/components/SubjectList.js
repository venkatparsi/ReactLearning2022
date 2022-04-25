import React from 'react'
import { useSelector } from 'react-redux'
import Subject from './Subject'

const SubjectList = () => {
    const subStore = useSelector((state) => state.subjects);
    console.log("State,subjects:-->",JSON.stringify(subStore))
    // since `notes` is an array, we can loop over it    
  return <ul className="note-list">{
    subStore.items.map(item => {
     return (<Subject key={item?.id} 
         id={item?.id}
         title={item?.title} 
         about={item?.about}/>)
  })
}
   
</ul>
}

export default SubjectList;