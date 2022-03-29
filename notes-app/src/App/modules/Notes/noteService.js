import axios from 'axios'
import { addSubject } from './subjectReducerSlice'
const baseUrl = 'http://192.168.1.37:3001/';
const artifactType = ["book","note","section"]

const getBaseUrl = (type)=>{
    if(type==="note"|| type==="notes") return baseUrl+"notes"
    else if(type==="book") return baseUrl+"books"
    else if(type==="section") return baseUrl+"sections"
    else if(type==="subject" || type== "subjects") return baseUrl+"subjects"
}

const config ={
  proxy: {
    protocol: 'http',
    host: 'localhost',
    port: 3001,   
  }
}


const getAll = (type) => {    
  console.log("making axios call with config",type,config,getBaseUrl(type))
  var result = axios.get(getBaseUrl(type),config);
  return result;
}


  const addObj = async (type,payload,dispatch)=>{  
  var obj =await findObject(type,"title",payload.title);
      console.log("       Reserver Rsponse for find object:",obj.data);
  if( obj.data.length > 0 ){
      console.log("....found the duplicate object....NOT ADDING OBJECT.")
      alert("Add/Save Failed - Duplicate found.")
      let newObj = {...obj,isDuplicateFound:true}
      return newObj;
  }
  else{
      console.log("        Not found object - ADDING NOW")
      console.log("        making axios call with Type:",type,"Payload:",payload,config)
      const resultPromise =  axios.post(getBaseUrl(type),payload,config)  
      return resultPromise;
  }
}

const findObject = (type,fieldName,value) =>{
         console.log("         Finding object:",getBaseUrl(type)+`?${fieldName}`+`=${value}`)
  return axios.get(getBaseUrl(type)+`?${fieldName}`+`=${value}`)
}

const freeTextSearch = (type,value) =>{
  console.log("Finding free text search",getBaseUrl(type)+'?q='+`${value}`)
  return axios.get(getBaseUrl(type)+'?q='+`${value}`)

}

const getObj = (type,id) => {
    return axios.get(getBaseUrl(type)+`/${id}`);
}

const create = (type,newObject) => {
  return axios.post(getBaseUrl(type), newObject)
}

const update = (type,id, newObject) => {
  return axios.put(getBaseUrl(type)+`/${id}`, newObject)
}

export default { 
  getAll: getAll, 
  add: addObj,
  get: getObj,
  create: create, 
  update: update 
}