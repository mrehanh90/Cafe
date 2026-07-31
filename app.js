// ==========================================
// 1. DATASET WITH CORRECTED E-7 PIN LOCATION FOR BREW
// ==========================================
const cafes = [
  {
  id: 1,
  name: "Brew",
  address: "Shaheen Market, Street 12, Sector E-7, Islamabad, Pakistan",
  lat: 33.728392,
  lng: 73.051847,
  features: ["wifi", "quiet"],
  rating: "⭐ 4.8",
  description: "Specialty coffee shop popular for handcrafted coffee and workspace."
}
];

// ==========================================
// 2. SPLASH ANIMATION TRIGGER
// ==========================================
window.addEventListener('load', () => {
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        if (splash) {
            splash.classList.add('split');
            setTimeout(() => {
                splash.style.display = 'none';
            }, 800);
        }
    }, 2200);
});

// ==========================================
// 3. MAP STYLING & DYNAMIC THEME SWITCHER
// ==========================================
let map;
let markers = [];
let infoWindow;
const cafeListEl = document.getElementById('cafeList');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');
const themeToggleBtn = document.getElementById('themeToggleBtn');

let currentFilter = 'all';
let searchQuery = '';

// Dark Map Styles
const darkMapStyle = [
    { elementType: "geometry", stylers: [{ color: "#212121" }] },
    { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
    { featureType: "administrative", elementType: "geometry", stylers: [{ color: "#757575" }] },
    { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
    { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#181818" }] },
    { featureType: "road", elementType: "geometry", stylers: [{ color: "#2c2c2c" }] },
    { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#3c3c3c" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#000000" }] }
];

window.initMap = function() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 33.7180, lng: 73.0550 },
        zoom: 13,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        styles: darkMapStyle // Default Dark Theme Map
    });

    infoWindow = new google.maps.InfoWindow();
    displayCafes(cafes);
};

// Toggle Theme Event Listener
themeToggleBtn.addEventListener('click', () => {
    const body = document.body;
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        themeToggleBtn.textContent = '🌙 Dark Mode';
        map.setOptions({ styles: null }); // Switch map to standard Google light style
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        themeToggleBtn.textContent = '☀️ Light Mode';
        map.setOptions({ styles: darkMapStyle }); // Switch map to dark style
    }
});

// ==========================================
// 4. RENDER LIST & MARKERS
// ==========================================
function displayCafes(filteredCafes) {
    cafeListEl.innerHTML = '';
    
    markers.forEach(marker => marker.setMap(null));
    markers = [];

    if (filteredCafes.length === 0) {
        cafeListEl.innerHTML = `<p style="text-align:center; color:#888; margin-top:20px;">No cafes found matching criteria.</p>`;
        return;
    }

    filteredCafes.forEach(cafe => {
        const card = document.createElement('div');
        card.className = 'cafe-card';
        card.innerHTML = `
            <h3>${cafe.name}</h3>
            <p>${cafe.address} • <strong>${cafe.rating}</strong></p>
            <p>${cafe.description}</p>
            <div>
                ${cafe.features.map(f => `<span class="badge">${f.toUpperCase()}</span>`).join('')}
            </div>
        `;

        card.addEventListener('click', () => {
            map.setCenter({ lat: cafe.lat, lng: cafe.lng });
            map.setZoom(16);
            infoWindow.setContent(`
                <div style="padding:6px; color:#333;">
                    <h3 style="margin-bottom:3px; color:#d84315;">${cafe.name}</h3>
                    <p style="margin:0; font-size:12px;">${cafe.address}</p>
                    <p style="margin:3px 0 0; font-weight:bold;">${cafe.rating}</p>
                </div>
            `);
            infoWindow.open(map, marker);
        });

        cafeListEl.appendChild(card);

        const marker = new google.maps.Marker({
            position: { lat: cafe.lat, lng: cafe.lng },
            map: map,
            title: cafe.name,
            animation: google.maps.Animation.DROP
        });

        marker.addListener('click', () => {
            infoWindow.setContent(`
                <div style="padding:6px; color:#333;">
                    <h3 style="margin-bottom:3px; color:#d84315;">${cafe.name}</h3>
                    <p style="margin:0; font-size:12px;">${cafe.address}</p>
                    <p style="margin:3px 0 0; font-weight:bold;">${cafe.rating}</p>
                </div>
            `);
            infoWindow.open(map, marker);
        });

        markers.push(marker);
    });
}

// ==========================================
// 5. FILTER & SEARCH LOGIC
// ==========================================
function filterAndSearchData() {
    let result = cafes.filter(cafe => {
        const matchesSearch = cafe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              cafe.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              cafe.description.toLowerCase().includes(searchQuery.toLowerCase());
        
        let matchesFilter = true;
        if (currentFilter !== 'all') {
            matchesFilter = cafe.features.includes(currentFilter);
        }

        return matchesSearch && matchesFilter;
    });

    displayCafes(result);
}

searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim();
    filterAndSearchData();
});

filterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        currentFilter = e.target.getAttribute('data-filter');
        filterAndSearchData();
    });
});