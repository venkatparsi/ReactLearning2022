
export function nextItemId(appStore) {
    const maxId = appStore.reduce((maxId, storeItem) => Math.max(storeItem.id, maxId), -1)
    return maxId + 1
}

export function checkDuplicateExists (state,action,statename,fieldName) {
	console.log("      ----> Starting Checking Artifact duplicate exist (state[statename]) ",state[statename],action)
	const artifact = state[statename].filter(element => element[fieldName] === action.payload[fieldName]);	
	if(artifact.length>0) {
        console.log("    Artifact duplicate found ",artifact)
        return artifact[0];
    }       
	else{
        console.log("    Artifact duplicate NOT FOUND ",artifact)
        console.log("     <---Ending Checking Artifact duplicate exist ",state,action)
    } return null;
}