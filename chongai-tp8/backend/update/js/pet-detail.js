var petId = 0;
var isFavorite = false;

document.addEventListener('DOMContentLoaded', function() {
    var urlParams = new URLSearchParams(window.location.search);
    petId = parseInt(urlParams.get('id')) || 1;
    
    document.getElementById('applyForm').addEventListener('submit', function(e) {
        e.preventDefault();
        submitApplication();
    });
    
    loadPetDetail();
});

function goBack() {
    window.history.back();
}

function loadPetDetail() {
    ajax({
        url: '/api/pet/' + petId,
        method: 'GET',
        success: function(response) {
            if (response.code === 200 && response.data) {
                renderPet(response.data);
            }
        },
        error: function() {
            loadMockPet();
        }
    });
}

function loadMockPet() {
    var pet = {
        id: petId,
        name: 'Chidi',
        age: '2岁',
        type: 'cat',
        breed: '英国短毛猫',
        gender: 'female',
        location: '西安市.北大街',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=beautiful%20fluffy%20gray%20cat%20portrait%20elegant%20pose&image_size=square_hd',
        description: 'Chidi是一只非常温顺的猫咪，性格活泼可爱。她喜欢被抚摸，喜欢玩逗猫棒。已经完成疫苗接种和绝育手术，非常健康。希望能找到一个有爱心的家庭给她一个温暖的家。',
        requirements: ['有稳定的居住环境', '有养宠经验优先', '同意定期回访', '能提供良好的生活条件'],
        shelter: '西安市小动物保护协会',
        contact: '王女士',
        phone: '138****8888',
        vaccinated: 1
    };
    renderPet(pet);
}

function renderPet(pet) {
    document.getElementById('petImage').src = pet.image;
    document.getElementById('petName').textContent = pet.name;
    document.getElementById('petAge').textContent = pet.age;
    document.getElementById('petLocation').textContent = pet.location;
    document.getElementById('petBreed').textContent = pet.breed;
    document.getElementById('petGender').textContent = pet.gender === 'male' ? '雄性' : '雌性';
    document.getElementById('petVaccinated').textContent = pet.vaccinated ? '已接种' : '未接种';
    document.getElementById('petDescription').textContent = pet.description;
    document.getElementById('petShelter').textContent = pet.shelter;
    document.getElementById('petContact').textContent = pet.contact;
    document.getElementById('petPhone').textContent = pet.phone;
    
    var badge = document.getElementById('petTypeBadge');
    badge.textContent = (pet.type === 'dog' ? '🐕 狗狗' : '🐱 猫咪');
    badge.className = 'pet-type-badge ' + pet.type;
    
    var requirements = document.getElementById('petRequirements');
    requirements.innerHTML = '';
    pet.requirements.forEach(function(req) {
        var li = document.createElement('li');
        li.className = 'requirement-item';
        li.innerHTML = '<span class="check-icon">✓</span>' + req;
        requirements.appendChild(li);
    });
}

function toggleFavorite() {
    var btn = document.getElementById('favoriteBtn');
    isFavorite = !isFavorite;
    btn.textContent = isFavorite ? '❤️' : '🤍';
    
    if (isFavorite) {
        ajax({
            url: '/api/favorite',
            method: 'POST',
            data: { pet_id: petId },
            success: function(response) {
                if (response.code === 200) {
                    showModal('收藏成功');
                }
            },
            error: function() {
                showModal('请先登录');
                isFavorite = false;
                btn.textContent = '🤍';
            }
        });
    } else {
        showModal('已取消收藏');
    }
}

function sharePet() {
    showModal('分享功能开发中');
}

function showApplyModal() {
    document.getElementById('applyModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('applyModal').style.display = 'none';
}

function submitApplication() {
    var name = document.getElementById('applyName').value;
    var phone = document.getElementById('applyPhone').value;
    var address = document.getElementById('applyAddress').value;
    var experience = document.getElementById('applyExperience').value;
    var reason = document.getElementById('applyReason').value;
    
    if (!name || !phone || !address) {
        showModal('请填写必填信息');
        return;
    }
    
    ajax({
        url: '/api/application',
        method: 'POST',
        data: {
            pet_id: petId,
            name: name,
            phone: phone,
            address: address,
            experience: experience,
            reason: reason
        },
        success: function(response) {
            if (response.code === 200) {
                closeModal();
                showModal('申请提交成功，我们会尽快与您联系');
            }
        },
        error: function() {
            showModal('请先登录');
        }
    });
}
