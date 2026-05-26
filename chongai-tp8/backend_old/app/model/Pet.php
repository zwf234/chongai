<?php
namespace app\model;

use think\Model;

class Pet extends Model
{
    protected $name = 'pet';
    protected $pk = 'id';
    
    protected $hidden = ['created_at', 'updated_at'];
    
    public function favorites()
    {
        return $this->hasMany(Favorite::class, 'pet_id');
    }
    
    public function applications()
    {
        return $this->hasMany(Application::class, 'pet_id');
    }
}
