import React from 'react'
import './tag.style.css'

const Tag = (props) => {
    var defaultProps = {...props};
    if(props.title === undefined) defaultProps.title = "tag";
    if(props.color === undefined) defaultProps.color = '';
    if(props.backgroundColor === undefined) defaultProps.backgroundColor = '';
    return (
        <span class="tag" style={{
            backgroundColor: defaultProps.backgroundColor,
            color: defaultProps.color}}>
        {defaultProps.title}
        </span>
    )
}

export default Tag;
