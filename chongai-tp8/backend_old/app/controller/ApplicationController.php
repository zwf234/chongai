<?php
namespace app\controller;

use think\Controller;
use think\facade\Request;
use app\model\Application;
use app\model\Pet;

class ApplicationController extends Controller
{
    public function add()
    {
        $userId = Request::user_id;
        $data = Request::post();
        
        $petId = $data['pet_id'] ?? 0;
        $name = $data['name'] ?? '';
        $phone = $data['phone'] ?? '';
        $address = $data['address'] ?? '';
        $experience = $data['experience'] ?? '';
        $reason = $data['reason'] ?? '';
        
        if (!$petId || !$name || !$phone || !$address) {
            return json(['code' => 400, 'msg' => '请填写完整信息']);
        }
        
        $exists = Application::where('user_id', $userId)
            ->where('pet_id', $petId)
            ->where('status', '<>', 'rejected')
            ->find();
        
        if ($exists) {
            return json(['code' => 400, 'msg' => '您已申请领养该宠物']);
        }
        
        $application = new Application();
        $application->user_id = $userId;
        $application->pet_id = $petId;
        $application->name = $name;
        $application->phone = $phone;
        $application->address = $address;
        $application->experience = $experience;
        $application->reason = $reason;
        $application->status = 'pending';
        
        $application->save();
        
        return json(['code' => 200, 'msg' => '申请提交成功']);
    }
    
    public function getList()
    {
        $userId = Request::user_id;
        
        $applications = Application::where('user_id', $userId)
            ->with('pet')
            ->order('created_at', 'desc')
            ->select();
        
        $result = [];
        foreach ($applications as $app) {
            $pet = Pet::find($app->pet_id);
            $result[] = [
                'id' => $app->id,
                'pet_id' => $app->pet_id,
                'pet_name' => $pet ? $pet->name : '',
                'pet_type' => $pet ? $pet->type : '',
                'pet_image' => $pet ? $pet->image : '',
                'status' => $app->status,
                'date' => $app->created_at,
                'description' => $app->reason
            ];
        }
        
        return json([
            'code' => 200,
            'msg' => '获取成功',
            'data' => $result
        ]);
    }
    
    public function update($id)
    {
        $userId = Request::user_id;
        
        $application = Application::where('id', $id)
            ->where('user_id', $userId)
            ->find();
        
        if (!$application) {
            return json(['code' => 404, 'msg' => '申请不存在']);
        }
        
        $data = Request::put();
        $status = $data['status'] ?? '';
        
        if (!in_array($status, ['pending', 'approved', 'rejected'])) {
            return json(['code' => 400, 'msg' => '无效的状态']);
        }
        
        $application->status = $status;
        $application->save();
        
        return json(['code' => 200, 'msg' => '更新成功']);
    }
}
