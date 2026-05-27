<?php
namespace app\controller;

use think\facade\Request;
use app\model\User;
use Firebase\JWT\JWT;

class UserController
{
    private $secret = 'chongai_jwt_secret_key_2024';
    
    public function login()
    {
        $data = Request::post();
        $loginKey = $data['username'] ?? ''; // 可以是用户名或手机号
        $password = $data['password'] ?? '';
        
        if (!$loginKey || !$password) {
            return json(['code' => 400, 'msg' => '请输入用户名/手机号和密码']);
        }
        
        // 支持用户名或手机号登录
        $user = User::where('username', $loginKey)->find();
        if (!$user) {
            $user = User::where('phone', $loginKey)->find();
        }
        
        if (!$user || password_verify($password, $user->password) === false) {
            return json(['code' => 401, 'msg' => '用户名/手机号或密码错误']);
        }
        
        if ($user->status != 1) {
            return json(['code' => 403, 'msg' => '账号已被禁用']);
        }
        
        $payload = [
            'user_id' => $user->id,
            'username' => $user->username,
            'role' => $user->role,
            'exp' => time() + 7200
        ];
        
        $token = JWT::encode($payload, $this->secret, 'HS256');
        
        return json([
            'code' => 200,
            'msg' => '登录成功',
            'data' => [
                'token' => $token,
                'user' => $user,
                'role' => $user->role
            ]
        ]);
    }
    
    public function register()
    {
        $data = Request::post();
        $username = $data['username'] ?? '';
        $phone = $data['phone'] ?? '';
        $password = $data['password'] ?? '';
        $confirmPassword = $data['confirmPassword'] ?? '';
        
        // 用户名是必填的
        if (!$username) {
            return json(['code' => 400, 'msg' => '请填写用户名']);
        }
        
        if (!$password || !$confirmPassword) {
            return json(['code' => 400, 'msg' => '请填写密码']);
        }
        
        if ($password !== $confirmPassword) {
            return json(['code' => 400, 'msg' => '两次密码不一致']);
        }
        
        if (strlen($username) < 2) {
            return json(['code' => 400, 'msg' => '用户名长度不能少于2位']);
        }
        
        if (strlen($username) > 20) {
            return json(['code' => 400, 'msg' => '用户名长度不能超过20位']);
        }
        
        // 检查用户名唯一性
        if (User::where('username', $username)->find()) {
            return json(['code' => 400, 'msg' => '该用户名已被注册']);
        }
        
        // 如果填写了手机号，检查唯一性
        if ($phone && User::where('phone', $phone)->find()) {
            return json(['code' => 400, 'msg' => '该手机号已注册']);
        }
        
        $user = new User();
        $user->username = $username;
        $user->phone = $phone ?: null;
        $user->password = password_hash($password, PASSWORD_DEFAULT);
        $user->name = $username;
        $user->role = 'user';
        $user->status = 1;
        $user->save();
        
        return json(['code' => 200, 'msg' => '注册成功']);
    }
    
    public function getUserInfo()
    {
        $userId = Request::user_id;
        $user = User::find($userId);
        
        if (!$user) {
            return json(['code' => 404, 'msg' => '用户不存在']);
        }
        
        return json([
            'code' => 200,
            'msg' => '获取成功',
            'data' => $user
        ]);
    }
    
    public function adminLogin()
    {
        return $this->login();
    }
    
    public function getStats()
    {
        $userId = Request::user_id;
        $user = User::find($userId);
        
        if (!$user || $user->role !== 'admin') {
            return json(['code' => 403, 'msg' => '无权限访问']);
        }
        
        $petCount = \app\model\Pet::where('status', 1)->count();
        $userCount = User::count();
        $applicationCount = \app\model\Application::count();
        $favoriteCount = \app\model\Favorite::count();
        
        return json([
            'code' => 200,
            'msg' => '获取成功',
            'data' => [
                'pet_count' => $petCount,
                'user_count' => $userCount,
                'application_count' => $applicationCount,
                'favorite_count' => $favoriteCount
            ]
        ]);
    }
    
    public function getUserList()
    {
        $userId = Request::user_id;
        $user = User::find($userId);
        
        if (!$user || $user->role !== 'admin') {
            return json(['code' => 403, 'msg' => '无权限访问']);
        }
        
        $page = Request::get('page', 1);
        $limit = Request::get('limit', 10);
        
        $users = User::page($page, $limit)->select();
        $total = User::count();
        
        return json([
            'code' => 200,
            'msg' => '获取成功',
            'data' => [
                'list' => $users,
                'total' => $total
            ]
        ]);
    }
}
