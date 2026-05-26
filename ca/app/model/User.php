<?php
namespace app\model;

use think\Model;

class User extends Model
{
    protected $name = 'user';
    protected $pk = 'id';
    
    protected $hidden = ['password', 'created_at', 'updated_at'];
    
    protected $append = ['role_text'];
    
    public function getRoleTextAttr($value, $data)
    {
        $status = [0 => '禁用', 1 => '正常'];
        return $status[$data['status']] ?? '';
    }
    
    public function favorites()
    {
        return $this->hasMany(Favorite::class, 'user_id');
    }
    
    public function applications()
    {
        return $this->hasMany(Application::class, 'user_id');
    }
}
