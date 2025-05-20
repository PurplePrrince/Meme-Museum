const memes = [
    {
    title: 'Чёрный котик',
    category: 'cat',
    year: 2025,
    description: 'Кот предупреждает, что сейчас будет делать что-то стыдное и не будет извиняться',
    source: 'TikTok',
    image: 'img/cat1.png',
    ratings: [],
    avgRating: 0
    },
    {
    title: 'Котик хочет булку',
    category: 'cat',
    year: 2025,
    description: 'Один котик хочет съесть другого кота, думая что он булка, но потом они разрешили свой конфликт мирно',
    source: 'TikTok',
    image: 'img/cat 2.png',
    ratings: [],
    avgRating: 0
    },
    {
    title: 'Смешной мем с котом',
    category: 'cat',
    year: 2025,
    description: 'Кот предупреждает, что до завтра остался 1 день',
    source: 'TikTok',
    image: 'img/cat 3.png',
    ratings: [],
    avgRating: 0
    },
    {
    title: 'Водила',
    category: 'cat',
    year: 2025,
    description: 'Котик сел в такси и очень спешит, он просит водителя везти его поскорее',
    source: 'TikTok',
    image: 'img/cat 4.png',
    ratings: [],
    avgRating: 0
    },
    {
    title: 'Дорого',
    category: 'cat',
    year: 2025,
    description: 'Кот грустит, потому что тратит больше чем зарабатывает',
    source: 'TikTok',
    image: 'img/cat 5.png',
    ratings: [],
    avgRating: 0
    },
    {
    title: 'Кот-бизнесмен',
    category: 'cat',
    year: 2025,
    description: 'Кот в галстуке оправдывается, почему снова пропустил дедлайны',
    source: 'TikTok',
    image: 'img/cat 6.png',
    ratings: [],
    avgRating: 0
    },
    {
    title: 'Смешной треугольник',
    category: 'math',
    year: 2025,
    description: 'Треугольник хвастается, что он правильный, за что его и осуждают',
    source: 'TikTok',
    image: 'img/math 2.png',
    ratings: [],
    avgRating: 0
    },
    {
    title: 'Теорема КОТсинусов',
    category: 'math',
    year: 2025,
    description: 'Есть наглядный пример математики, один кот нормальный, другой заматематен',
    source: 'TikTok',
    image: 'img/math 1.png',
    ratings: [],
    avgRating: 0
    },
    {
    title: 'Держи кибержабу',
    category: 'frog',
    year: 2025,
    description: 'Хорошая версия мема "... держи жабу"',
    source: 'TikTok',
    image: 'img/frog 1.png',
    ratings: [],
    avgRating: 0
    },
    {
    title: 'Хлебная жаба',
    category: 'frog',
    year: 2025,
    description: 'Неудачная попытка сделать хлебную жабу',
    source: 'Twitter/X',
    image: 'img/forg 2.png',
    ratings: [],
    avgRating: 0
    },
    {
    title: 'Комикс про смешную жабу',
    category: 'frog',
    year: 2025,
    description: 'Котик спрашивает жабу как у нее дела, но она просто маринуется в болоте и ей хорошо',
    source: 'TikTok',
    image: 'img/frog 3.png',
    ratings: [],
    avgRating: 0
    },
    {
    title: 'Любвеобильный мем',
    category: 'frog',
    year: 2025,
    description: 'Жабка смешно высовывает язык, из чего можно составить фразу "I ♥ you',
    source: 'TikTok',
    image: 'img/frog 4.png',
    ratings: [],
    avgRating: 0
    },
];

const gallery = document.getElementById('gallery');
const searchInput = document.getElementById('search');
const categoryButtons = document.querySelectorAll('nav button');
const modal = document.getElementById('meme-modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalYear = document.getElementById('modal-year');
const modalSource = document.getElementById('modal-source');
const modalRating = document.getElementById('modal-rating');
const modalStars = document.getElementById('modal-stars');
const likeBtn = document.getElementById('like-btn');
const dislikeBtn = document.getElementById('dislike-btn');
const closeButtons = document.querySelectorAll('.close');
const addButton = document.getElementById('add-meme-button');
const addModal = document.getElementById('add-meme-modal');
const addForm = document.getElementById('add-meme-form');
const thankYou = document.getElementById('thank-you');
const logo = document.querySelector('.logo');

let currentFilter = 'math';
let currentMemeIndex = -1;
let clickCount = 0;
let logoPosition = 0;

// Инициализация рейтингов
function initRatings() {
    memes.forEach(meme => {
        meme.ratings = [];
        meme.avgRating = 0;
    });
}

function updateMemeRating(meme) {
    if (meme.ratings.length === 0) {
        meme.avgRating = 0;
        return;
    }
    const sum = meme.ratings.reduce((a, b) => a + b, 0);
    meme.avgRating = sum / meme.ratings.length;
}

function displayStars(rating) {
    rating = Math.max(0, Math.min(5, rating));
    
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    
    let stars = '';
    for (let i = 0; i < fullStars; i++) {
        stars += '★';
    }
    if (halfStar) {
        stars += '⯨';
    }
    for (let i = 0; i < emptyStars; i++) {
        stars += '☆';
    }
    
    return stars;
}

function findMostPopularMeme() {
    if (memes.length === 0) return -1;
    
    let maxRating = memes[0].avgRating;
    let maxIndex = 0;
    
    for (let i = 1; i < memes.length; i++) {
        if (memes[i].avgRating > maxRating) {
            maxRating = memes[i].avgRating;
            maxIndex = i;
        }
    }
    
    return maxRating > 0 ? maxIndex : -1;
}

likeBtn.addEventListener('click', () => {
    if (currentMemeIndex !== -1) {
        memes[currentMemeIndex].ratings.push(5);
        updateMemeRating(memes[currentMemeIndex]);
        memes[currentMemeIndex].avgRating = Math.min(5, memes[currentMemeIndex].avgRating);
        modalRating.textContent = memes[currentMemeIndex].avgRating.toFixed(1);
        modalStars.textContent = displayStars(memes[currentMemeIndex].avgRating);

        likeBtn.style.transform = 'scale(1.3)';
        setTimeout(() => {
            likeBtn.style.transform = '';
        }, 300);
        
        displayMemes(currentFilter);
    }
});

dislikeBtn.addEventListener('click', () => {
    if (currentMemeIndex !== -1) {
        memes[currentMemeIndex].ratings.push(0);
        updateMemeRating(memes[currentMemeIndex]);
        memes[currentMemeIndex].avgRating = Math.max(0, memes[currentMemeIndex].avgRating);
        modalRating.textContent = memes[currentMemeIndex].avgRating.toFixed(1);
        modalStars.textContent = displayStars(memes[currentMemeIndex].avgRating);
        
        dislikeBtn.style.transform = 'scale(1.3)';
        setTimeout(() => {
            dislikeBtn.style.transform = '';
        }, 300);
        
        displayMemes(currentFilter);
    }
});

function displayMemes(filter = currentFilter) {
    gallery.innerHTML = '';
    currentFilter = filter;
    
    const filtered = memes.filter(meme => {
    const inCategory = filter ? meme.category === filter : true;
    const inSearch = meme.title.toLowerCase().includes(searchInput.value.toLowerCase()) ||
                        meme.description.toLowerCase().includes(searchInput.value.toLowerCase()) ||
                        meme.category.toLowerCase().includes(searchInput.value.toLowerCase());
    return inCategory && inSearch;
    });

    const popularIndex = findMostPopularMeme();
    
    filtered.forEach((meme, index) => {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    if (popularIndex !== -1 && memes.indexOf(meme) === popularIndex) {
        div.classList.add('popular');
    }
    div.innerHTML = `<img src="${meme.image}" alt="${meme.title}">`;
    div.addEventListener('click', () => {
        currentMemeIndex = memes.indexOf(meme);
        openMemeModal(meme);
    });
    gallery.appendChild(div);
    });
}

function openMemeModal(meme) {
    modalImg.src = meme.image;
    modalTitle.textContent = meme.title;
    modalDescription.textContent = meme.description;
    modalYear.textContent = meme.year;
    modalSource.textContent = meme.source;
    modalRating.textContent = meme.avgRating.toFixed(1);
    modalStars.textContent = displayStars(meme.avgRating);
    
    modal.style.display = 'block';
    setTimeout(() => {
    modal.classList.add('show');
    }, 10);
}

function closeModals() {
    modal.classList.remove('show');
    addModal.classList.remove('show');
    
    setTimeout(() => {
    modal.style.display = 'none';
    addModal.style.display = 'none';
    }, 300);
}

function animateCategoryButton(button) {
    button.style.transform = 'scale(1.1)';
    button.style.boxShadow = '0 0 15px rgba(255,105,180,0.7)';
    
    setTimeout(() => {
    button.style.transform = '';
    button.style.boxShadow = '';
    }, 300);
}

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
    categoryButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    animateCategoryButton(button);
    displayMemes(button.dataset.category);
    });
});

searchInput.addEventListener('input', () => displayMemes());

closeButtons.forEach(btn => btn.addEventListener('click', closeModals));

addButton.addEventListener('click', () => {
    addModal.style.display = 'block';
    thankYou.classList.add('hidden');
    addForm.reset();
    
    setTimeout(() => {
    addModal.classList.add('show');
    }, 10);
});

addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addForm.classList.add('hidden');
    thankYou.classList.remove('hidden');
    setTimeout(() => {
    closeModals();
    addForm.classList.remove('hidden');
    }, 2500);
});

// Пасхалка при клике на логотип
logo.addEventListener('click', (e) => {
    clickCount++;
    logoPosition += 10;
    logo.style.transform = `translateX(${logoPosition}px) rotate(${logoPosition}deg)`;
    
    if (clickCount === 5) {
    alert('Вы нашли секретный мем! 🥳');
    memes.push({
        title: 'Секретный мем',
        category: 'other',
        year: 2025,
        description: 'Этот мем посвящается всем нашедшим его',
        source: 'TikTok',
        image: 'img/easter egg.png',
        ratings: [],
        avgRating: 0
    });
    displayMemes();
    logo.style.transform = '';
    logoPosition = 0;
    }
});

// Инициализация
initRatings();
displayMemes();