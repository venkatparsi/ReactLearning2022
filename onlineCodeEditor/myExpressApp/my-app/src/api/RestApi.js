import BaseApi from "./BaseApi";
import { HTTP_GET,HTTP_POST } from "./BaseApi";
class RestApi extends BaseApi {

    static methods = new Array();
    static invoker = new RestApi();

    static invoke(methodName, ...params) {
        var methodDetails = RestApi.checkMethodName(methodName);
        if (methodDetails) {
            if (methodDetails.httpMethod == HTTP_GET) {
                console.log("Params passed", params);
                console.log("Eval url expression:",eval(methodDetails.urlExpressionParam))
                return RestApi.invoker._get(eval(methodDetails.urlExpressionParam));
            }
            else  if (methodDetails.httpMethod == HTTP_POST) {
                console.log("Params passed", params);
                console.log("Eval url expression:",eval(methodDetails.urlExpressionParam))
                var len = params.length;
                return RestApi.invoker._post(eval(methodDetails.urlExpressionParam),params[len]);
            }
        }
        else{
            console.log("METHOD NOT FOUND....");
            return null;
        }
    }

    static checkMethodName(methodName) {
        for (var i = 0; i < RestApi.methods.length; i++) {
            if (RestApi.methods[i].methodName === methodName)
                return RestApi.methods[i];
        }
        return null;
    }

    static createRestApi(
        methodName,
        httpMethod,
        urlExpressionDesc,
        urlExpressionParam,
        numOfArgs
    ) {
        for (let i = 0; i < arguments.length; i++) {
            console.log(arguments[i])
        }
        const apiMethod = {
            methodName: methodName,
            httpMethod: httpMethod,
            urlExpressionDesc: urlExpressionDesc,
            urlExpressionParam: urlExpressionParam,
            numOfArgs: numOfArgs
        };
        RestApi.methods.push(apiMethod);
    }

}
export default RestApi;