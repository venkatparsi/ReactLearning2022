export const HTTP_GET = 'GET';
export const HTTP_POST = 'POST';
export const HTTP_DELETE = 'DELETE';
export const POST_HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, Content-Type, Authorization, X-Auth-Token",
    'Accept-Encoding': 'gzip'
};

class BaseApi {
    _json(response) {
        return response.json();
    }
    _get(url) {
        return fetch(url, { method: HTTP_GET, credentials: 'include' });
    }

    _post(url, payload, signal) {
        console.log("URL to post:",url);
        return this._withPayload(url, HTTP_POST, payload, signal);
    }

    _delete(url) {
        return fetch(url, { method: HTTP_DELETE, credentials: 'include' });
    }

    _withPayload(url, method, payload, signal) {
        return fetch(url, {
            method: method,
            credentials: 'include',
            headers: POST_HEADERS,
            body: JSON.stringify(payload),
            signal: signal
        })
    }
}

export default BaseApi;