var API_BASE_URL = 'http://localhost:8080';

function getToken() {
    return localStorage.getItem('token') || '';
}

function setToken(token) {
    localStorage.setItem('token', token);
}

function removeToken() {
    localStorage.removeItem('token');
}

function ajax(options) {
    var method = options.method || 'GET';
    var url = API_BASE_URL + options.url;
    var data = options.data || {};
    var success = options.success || function() {};
    var error = options.error || function() {};

    var xhr = new XMLHttpRequest();
    
    if (method.toUpperCase() === 'GET' && Object.keys(data).length > 0) {
        var params = [];
        for (var key in data) {
            params.push(key + '=' + encodeURIComponent(data[key]));
        }
        url += '?' + params.join('&');
    }

    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    var token = getToken();
    if (token) {
        xhr.setRequestHeader('Authorization', token);
    }

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            try {
                var response = JSON.parse(xhr.responseText);
                if (xhr.status === 200) {
                    success(response);
                } else {
                    error(response);
                }
            } catch (e) {
                error({ code: xhr.status, msg: '请求失败' });
            }
        }
    };

    if (method.toUpperCase() !== 'GET') {
        xhr.send(JSON.stringify(data));
    } else {
        xhr.send();
    }
}

function goToPage(page) {
    window.location.href = page;
}

function showModal(content) {
    alert(content);
}
