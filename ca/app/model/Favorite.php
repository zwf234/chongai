<?php
namespace app\model;

use think\Model;

class Favorite extends Model
{
    protected $name = 'favorite';
    protected $pk = 'id';
    
    protected $hidden = ['created_at', 'updated_at'];
    
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    
    public function pet()
    {
        return $this->belongsTo(Pet::class, 'pet_id');
    }
}
