var currentType = 'all';
var currentFilter = 'all';
var keyword = '';

document.addEventListener('DOMContentLoaded', function() {
    var urlParams = new URLSearchParams(window.location.search);
    keyword = urlParams.get('keyword') || '';
    document.getElementById('searchInput').value = keyword;
    
    document.getElementById('searchInput').addEventListener('keyup', function(e) {
        if (e.keyCode === 13) {
            keyword = this.value;
            loadPets();
        }
    });
    
    document.getElementById('tabAll').addEventListener('click', function() {
        setActiveTab('tabAll');
        currentFilter = 'all';
        loadPets();
    });
    
    document.getElementById('tabLatest').addEventListener('click', function() {
        setActiveTab('tabLatest');
        currentFilter = 'latest';
        loadPets();
    });
    
    document.getElementById('tabNear').addEventListener('click', function() {
        setActiveTab('tabNear');
        currentFilter = 'near';
        loadPets();
    });
    
    document.querySelectorAll('.type-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.type-btn').forEach(function(b) {
                b.classList.remove('active');
            });
            this.classList.add('active');
            currentType = this.dataset.type;
            loadPets();
        });
    });
    
    loadPets();
});

function setActiveTab(tabId) {
    document.querySelectorAll('.filter-tab').forEach(function(tab) {
        tab.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');
}

function loadPets() {
    var data = {
        type: currentType === 'all' ? '' : currentType,
        keyword: keyword
    };
    
    ajax({
        url: '/api/pets',
        method: 'GET',
        data: data,
        success: function(response) {
            if (response.code === 200 && response.data && response.data.list) {
                renderPets(response.data.list);
            }
        },
        error: function() {
            loadMockPets();
        }
    });
}

function loadMockPets() {
    var pets = [
        { id: 1, name: 'Chidi', age: '2岁', type: 'cat', location: '西安市.北大街', image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=beautiful%20fluffy%20gray%20cat%20portrait%20elegant%20pose&image_size=square_hd' },
        { id: 2, name: 'Yael', age: '3岁', type: 'dog', location: '西安市.北大街', image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20beagle%20dog%20lying%20down%20happy%20expression&image_size=square_hd' },
        { id: 3, name: 'Bella', age: '1岁', type: 'dog', location: '西安市.南大街', image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=white%20fluffy%20dog%20being%20squeezed%20cute%20face&image_size=square_hd' },
        { id: 4, name: 'Mochi', age: '2岁', type: 'cat', location: '西安市.东大街', image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=gray%20british%20shorthair%20cat%20on%20grass%20peaceful&image_size=square_hd' },
        { id: 5, name: 'Max', age: '4岁', type: 'dog', location: '西安市.西大街', image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=golden%20retriever%20dog%20happy%20smiling&image_size=square_hd' },
        { id: 6, name: 'Luna', age: '1岁', type: 'cat', location: '西安市.高新区', image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=orange%20tabby%20cat%20playful%20cute&image_size=square_hd' },
        { id: 7, name: 'Charlie', age: '5岁', type: 'dog', location: '西安市.未央区', image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=bulldog%20dog%20relaxed%20friendly&image_size=square_hd' },
        { id: 8, name: 'Lucy', age: '3岁', type: 'cat', location: '西安市.雁塔区', image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=siamese%20cat%20elegant%20blue%20eyes&image_size=square_hd' }
    ];
    
    if (currentType !== 'all') {
        pets = pets.filter(function(pet) {
            return pet.type === currentType;
        });
    }
    
    if (keyword) {
        pets = pets.filter(function(pet) {
            return pet.name.toLowerCase().includes(keyword.toLowerCase()) || 
                   pet.location.toLowerCase().includes(keyword.toLowerCase());
        });
    }
    
    renderPets(pets);
}

function renderPets(pets) {
    var container = document.getElementById('petsContainer');
    
    if (pets.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🐾</div>
                <p class="empty-text">暂无符合条件的宠物</p>
                <button class="empty-btn" onclick="goToPage('pets.html')">重新搜索</button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = '';
    
    pets.forEach(function(pet) {
        var col = document.createElement('div');
        col.className = 'am-col-xs-6 am-col-sm-4 am-col-md-3';
        
        var card = document.createElement('div');
        card.className = 'pet-card';
        card.onclick = function() {
            window.location.href = 'pet-detail.html?id=' + pet.id;
        };
        
        var imageWrapper = document.createElement('div');
        imageWrapper.className = 'pet-image-wrapper';
        
        var img = document.createElement('img');
        img.src = pet.image;
        img.alt = pet.name;
        img.className = 'pet-image';
        
        imageWrapper.appendChild(img);
        card.appendChild(imageWrapper);
        
        var body = document.createElement('div');
        body.className = 'pet-card-body';
        
        var nameRow = document.createElement('div');
        nameRow.className = 'pet-name-row';
        
        var name = document.createElement('span');
        name.className = 'pet-name';
        name.textContent = pet.name;
        
        var age = document.createElement('span');
        age.className = 'pet-age';
        age.textContent = pet.age;
        
        nameRow.appendChild(name);
        nameRow.appendChild(age);
        body.appendChild(nameRow);
        
        var metaRow = document.createElement('div');
        metaRow.className = 'pet-meta-row';
        
        var type = document.createElement('span');
        type.className = 'pet-type ' + pet.type;
        
        var dot = document.createElement('span');
        dot.className = 'type-dot';
        type.appendChild(dot);
        
        var typeText = document.createElement('span');
        typeText.textContent = pet.type === 'dog' ? '狗狗' : '猫咪';
        type.appendChild(typeText);
        
        var location = document.createElement('span');
        location.className = 'pet-location';
        location.textContent = '📍 ' + pet.location;
        
        metaRow.appendChild(type);
        metaRow.appendChild(location);
        body.appendChild(metaRow);
        
        var distance = document.createElement('div');
        distance.className = 'pet-distance';
        
        var distanceIcon = document.createElement('span');
        distanceIcon.className = 'distance-icon';
        distanceIcon.textContent = '📍';
        
        var distanceText = document.createElement('span');
        distanceText.className = 'distance-text';
        distanceText.textContent = '<100m';
        
        distance.appendChild(distanceIcon);
        distance.appendChild(distanceText);
        body.appendChild(distance);
        
        card.appendChild(body);
        col.appendChild(card);
        container.appendChild(col);
    });
}
