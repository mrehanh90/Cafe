// splash screen — hide it once the page has loaded, regardless of what else is going on
window.addEventListener('load', () => {
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        if (splash) {
            splash.classList.add('split');
            setTimeout(() => { splash.style.display = 'none'; }, 800);
        }
    }, 2200);
});

let map;
let markers = [];
let clusterer;
let infoWindow;
let allCafes = [];

const cafeListEl = document.getElementById('cafeList');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');
const themeToggleBtn = document.getElementById('themeToggleBtn');
const nearMeBtn = document.getElementById('nearMeBtn');
const aiSearchBtn = document.getElementById('aiSearchBtn');
const statusMsg = document.getElementById('statusMsg');

let currentFilter = 'all';
let searchQuery = '';

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

window.initMap = function () {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 33.7180, lng: 73.0550 },
        zoom: 13,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        styles: null
    });

    infoWindow = new google.maps.InfoWindow();
    loadCafes();
};

themeToggleBtn.addEventListener('click', () => {
    const body = document.body;
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        themeToggleBtn.textContent = '🌙 Dark Mode';
        map.setOptions({ styles: null });
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        themeToggleBtn.textContent = '☀️ Light Mode';
        map.setOptions({ styles: darkMapStyle });
    }
});

function showStatus(msg) {
    statusMsg.textContent = msg;
    statusMsg.hidden = false;
}
function hideStatus() {
    statusMsg.hidden = true;
}

async function loadCafes() {
    try {
        const res = await fetch('/api/cafes');
        allCafes = await res.json();
        displayCafes(allCafes);
    } catch (err) {
        // backend probably isn't running — this happens a lot in local dev
        console.error('could not reach backend, is server.js running?', err);
        cafeListEl.innerHTML = `<p style="text-align:center; margin-top:20px;">
            Couldn't load cafes — make sure the backend server is running (<code>npm start</code>).
        </p>`;
    }
}

function displayCafes(cafeArray) {
    cafeListEl.innerHTML = '';

    markers.forEach(m => m.setMap(null));
    markers = [];
    if (clusterer) clusterer.clearMarkers();

    if (cafeArray.length === 0) {
        cafeListEl.innerHTML = `<p style="text-align:center; color:#888; margin-top:20px;">No cafes found matching criteria.</p>`;
        return;
    }

    cafeArray.forEach(cafe => {
        const card = document.createElement('div');
        card.className = 'cafe-card';
        card.innerHTML = `
            <h3>${cafe.name}</h3>
            <p>${cafe.address} • <strong>${cafe.rating}</strong></p>
            <p>${cafe.description}</p>
            <div>${cafe.features.map(f => `<span class="badge">${f.toUpperCase()}</span>`).join('')}</div>
        `;
        cafeListEl.appendChild(card);

        if (!cafe.lat || !cafe.lng) return; // a few entries in the dataset don't have confirmed coords

        card.addEventListener('click', () => {
            map.setCenter({ lat: cafe.lat, lng: cafe.lng });
            map.setZoom(16);
            openInfoWindow(cafe, findMarkerFor(cafe));
        });

        const marker = new google.maps.Marker({
            position: { lat: cafe.lat, lng: cafe.lng },
            title: cafe.name,
        });
        marker.cafeId = cafe.id;

        marker.addListener('click', () => openInfoWindow(cafe, marker));
        markers.push(marker);
    });

    // markerClusterer is the UMD global exposed by the script tag in index.html
    clusterer = new markerClusterer.MarkerClusterer({ map, markers });
}

function findMarkerFor(cafe) {
    return markers.find(m => m.cafeId === cafe.id);
}

function openInfoWindow(cafe, marker) {
    infoWindow.setContent(`
        <div style="padding:6px; color:#333;">
            <h3 style="margin-bottom:3px; color:#d84315;">${cafe.name}</h3>
            <p style="margin:0; font-size:12px;">${cafe.address}</p>
            <p style="margin:3px 0 0; font-weight:bold;">${cafe.rating}</p>
        </div>
    `);
    infoWindow.open(map, marker);
}

// normal search + filter, hits the backend so filtering logic only lives in one place
async function runFilter() {
    const params = new URLSearchParams({ query: searchQuery, feature: currentFilter });
    const res = await fetch(`/api/cafes?${params}`);
    const result = await res.json();
    displayCafes(result);
}

searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim();
    runFilter();
});

filterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        currentFilter = e.target.getAttribute('data-filter');
        runFilter();
    });
});

// "near me" — needs geolocation permission, falls back gracefully if denied
nearMeBtn.addEventListener('click', () => {
    if (!navigator.geolocation) {
        showStatus("Your browser doesn't support geolocation.");
        return;
    }
    nearMeBtn.disabled = true;
    showStatus('Finding cafes near you...');

    navigator.geolocation.getCurrentPosition(
        async (pos) => {
            const { latitude, longitude } = pos.coords;
            try {
                const res = await fetch(`/api/cafes/near?lat=${latitude}&lng=${longitude}`);
                const sorted = await res.json();
                displayCafes(sorted);
                map.setCenter({ lat: latitude, lng: longitude });
                map.setZoom(14);
                showStatus(`Showing cafes closest to your location, nearest first.`);
            } catch (err) {
                showStatus('Something went wrong fetching nearby cafes.');
            }
            nearMeBtn.disabled = false;
        },
        () => {
            showStatus('Location access was denied — enable it in your browser to use this.');
            nearMeBtn.disabled = false;
        }
    );
});

// AI search — sends free text to the backend, which asks Claude to pick relevant cafes
aiSearchBtn.addEventListener('click', async () => {
    const query = searchInput.value.trim();
    if (!query) {
        showStatus('Type something first, e.g. "quiet cafe with wifi near F-7".');
        return;
    }

    aiSearchBtn.disabled = true;
    showStatus('Asking AI for recommendations...');

    try {
        const res = await fetch('/api/ai-search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query }),
        });

        if (!res.ok) throw new Error('bad response');

        const results = await res.json();
        displayCafes(results);
        showStatus(results.length ? `AI found ${results.length} match(es) for you.` : "AI couldn't find a good match — try rephrasing.");
    } catch (err) {
        showStatus('AI search is unavailable right now.');
    }

    aiSearchBtn.disabled = false;
});
