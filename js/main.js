document.addEventListener('DOMContentLoaded', function() {
    const mapDataElement = document.getElementById('map-data');
    if (mapDataElement) {
        const mapData = JSON.parse(mapDataElement.textContent);
        initMap(mapData.places);
    }
});

function initMap(places) {
    const map = L.map('map').setView([51.505, -0.09], 3);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Добавляем плагин для геокодирования
    const geocoder = L.Control.Geocoder.nominatim();

    const control = L.Control.geocoder({
        geocoder: geocoder,
        defaultMarkGeocode: false,
    }).on('markgeocode', function(e) {
        const { center } = e.geocode;
        map.setView(center, 15);
        L.marker(center).addTo(map).bindPopup(e.geocode.name).openPopup();
    }).addTo(map);

    // Удаляем начальные метки
    map.eachLayer(function(layer) {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    // Добавляем маркеры на карту
    places.forEach(function(place) {
        L.marker([place.lat, place.lng]).addTo(map)
            .bindPopup(`<b>${place.name}</b><br>${place.description}`);
    });

    // Поиск по введенному запросу
    const searchInput = document.getElementById('search');
    if (searchInput) {
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                const query = this.value;
                geocoder.geocode(query, function(results) {
                    if (results.length === 0) {
                        alert('Место не найдено');
                    } else {
                        const result = results[0];
                        control._geocodeResultSelected(result);
                    }
                });
            }
        });
    }

    // Кнопка "Мое местоположение"
    const locateButton = document.getElementById('locate-btn');
    if (locateButton) {
        locateButton.addEventListener('click', function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    const latlng = [position.coords.latitude, position.coords.longitude];
                    map.setView(latlng, 15);
                    L.marker(latlng).addTo(map).bindPopup("Вы находитесь здесь").openPopup();
                }, function() {
                    alert('Не удалось получить ваше местоположение');
                });
            } else {
                alert('Геолокация не поддерживается вашим браузером');
            }
        });
    }
}