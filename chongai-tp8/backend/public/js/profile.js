document.addEventListener('DOMContentLoaded', function() {
    loadUserInfo();
});

function loadUserInfo() {
    ajax({
        url: '/api/user',
        method: 'GET',
        success: function(response) {
            if (response.code === 200 && response.data) {
                document.getElementById('userName').textContent = response.data.name;
                document.getElementById('userPhone').textContent = response.data.phone;
            }
        },
        error: function() {
            showModal('请先登录');
            setTimeout(function() {
                window.location.href = 'login.html';
            }, 1500);
        }
    });
}

function handleLogout() {
    removeToken();
    showModal('已退出登录');
    setTimeout(function() {
        window.location.href = 'login.html';
    }, 1500);
}
