import axios from 'axios'
const baseUrl = 'http://192.168.68.110:3001/';

const getBaseUrl = (type)=>{
    if(type==="note"|| type==="notes") return baseUrl+"notes"
    else if(type==="book" || type==='books') return baseUrl+"books"
    else if(type==="section" || type==='sections') return baseUrl+"sections"
    else if(type==="subject" || type== "subjects") return baseUrl+"subjects"
    else if(type==="chapter" || type== "chapters") return baseUrl+"chapters"
}

const config ={
  proxy: {
    protocol: 'http',
    host: '192.168.68.110',
    port: 3001,   
  }
}


const getAll = async (type) => {    

  console.log("making axios call with config :",type,config,getBaseUrl(type))
  var result = await axios.get(getBaseUrl(type));
  console.log("done axios call with config",type,config,getBaseUrl(type))
  return result;
}

const getAllWithParent = (type,parentId) => {
  console.log("making axios call getAllWithParent config :",type,getBaseUrl(type))
  var url = getBaseUrl(type)+'?parent'+`=${parentId}`;
  console.log("URL to get for parent:",url)
  var result =  axios.get(url);
  console.log("done axios call result:",result)
  return result;
}

  const addObj = async (type,payload,dispatch)=>{  
    console.log("     -->Finding object sync call:",type)
  var obj = await findObject(type,"title",payload.title);
      console.log("       <--server Response for find object:",obj.data);
  if( obj.data.length > 0 ){      
      alert("Add/Save Failed - Duplicate found.")
      let newObj = {...obj,isDuplicateFound:true}
      console.log("     <--found the duplicate object....NOT ADDING OBJECT.")
      return newObj;
  }
  else{
      console.log("        --> Not found object - ADDING NOW")
      console.log("           -->making axios call with Type:",type,"Payload:",payload,config)
      const resultPromise =  axios.post(getBaseUrl(type),payload,config)  
      console.log("           <--Returning promise")
      return resultPromise;
  }
}

const findObject = (type,fieldName,value) =>{
         console.log("         -->Finding object URL :",getBaseUrl(type)+`?${fieldName}`+`=${value}`)
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
  getAllWithParent:getAllWithParent,
  add: addObj,
  get: getObj,
  create: create, 
  update: update 
}