import React from 'react'

export const EvenColumnsGridLayout = (props) => {
    return (
        <div className="grid-container">
            {props.children}        
        </div>
    )
}

const EvenColumnsLayout = (props) => {
    return (      
            <div className="content">          
                <div className="even-columns-container"
                  style={{
                          margin:props.margin, 
                          padding:props.padding,
                          overflow:props.overflow,
                          gap:props.gap,
                          border:props.border
                          }}
                 >
                    {props.children}              
            </div>           
        </div>    
    )
}

export default EvenColumnsLayout
