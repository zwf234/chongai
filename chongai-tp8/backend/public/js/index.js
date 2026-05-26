document.addEventListener('DOMContentLoaded', function() {
    loadPets();
    initCarousel();
    
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
});

// 轮播图功能
function initCarousel() {
    var currentIndex = 0;
    var items = document.querySelectorAll('.carousel-item');
    var dots = document.querySelectorAll('.dot');
    var totalItems = items.length;
    
    if (totalItems === 0) return;
    
    function showSlide(index) {
        var track = document.querySelector('.carousel-track');
        if (track) {
            track.style.transform = 'translateX(-' + (index * 100) + '%)';
        }
        
        dots.forEach(function(dot, i) {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalItems;
        showSlide(currentIndex);
    }
    
    // 点击圆点切换
    dots.forEach(function(dot, index) {
        dot.addEventListener('click', function() {
            currentIndex = index;
            showSlide(currentIndex);
        });
    });
    
    // 自动轮播
    setInterval(nextSlide, 4000);
}

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
        { id: 1, name: 'Chidi', age: '2岁', type: 'cat', breed: '英国短毛猫', location: '西安市.北大街', image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=beautiful%20fluffy%20gray%20cat%20portrait%20elegant%20pose&image_size=square_hd' },
        { id: 2, name: 'Yael', age: '3岁', type: 'dog', breed: '比格犬', location: '西安市.北大街', image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20beagle%20dog%20lying%20down%20happy%20expression&image_size=square_hd' },
        { id: 3, name: 'Bella', age: '1岁', type: 'dog', breed: '萨摩耶', location: '西安市.南大街', image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=white%20fluffy%20dog%20being%20squeezed%20cute%20face&image_size=square_hd' },
        { id: 4, name: 'Mochi', age: '2岁', type: 'cat', breed: '英短蓝猫', location: '西安市.东大街', image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=gray%20british%20shorthair%20cat%20on%20grass%20peaceful&image_size=square_hd' }
    ];
    renderPets(pets);
}

function renderPets(pets) {
    var container = document.getElementById('petsContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    pets.forEach(function(pet, index) {
        var card = document.createElement('div');
        card.className = 'pet-card fade-in-up';
        card.style.animationDelay = (index * 0.1) + 's';
        
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
        body.style.padding = '16px';
        
        var nameRow = document.createElement('div');
        nameRow.style.display = 'flex';
        nameRow.style.justifyContent = 'space-between';
        nameRow.style.alignItems = 'center';
        nameRow.style.marginBottom = '8px';
        
        var name = document.createElement('span');
        name.style.fontSize = '18px';
        name.style.fontWeight = '700';
        name.textContent = pet.name;
        
        var age = document.createElement('span');
        age.style.fontSize = '14px';
        age.style.color = 'var(--text-muted)';
        age.textContent = pet.age;
        
        nameRow.appendChild(name);
        nameRow.appendChild(age);
        body.appendChild(nameRow);
        
        var breed = document.createElement('div');
        breed.style.fontSize = '14px';
        breed.style.color = 'var(--text-muted)';
        breed.textContent = pet.breed || '';
        body.appendChild(breed);
        
        var location = document.createElement('div');
        location.style.fontSize = '13px';
        location.style.color = 'var(--text-muted)';
        location.style.marginTop = '4px';
        location.textContent = '📍 ' + pet.location;
        body.appendChild(location);
        
        card.appendChild(body);
        container.appendChild(card);
    });
}
