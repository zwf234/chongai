document.addEventListener('DOMContentLoaded', function() {
    loadPets();
    
    document.getElementById('searchInput').addEventListener('keyup', function(e) {
        if (e.keyCode === 13) {
            var keyword = this.value;
            if (keyword) {
                window.location.href = 'pets.html?keyword=' + encodeURIComponent(keyword);
            }
        }
    });
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
        { id: 1, name: 'Chidi', age: '2岁', type: 'cat', location: '西安市.北大街', image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=beautiful%20fluffy%20gray%20cat%20portrait%20elegant%20pose&image_size=square_hd' },
        { id: 2, name: 'Yael', age: '3岁', type: 'dog', location: '西安市.北大街', image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20beagle%20dog%20lying%20down%20happy%20expression&image_size=square_hd' },
        { id: 3, name: 'Bella', age: '1岁', type: 'dog', location: '西安市.南大街', image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=white%20fluffy%20dog%20being%20squeezed%20cute%20face&image_size=square_hd' },
        { id: 4, name: 'Mochi', age: '2岁', type: 'cat', location: '西安市.东大街', image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=gray%20british%20shorthair%20cat%20on%20grass%20peaceful&image_size=square_hd' }
    ];
    renderPets(pets);
}

function renderPets(pets) {
    var container = document.getElementById('petsContainer');
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
