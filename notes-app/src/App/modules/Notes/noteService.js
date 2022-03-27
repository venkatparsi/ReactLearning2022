import axios from 'axios'
import { addSubject } from './subjectReducerSlice'
import { useDispatch } from 'react-redux';
const baseUrl = 'http://localhost:3001/';
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
console.log("Found object:",obj);
  if(obj.data.length>0){
    console.log("....found the dublicate object....NOT Adding now.")
  }
  else{
    console.log("making axios call with Type:",type,"Payload:",payload,config)
  const resultPromise =  axios.post(getBaseUrl(type),payload,config)  
  resultPromise.then(response => {
    console.log("Recievd Object: ---->",response.data)
      dispatch(addSubject(response.data))
  })
 }
}

const findObject = (type,fieldName,value) =>{
  console.log("Finding object:",getBaseUrl(type)+`?${fieldName}`+`=${value}`)
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