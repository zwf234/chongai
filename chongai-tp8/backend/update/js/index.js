document.addEventListener('DOMContentLoaded', function() {
    loadPets();
    
    var searchInput = document.getElementById('globalSearch');
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.keyCode === 13) {
                var keyword = this.value;
                if (keyword) {
                    window.location.href = 'pets.html?keyword=' + encodeURIComponent(keyword);
                }
            }
        });
    }
    
    var oldSearchInput = document.getElementById('searchInput');
    if (oldSearchInput) {
        oldSearchInput.addEventListener('keyup', function(e) {
            if (e.keyCode === 13) {
                var keyword = this.value;
                if (keyword) {
                    window.location.href = 'pets.html?keyword=' + encodeURIComponent(keyword);
                }
            }
        });
    }
});

function loadPets() {
    ajax({
        url: '/api/pets',
        method: 'GET',
        data: { limit: 4 },
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
        { id: 1, name: '罐头', type: 'cat', location: '大兴医院', image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20white%20cat%20fluffy&image_size=square', tag: '最多点击' },
        { id: 2, name: 'Admin', type: 'dog', location: '北京市', image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20golden%20retriever%20puppy&image_size=square' },
        { id: 3, name: 'Chidi', type: 'cat', location: '西安市', image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=beautiful%20fluffy%20gray%20cat%20portrait%20elegant%20pose&image_size=square_hd' },
        { id: 4, name: 'Yael', type: 'dog', location: '西安市', image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20beagle%20dog%20lying%20down%20happy%20expression&image_size=square_hd' }
    ];
    renderPets(pets);
}

function renderPets(pets) {
    var container = document.getElementById('petsContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    pets.forEach(function(pet) {
        var card = document.createElement('div');
        card.className = 'pet-card-new';
        card.onclick = function() {
            window.location.href = 'pet-detail.html?id=' + pet.id;
        };
        
        var imageWrapper = document.createElement('div');
        imageWrapper.className = 'pet-image-new';
        
        var img = document.createElement('img');
        img.src = pet.image;
        img.alt = pet.name;
        
        imageWrapper.appendChild(img);
        
        if (pet.tag) {
            var tag = document.createElement('div');
            tag.className = 'pet-tag-new';
            tag.textContent = pet.tag;
            imageWrapper.appendChild(tag);
        }
        
        card.appendChild(imageWrapper);
        
        var info = document.createElement('div');
        info.className = 'pet-info-new';
        
        var name = document.createElement('div');
        name.className = 'pet-name-new';
        name.textContent = pet.name;
        info.appendChild(name);
        
        var typeDetail = document.createElement('div');
        typeDetail.className = 'pet-detail-new';
        var typeDot = document.createElement('i');
        typeDot.className = 'fas fa-circle';
        typeDot.style.fontSize = '6px';
        typeDetail.appendChild(typeDot);
        var typeText = document.createElement('span');
        typeText.textContent = pet.type === 'dog' ? '狗狗' : '猫咪';
        typeDetail.appendChild(typeText);
        info.appendChild(typeDetail);
        
        var locationDetail = document.createElement('div');
        locationDetail.className = 'pet-detail-new';
        var locationIcon = document.createElement('i');
        locationIcon.className = 'fas fa-map-marker-alt';
        locationDetail.appendChild(locationIcon);
        var locationText = document.createElement('span');
        locationText.textContent = pet.location;
        locationDetail.appendChild(locationText);
        info.appendChild(locationDetail);
        
        card.appendChild(info);
        container.appendChild(card);
    });
}
