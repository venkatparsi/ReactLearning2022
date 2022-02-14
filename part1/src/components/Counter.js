import React from "react"
import Togglable from "./Toggable";

const Counter = ({store}) => { 
       
    return(
        <>
        <Togglable buttonLabel='Show Counter' >
        <h1>Counter </h1>
        <div>
        {store.getState()}
      </div>
      <button 
        onClick={e => store.dispatch({ type: 'INCREMENT' })}
      >
        plus
      </button>
      <button
        onClick={e => store.dispatch({ type: 'DECREMENT' })}
      >
        minus
      </button>
      <button 
        onClick={e => store.dispatch({ type: 'ZERO' })}
      >
        zero
      </button>
        </Togglable>
        </>
    )
}

export default Counter;