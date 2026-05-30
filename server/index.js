const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const pets = [
  { id: 1, name: '小黄', type: '狗', breed: '金毛', age: 2, gender: '公', weight: 25, location: '北京', status: 'available', description: '温顺可爱，喜欢玩耍', image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=cute%20golden%20retriever%20dog%20portrait%20warm%20lighting&size=medium' },
  { id: 2, name: '花花', type: '猫', breed: '橘猫', age: 1, gender: '母', weight: 4, location: '上海', status: 'available', description: '性格粘人，爱撒娇', image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=cute%20orange%20tabby%20cat%20portrait%20warm%20lighting&size=medium' },
  { id: 3, name: '旺财', type: '狗', breed: '柴犬', age: 3, gender: '公', weight: 18, location: '广州', status: 'available', description: '表情包明星，笑容灿烂', image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=cute%20shiba%20inu%20dog%20smiling%20portrait&size=medium' },
  { id: 4, name: '咪咪', type: '猫', breed: '英短', age: 2, gender: '母', weight: 5, location: '深圳', status: 'pending', description: '优雅高贵，性格温顺', image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=cute%20british%20shorthair%20cat%20portrait%20blue%20grey&size=medium' },
  { id: 5, name: '大黑', type: '狗', breed: '拉布拉多', age: 4, gender: '公', weight: 30, location: '成都', status: 'available', description: '聪明懂事，适合家庭', image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=cute%20black%20labrador%20retriever%20portrait&size=medium' },
  { id: 6, name: '雪球', type: '猫', breed: '布偶', age: 1, gender: '公', weight: 3, location: '杭州', status: 'available', description: '仙气飘飘，颜值担当', image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=cute%20ragdoll%20cat%20blue%20eyes%20portrait&size=medium' },
  { id: 7, name: '豆豆', type: '狗', breed: '泰迪', age: 2, gender: '母', weight: 5, location: '武汉', status: 'available', description: '小巧玲珑，聪明伶俐', image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=cute%20teddy%20poodle%20dog%20portrait%20curly%20hair&size=medium' },
  { id: 8, name: '橘子', type: '猫', breed: '田园猫', age: 3, gender: '公', weight: 6, location: '西安', status: 'available', description: '健康活泼，适应性强', image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=cute%20tabby%20cat%20portrait%20warm%20colors&size=medium' }
];

const users = [
  { id: 1, phone: '13800138000', password: '123456', name: '张三', avatar: '' },
  { id: 2, phone: '13900139000', password: '654321', name: '李四', avatar: '' }
];

const applications = [];
const favorites = [];
let userIdCounter = 3;
let appIdCounter = 1;

app.post('/api/login', (req, res) => {
  const { phone, password } = req.body;
  const user = users.find(u => u.phone === phone && u.password === password);
  if (user) {
    res.json({ success: true, data: { id: user.id, phone: user.phone, name: user.name, avatar: user.avatar } });
  } else {
    res.json({ success: false, message: '手机号或密码错误' });
  }
});

app.post('/api/register', (req, res) => {
  const { phone, password, name } = req.body;
  if (users.find(u => u.phone === phone)) {
    res.json({ success: false, message: '手机号已注册' });
    return;
  }
  const newUser = { id: userIdCounter++, phone, password, name, avatar: '' };
  users.push(newUser);
  res.json({ success: true, data: newUser });
});

app.get('/api/pets', (req, res) => {
  const { type, page = 1, limit = 10 } = req.query;
  let filteredPets = pets;
  if (type && type !== 'all') {
    filteredPets = pets.filter(p => p.type === type);
  }
  const start = (page - 1) * limit;
  const end = start + parseInt(limit);
  res.json({
    success: true,
    data: filteredPets.slice(start, end),
    total: filteredPets.length
  });
});

app.get('/api/pets/:id', (req, res) => {
  const pet = pets.find(p => p.id === parseInt(req.params.id));
  if (pet) {
    res.json({ success: true, data: pet });
  } else {
    res.json({ success: false, message: '宠物不存在' });
  }
});

app.get('/api/favorites', (req, res) => {
  const { userId } = req.query;
  const userFavorites = favorites.filter(f => f.userId === parseInt(userId));
  const favPets = userFavorites.map(f => pets.find(p => p.id === f.petId)).filter(Boolean);
  res.json({ success: true, data: favPets });
});

app.post('/api/favorites', (req, res) => {
  const { userId, petId } = req.body;
  const existing = favorites.find(f => f.userId === userId && f.petId === petId);
  if (existing) {
    res.json({ success: false, message: '已收藏' });
    return;
  }
  favorites.push({ userId, petId });
  res.json({ success: true, message: '收藏成功' });
});

app.delete('/api/favorites', (req, res) => {
  const { userId, petId } = req.query;
  const index = favorites.findIndex(f => f.userId === parseInt(userId) && f.petId === parseInt(petId));
  if (index !== -1) {
    favorites.splice(index, 1);
    res.json({ success: true, message: '取消收藏成功' });
  } else {
    res.json({ success: false, message: '未找到收藏记录' });
  }
});

app.post('/api/applications', (req, res) => {
  const { userId, petId, reason, phone, address } = req.body;
  const existing = applications.find(a => a.userId === userId && a.petId === petId && a.status !== 'rejected');
  if (existing) {
    res.json({ success: false, message: '您已提交过领养申请' });
    return;
  }
  const application = {
    id: appIdCounter++,
    userId,
    petId,
    reason,
    phone,
    address,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  applications.push(application);
  res.json({ success: true, data: application });
});

app.get('/api/applications', (req, res) => {
  const { userId } = req.query;
  const userApps = applications.filter(a => a.userId === parseInt(userId));
  const result = userApps.map(a => ({
    ...a,
    pet: pets.find(p => p.id === a.petId)
  }));
  res.json({ success: true, data: result });
});

app.get('/api/user/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    res.json({ success: true, data: user });
  } else {
    res.json({ success: false, message: '用户不存在' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});