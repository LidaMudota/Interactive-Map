<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Интерактивная карта</title>
    <link rel="stylesheet" href="./css/style.css">
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css">
    <link rel="stylesheet" href="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.css">
</head>
<body>
    <div id="map"></div>
    <div class="controls">
        <button id="locate-btn">Мое местоположение</button>
    </div>

    <div id="map-data" style="display: none;"><?php echo json_encode(getPlaces()); ?></div>

    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
    <script src="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js"></script>
    <script src="./js/main.js"></script>
</body>
</html>

<?php
function getPlaces() {
    // Ваш массив мест с данными
    $places = [
        [
            "name" => "Лондон",
            "lat" => 51.505,
            "lng" => -0.09,
            "description" => "Столица Великобритании",
            "category" => "capital"
        ],
        [
            "name" => "Париж",
            "lat" => 48.8566,
            "lng" => 2.3522,
            "description" => "Столица Франции",
            "category" => "capital"
        ],
        // Добавьте другие места по желанию
    ];

    // Добавляем случайное место
    $randomPlaces = [
        [
            "name" => "Токио",
            "lat" => 35.6895,
            "lng" => 139.6917,
            "description" => "Столица Японии",
            "category" => "capital"
        ],
        [
            "name" => "Нью-Йорк",
            "lat" => 40.7128,
            "lng" => -74.0060,
            "description" => "Город в США",
            "category" => "city"
        ]
    ];
    $randomPlace = $randomPlaces[array_rand($randomPlaces)];
    $places[] = $randomPlace;

    return $places;
}
?>