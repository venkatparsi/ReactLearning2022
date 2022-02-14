const CounterReducer = (state = 0, action) => {
  console.log("Action dispatched",action);
  console.log("State value:",state);
  var result = state;
    switch (action.type) {
      case 'INCREMENT':
        result = state + 1 
        break
      case 'DECREMENT':
        result =  state - 1
        break
      case 'ZERO':
        result = 0
        break
      default: // if none of the above matches, code comes here
       console.log("Executing the default switch value")
       result = state;
    }
    console.log("Result:",result)
    return result;
  }
  export default CounterReducer;