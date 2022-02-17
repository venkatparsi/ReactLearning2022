
const JSON_MOCK_BASE_URL = 'https://jsonplaceholder.typicode.com/';

//Chaining of the promises.

fetch(JSON_MOCK_BASE_URL+ 'users')
.then(response => response.json())
.then(users=> {
    const firstUser = users[0];
    console.log(firstUser)
    return fetch( JSON_MOCK_BASE_URL+'posts?userId='+firstUser.id);
})
.then(response => response.json())
.then(posts => console.log(posts))
.catch( error => console.log(error));


//more like a synchronous code... async await.
const myAsyncFunction = async () => {
    try{
        const usersResposne = await fetch(JSON_MOCK_BASE_URL+ 'users');
        const users = await usersResposne.json();
        const firstUser = users[0];
        const secondUser = users[1];
        console.log(secondUser);
        const postsResponse = await fetch( JSON_MOCK_BASE_URL+'posts?userId='+secondUser.id);
        const posts = await postsResponse.json();   
    }catch(err){
        console.log("There was a error:",err);
    }
   
}