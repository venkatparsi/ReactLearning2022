import React from 'react'
import { useSelector } from 'react-redux'
import Book from './Book'

const BookList = () => {
    const subStore = useSelector((state) => state.books);
    console.log("State,books:-->",JSON.stringify(subStore))
    // since `notes` is an array, we can loop over it    
  return <ul className="note-list">{
    subStore.items.map(item => {
     return (<Book key={item?.id} 
         id={item?.id}
         title={item?.title} 
         about={item?.about}/>)
  })
}
   
</ul>
}

export default BookList;