// ==========================================
// 1. DATASET WITH CORRECTED E-7 PIN LOCATION FOR BREW


const cafes = [
  {
    id: 1,
    name: "Brew",
    address: "Block 4F, Shaheen Market, E-7, Islamabad, 44000, Pakistan",
    lat: 33.727251,
    lng: 73.047777,
    features: ["wifi", "quiet", "bakery"],
    rating: "⭐ 4.2",
    description: "Specialty coffee & bakery known for sourdough breads, salads and sandwiches; popular workspace spot."
  },
  {
    id: 2,
    name: "Loafology Bakery & Café",
    address: "Jinnah Ave, Area G-7/2, Blue Area, Islamabad, 44000, Pakistan",
    lat: 33.710643,
    lng: 73.058582,
    features: ["bakery", "breakfast", "family-friendly"],
    rating: "⭐ 4.3",
    description: "Popular mid-range bakery-café known for breakfast, croissants, bagels and all-day dining."
  },
  {
    id: 3,
    name: "Gloria Jean's Coffees",
    address: "Gol Market, Street 8, F-7/3, Islamabad, 44000, Pakistan",
    lat: 33.725980,
    lng: 73.057791,
    features: ["wifi", "modern", "coffee-chain"],
    rating: "⭐ 4.2",
    description: "International coffee chain branch with a modern, cozy setup; good for meetups or quiet work. (Note: found under F-7/3, not Kohsar Market F-6 as listed — may be a different branch.)"
  },
  {
    id: 4,
    name: "Street 1 Cafe",
    address: "Street 10, Kohsar Market, F-6/3, Islamabad, 44000, Pakistan",
    lat: 33.735468,
    lng: 73.078165,
    features: ["outdoor seating", "fine dining", "brunch"],
    rating: "⭐ 4.2",
    description: "Well-known Kohsar Market restaurant-café with relaxed outdoor seating, good for brunch, lunch or dinner."
  },
  {
    id: 5,
    name: "Mocca Coffee",
    address: "Street 1, Kohsar Market, Shop No. 1, F-6/3, Islamabad, Pakistan",
    lat: 33.735440,
    lng: 73.078068,
    features: ["wifi", "quiet", "minimalist"],
    rating: "⭐ 4.2",
    description: "Sleek, minimalist café favored for pour-over coffee, breakfast platters and laptop-friendly seating."
  },
  {
    id: 6,
    name: "Table Talk",
    address: "Shop #3, Kohsar Market, Street 3, F-6/3, Islamabad, Pakistan",
    lat: 33.735496,
    lng: 73.078231,
    features: ["cozy", "family-friendly", "desi & continental"],
    rating: "⭐ 3.5",
    description: "Cozy, bookshop-like restaurant in Kohsar Market serving thalis, English breakfast and casual fare."
  },
  {
    id: 7,
    name: "The Lime Tree",
    address: "House No. 1, Street No. 1, F-6/3, Islamabad, 44000, Pakistan",
    lat: 33.741257,
    lng: 73.081685,
    features: ["outdoor seating", "breakfast"],
    rating: "⭐ 3.5",
    description: "Small deli-café known for breakfast items like French toast, with a pleasant outdoor sitting area. (Low review count — limited data available.)"
  },
  {
    id: 8,
    name: "Chaaye Khana",
    address: "Shop #11, Block B, United Bakery Plaza, F-6 Super Market, Islamabad, 44000, Pakistan",
    lat: 33.729330,
    lng: 73.074949,
    features: ["family-friendly", "tea house", "live music"],
    rating: "⭐ 4.3",
    description: "Popular tea house serving karak chai, halwa puri and breakfast staples in a warm, aesthetic setting."
  },
  {
    id: 9,
    name: "Burning Brownie",
    address: "Shop #66, Beverly Centre, 1 Nazim-ud-din Rd, F-6/1, Islamabad, 44000, Pakistan",
    lat: 33.720363,
    lng: 73.074039,
    features: ["dessert", "quiet", "indoor & outdoor"],
    rating: "⭐ 4.5",
    description: "Islamabad's go-to dessert spot — cheesecakes, brownies and strong Italian-style coffee."
  },
  {
    id: 10,
    name: "Atrio Cafe & Grill",
    address: "College Rd, near Saeed Book Bank, Jinnah Super Market, F-7 Markaz, Islamabad, Pakistan",
    lat: 33.722077,
    lng: 73.058138,
    features: ["rooftop", "grill", "casual dining"],
    rating: "⭐ 4.1",
    description: "Long-running F-7 restaurant known for grilled mains, pasta and a rooftop seating option."
  },
  {
    id: 11,
    name: "Bistro Noir",
    address: "Gol Market, Street 4, F-7/3, Islamabad, Pakistan",
    lat: 33.726322,
    lng: 73.057645,
    features: ["fine dining", "elegant", "gallery seating"],
    rating: "⭐ 4.3",
    description: "Upscale French-inspired bistro with elegant décor, gallery/greenery seating and a refined menu."
  },
  {
    id: 12,
    name: "The Breakfast Club",
    address: "UNVERIFIED — could not confirm an exact address on Google Places under this name in F-8, Islamabad",
    lat: null,
    lng: null,
    features: ["breakfast"],
    rating: "N/A",
    description: "Could not find a confident, unique match for this name/area. Please confirm the exact location before using."
  },
  {
    id: 13,
    name: "Cannoli by Salma & Azfar",
    address: "UNVERIFIED — closest match found is 'Cannoli by Cafe Soul', Beverly Centre, F-6/1 (not F-8/4)",
    lat: null,
    lng: null,
    features: ["dessert", "bakery"],
    rating: "N/A",
    description: "Could not verify a branch matching this exact name in F-8/4. The well-known Islamabad 'Cannoli' brand (Cannoli by Cafe Soul) has branches in F-6/1 Beverly Centre and F-11; please confirm which one you mean."
  },
  {
    id: 14,
    name: "L'espresso",
    address: "Shop #G-6, Liberty Mall, F-11 Markaz, Islamabad, 44000, Pakistan",
    lat: 33.683969,
    lng: 72.986293,
    features: ["wifi", "modern", "specialty coffee"],
    rating: "⭐ 4.6",
    description: "Bright, airy specialty coffee shop popular for its matcha and Spanish lattes plus knowledgeable baristas."
  },
  {
    id: 15,
    name: "Loafology Bakery & Café",
    address: "Aura Square Mall, Major Rd, F-11 Markaz, Islamabad, 44000, Pakistan",
    lat: 33.683180,
    lng: 72.990790,
    features: ["bakery", "breakfast", "cozy"],
    rating: "⭐ 4.2",
    description: "F-11 branch of the popular bakery-café chain; known for sourdough, omelettes and pastries."
  },
  {
    id: 16,
    name: "Espresso",
    address: "UNVERIFIED — no confident match found under this exact name in F-7 Markaz, Islamabad",
    lat: null,
    lng: null,
    features: ["coffee"],
    rating: "N/A",
    description: "Could not verify this specific café; F-7 Markaz has several coffee spots (e.g. Coffeemistry, Tommasini) but none matched the name 'Espresso' exactly."
  },
  {
    id: 17,
    name: "Second Cup Coffee Co.",
    address: "Plot No. 6, Super Market, Block B, Agha Khan Rd, F-6 Markaz, Islamabad, 44000, Pakistan",
    lat: 33.729846,
    lng: 73.077637,
    features: ["wifi", "cozy", "coffee-chain"],
    rating: "⭐ 4.4",
    description: "Cozy coffee chain branch popular for lattes, sandwiches and light work sessions. (Chain also has a Blue Area and Centaurus branch.)"
  },
  {
    id: 18,
    name: "The Coffee Bean & Tea Leaf",
    address: "Markaz, I-8 Markaz, Islamabad, 44000, Pakistan",
    lat: 33.667994,
    lng: 73.075806,
    features: ["wifi", "quiet", "coffee-chain"],
    rating: "⭐ 4.2",
    description: "Calm, meeting-friendly branch of the international coffee chain; known for its peaceful ambience."
  },
  {
    id: 19,
    name: "KAF Coffee",
    address: "Block 7, Roomy Signature Hotel, Super Market, Agha Khan Rd, F-6 Markaz, Islamabad, 44000, Pakistan",
    lat: 33.728745,
    lng: 73.075378,
    features: ["wifi", "premium", "dessert"],
    rating: "⭐ 4.5",
    description: "Elegant coffee shop known for its flat whites, tiramisu and refined ambience."
  },
  {
    id: 20,
    name: "Flow Specialty Coffee",
    address: "Shop 53, Ground Floor, Beverly Centre, F-6/1, Islamabad, 44000, Pakistan",
    lat: 33.720279,
    lng: 73.073535,
    features: ["wifi", "specialty coffee", "breakfast"],
    rating: "⭐ 4.4",
    description: "Widely rated as one of Islamabad's best specialty coffee spots; known for aeropress, pistachio latte and breakfast bagels."
  },
  {
    id: 21,
    name: "Tree House Cafe",
    address: "Rana Market, Street 16, F-7/2, Islamabad, 44000, Pakistan",
    lat: 33.721345,
    lng: 73.050913,
    features: ["outdoor seating", "shisha", "steaks"],
    rating: "⭐ 4.7",
    description: "Corner café known for hearty steaks, a cozy outdoor-only setup and a small tree-house feature."
  },
  {
    id: 22,
    name: "Veeru Cafe",
    address: "Shop #4, Block 4, Najam Market, F-8/4, Islamabad, 44000, Pakistan",
    lat: 33.709295,
    lng: 73.046236,
    features: ["wifi", "cozy", "specialty coffee"],
    rating: "⭐ 4.8",
    description: "Newer, highly-rated coffee spot with a European café feel — known for pistachio lattes and fresh sandwiches."
  },
  {
    id: 23,
    name: "The Coffee House",
    address: "349 Street 1, I-9/3, Islamabad, 44000, Pakistan",
    lat: 33.660937,
    lng: 73.058997,
    features: ["family-friendly", "casual-chic", "coffee"],
    rating: "⭐ 4.7",
    description: "Warm, family-friendly specialty coffee spot serving coffee drinks, burgers, wraps and desserts."
  },
  {
    id: 24,
    name: "The Dropouts Lounge",
    address: "8 Main Double Road, 2nd Floor, Emaan Arcade, PMCHS, E-11/2, Islamabad, 44000, Pakistan",
    lat: 33.696148,
    lng: 72.967982,
    features: ["gaming", "shisha", "late night"],
    rating: "⭐ 4.7",
    description: "Underground-vibe lounge with gaming consoles, neon lighting and shisha; popular with students, open till late."
  },
  {
    id: 25,
    name: "BR9 Cafe & Restaurant",
    address: "Onxy Heights, Northern Strip, FECHS, E-11/2, Islamabad, 44000, Pakistan",
    lat: 33.701344,
    lng: 72.968121,
    features: ["rooftop", "events", "24 hours"],
    rating: "⭐ 4.8",
    description: "24-hour rooftop café-restaurant popular for events, celebrations and skyline views of Islamabad."
  },
  {
    id: 26,
    name: "Roasters Coffee House & Grill",
    address: "1 Agha Khan Rd, F-6 Markaz, Islamabad, Pakistan",
    lat: 33.7305564,
    lng: 73.079177,
    features: ["grill", "steaks", "dinner"],
    rating: "⭐ 4.2",
    description: "Long-standing F-6 grill house known for tomahawk steaks, loaded fries and a lively evening crowd."
  },
  {
    id: 27,
    name: "Xander's Islamabad",
    address: "Tazeem Tower, Plot 3, New Blue Area, F-9/G-9, Islamabad, 44000, Pakistan",
    lat: 33.6924243,
    lng: 73.0247433,
    features: ["family-friendly", "modern", "all-day dining"],
    rating: "⭐ 4.0",
    description: "Buzzy, modern all-day café-restaurant popular for breakfast, pasta and steaks; a favorite for both families and late-night hangouts."
  },
  {
    id: 28,
    name: "Coffee Planet",
    address: "1st Floor, Giga Mall, DHA Phase II, Islamabad, Pakistan",
    lat: 33.5211113,
    lng: 73.1585192,
    features: ["wifi", "mall", "modern"],
    rating: "⭐ 3.5",
    description: "Bright mall café inside Giga Mall with plenty of seating and good wifi; a convenient coffee stop while shopping in DHA."
  },
  {
    id: 29,
    name: "Cafe Ice Berg",
    address: "Plaza 10, 1st Floor, Civic Centre, Bahria Town, Islamabad, 46000, Pakistan",
    lat: 33.5505646,
    lng: 73.1232015,
    features: ["24 hours", "shisha", "dessert"],
    rating: "⭐ 4.4",
    description: "Popular 24-hour Bahria Town spot known for its shisha lounge, casual fast food and reliably good desserts."
  },
  {
    id: 30,
    name: "Quetta Chai-O-Sip",
    address: "Al Anayat Mall, G-11 Markaz, Islamabad, 44020, Pakistan",
    lat: 33.6679972,
    lng: 72.9971535,
    features: ["tea house", "paratha", "casual"],
    rating: "⭐ 4.4",
    description: "Casual G-11 tea house famous for karak doodh pati and stuffed parathas, with an open kitchen you can watch."
  },
  {
    id: 31,
    name: "Tuscany Courtyard",
    address: "No. 4, Kohsar Market, Street 10, F-6/3, Islamabad, Pakistan",
    lat: 33.7355367,
    lng: 73.0783478,
    features: ["fine dining", "italian", "garden seating"],
    rating: "⭐ 4.1",
    description: "Vintage Italian-themed courtyard restaurant in Kohsar Market known for wood-fired pizza and a relaxed high-tea spread."
  },
  {
    id: 32,
    name: "The Hot Spot",
    address: "Gol Market, Street 3, F-7/3, Islamabad, Pakistan",
    lat: 33.7261521,
    lng: 73.0572509,
    features: ["dessert", "ice cream", "iconic"],
    rating: "⭐ 4.3",
    description: "Islamabad institution for nearly three decades — retro pop-art décor and beloved ice creams, gelatos and hot chocolate."
  }
];

// FIX: module.exports crashes in the browser (there is no "module" object
// in window). Guard it so this file still works if required in Node for
// testing, but doesn't throw a ReferenceError and halt the whole script
// when loaded via <script src="app.js">.
if (typeof module !== 'undefined' && module.exports) {
    module.exports = cafes;
}

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