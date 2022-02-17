import Configuration from "../config";
import DataServcice from "./DataService.service";

class MenuService extends DataServcice{

    
    constructor(){
        super();        
    }

    async retrieveMenuItems(){
        return fetch(this.config.MENU_ITEMS_URL)
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
