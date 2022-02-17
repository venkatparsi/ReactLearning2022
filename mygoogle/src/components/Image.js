import React from 'react';
class Image extends React.Component { 

    constructor(props) {
        super(props);
        this.state = {"metadata" : { 
                                    props:"",
                                    propsTypes:""}};
        this.state.metadata.props = [ "src","alt","width","height","objectFit"];
        this.state.metadata.propsTypes = [ "string","string","int","int","string"];
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then( users => console.log(users))
    } 
    
     getPropertyNames(){
        console.log("Object Properties:",this.state.metadata.props);
        return this.state.metadata.props;
    }

    register(){
            return  this.state.metadata            
    }

    render(){
    return (
        <img className = {this.props.className}
             id = {this.props.id}
             src = {this.props.src}
             alt = {this.props.title}
             width = {this.props.width}
             height = {this.props.height}
             objectFit = {this.props.objectFit}
             propertyNames = {this.getPropertyNames} 
             register = {this.register}  
             onClick = {(e) => {
                 this.props.onClick(e)                 
                 } }        
             />
           )
    }
}
export default Image


