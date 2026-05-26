<?php
namespace app\controller;

use think\Controller;
use think\facade\Request;
use app\model\Pet;

class PetController extends Controller
{
    public function getList()
    {
        $page = Request::get('page', 1);
        $limit = Request::get('limit', 10);
        $type = Request::get('type', '');
        $keyword = Request::get('keyword', '');
        
        $query = Pet::where('status', 1);
        
        if ($type) {
            $query->where('type', $type);
        }
        
        if ($keyword) {
            $query->where('name', 'like', "%{$keyword}%")
                  ->whereOr('location', 'like', "%{$keyword}%");
        }
        
        $pets = $query->page($page, $limit)->select();
        $total = $query->count();
        
        return json([
            'code' => 200,
            'msg' => '获取成功',
            'data' => [
                'list' => $pets,
                'total' => $total
            ]
        ]);
    }
    
    public function getDetail($id)
    {
        $pet = Pet::find($id);
        
        if (!$pet) {
            return json(['code' => 404, 'msg' => '宠物不存在']);
        }
        
        return json([
            'code' => 200,
            'msg' => '获取成功',
            'data' => $pet
        ]);
    }
    
    public function add()
    {
        $data = Request::post();
        
        $pet = new Pet();
        $pet->name = $data['name'] ?? '';
        $pet->type = $data['type'] ?? '';
        $pet->age = $data['age'] ?? '';
        $pet->breed = $data['breed'] ?? '';
        $pet->gender = $data['gender'] ?? '';
        $pet->location = $data['location'] ?? '';
        $pet->image = $data['image'] ?? '';
        $pet->description = $data['description'] ?? '';
        $pet->requirements = $data['requirements'] ?? '';
        $pet->shelter = $data['shelter'] ?? '';
        $pet->contact = $data['contact'] ?? '';
        $pet->phone = $data['phone'] ?? '';
        $pet->vaccinated = $data['vaccinated'] ?? 0;
        
        $pet->save();
        
        return json(['code' => 200, 'msg' => '添加成功']);
    }
    
    public function update($id)
    {
        $pet = Pet::find($id);
        
        if (!$pet) {
            return json(['code' => 404, 'msg' => '宠物不存在']);
        }
        
        $data = Request::put();
        
        $pet->name = $data['name'] ?? $pet->name;
        $pet->type = $data['type'] ?? $pet->type;
        $pet->age = $data['age'] ?? $pet->age;
        $pet->breed = $data['breed'] ?? $pet->breed;
        $pet->gender = $data['gender'] ?? $pet->gender;
        $pet->location = $data['location'] ?? $pet->location;
        $pet->image = $data['image'] ?? $pet->image;
        $pet->description = $data['description'] ?? $pet->description;
        $pet->requirements = $data['requirements'] ?? $pet->requirements;
        $pet->shelter = $data['shelter'] ?? $pet->shelter;
        $pet->contact = $data['contact'] ?? $pet->contact;
        $pet->phone = $data['phone'] ?? $pet->phone;
        $pet->vaccinated = $data['vaccinated'] ?? $pet->vaccinated;
        
        $pet->save();
        
        return json(['code' => 200, 'msg' => '更新成功']);
    }
    
    public function delete($id)
    {
        $pet = Pet::find($id);
        
        if (!$pet) {
            return json(['code' => 404, 'msg' => '宠物不存在']);
        }
        
        $pet->status = 0;
        $pet->save();
        
        return json(['code' => 200, 'msg' => '删除成功']);
    }
}
