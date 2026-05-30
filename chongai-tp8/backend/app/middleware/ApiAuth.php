<?php
namespace app\middleware;

use Closure;
use think\facade\Request;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class ApiAuth
{
    private $secret = 'chongai_jwt_secret_key_2024';
    
    public function handle($request, Closure $next)
    {
        $whiteList = [
            'api/login',
            'api/register',
            'api/pets',
            'api/pet/',
            'admin/login',
            'admin'
        ];
        
        $path = $request->path();
        
        foreach ($whiteList as $white) {
            if (strpos($path, $white) === 0) {
                return $next($request);
            }
        }
        
        $token = $request->header('Authorization');
        
        if (!$token) {
            return json(['code' => 401, 'msg' => '未登录']);
        }
        
        try {
            $decoded = JWT::decode($token, new Key($this->secret, 'HS256'));
            $request->user_id = $decoded->user_id;
            $request->username = $decoded->username ?? '';
            $request->user_role = $decoded->role ?? 'user';
            return $next($request);
        } catch (\Exception $e) {
            return json(['code' => 401, 'msg' => 'token无效']);
        }
    }
}
