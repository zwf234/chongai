<?php
namespace app\controller;

use think\facade\Request;
use app\model\Favorite;
use app\model\Pet;

class FavoriteController
{
    public function add()
    {
        $userId = Request::user_id;
        $data = Request::post();
        $petId = $data['pet_id'] ?? 0;
        
        if (!$petId) {
            return json(['code' => 400, 'msg' => '请选择宠物']);
        }
        
        $exists = Favorite::where('user_id', $userId)
            ->where('pet_id', $petId)
            ->find();
        
        if ($exists) {
            return json(['code' => 400, 'msg' => '已收藏该宠物']);
        }
        
        $favorite = new Favorite();
        $favorite->user_id = $userId;
        $favorite->pet_id = $petId;
        $favorite->save();
        
        return json(['code' => 200, 'msg' => '收藏成功']);
    }
    
    public function delete($id)
    {
        $userId = Request::user_id;
        
        $favorite = Favorite::where('id', $id)
            ->where('user_id', $userId)
            ->find();
        
        if (!$favorite) {
            return json(['code' => 404, 'msg' => '收藏不存在']);
        }
        
        $favorite->delete();
        
        return json(['code' => 200, 'msg' => '取消收藏成功']);
    }
    
    public function getList()
    {
        $userId = Request::user_id;
        
        $favorites = Favorite::where('user_id', $userId)
            ->with('pet')
            ->select();
        
        $petIds = array_column($favorites->toArray(), 'pet_id');
        $pets = Pet::whereIn('id', $petIds)->select();
        
        return json([
            'code' => 200,
            'msg' => '获取成功',
            'data' => $pets
        ]);
    }
}
