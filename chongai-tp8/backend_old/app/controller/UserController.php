<?php
namespace app\controller;

use think\Controller;
use think\facade\Request;
use app\model\User;
use Firebase\JWT\JWT;

class UserController extends Controller
{
    private $secret = 'chongai_jwt_secret_key';
    
    public function login()
    {
        $data = Request::post();
        $phone = $data['phone'] ?? '';
        $password = $data['password'] ?? '';
        
        if (!$phone || !$password) {
            return json(['code' => 400, 'msg' => '请输入手机号和密码']);
        }
        
        $user = User::where('phone', $phone)->find();
        
        if (!$user || password_verify($password, $user->password) === false) {
            return json(['code' => 401, 'msg' => '手机号或密码错误']);
        }
        
        $payload = [
            'user_id' => $user->id,
            'exp' => time() + 7200
        ];
        
        $token = JWT::encode($payload, $this->secret, 'HS256');
        
        return json([
            'code' => 200,
            'msg' => '登录成功',
            'data' => [
                'token' => $token,
                'user' => $user
            ]
        ]);
    }
    
    public function register()
    {
        $data = Request::post();
        $phone = $data['phone'] ?? '';
        $password = $data['password'] ?? '';
        $confirmPassword = $data['confirmPassword'] ?? '';
        
        if (!$phone || !$password || !$confirmPassword) {
            return json(['code' => 400, 'msg' => '请填写完整信息']);
        }
        
        if ($password !== $confirmPassword) {
            return json(['code' => 400, 'msg' => '两次密码不一致']);
        }
        
        if (strlen($phone) !== 11) {
            return json(['code' => 400, 'msg' => '请输入正确的手机号']);
        }
        
        if (User::where('phone', $phone)->find()) {
            return json(['code' => 400, 'msg' => '该手机号已注册']);
        }
        
        $user = new User();
        $user->phone = $phone;
        $user->password = password_hash($password, PASSWORD_DEFAULT);
        $user->name = '用户';
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
}
