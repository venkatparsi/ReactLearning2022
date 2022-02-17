import Configuration from "../config";
class DataService {

    constructor(){
        this.config = new Configuration();
    }

    handleResponseError(response) {
        throw new Error("HTTP error, status = " + response.status);
    }
    
    handleError(error) {
        console.log(error.message);
    }

    async retrieveItems(configUrl){
        return fetch(configUrl)
        .then(resp => {
            if(!resp.ok) this.handleResponseError(resp);
            return resp.json()
        })
        .then(json => {
            console.log("Retrieved items",json);
            return json;
        })
        .catch(err => {
            this.handleError(err);
        })
    }
}