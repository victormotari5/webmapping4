document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('map')) {
        var map = L.map('map').setView([-1.286389, 36.817223], 6); // Center map on Kenya

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        fetch('data.txt')
            .then(response => response.text())
            .then(data => {
                var locations = parseData(data);
                locations.forEach(location => {
                    var marker = L.marker([location.latitude, location.longitude]).addTo(map);
                    marker.bindPopup(`
                        <b>${location.name}</b><br>
                        Latitude: ${location.latitude}<br>
                        Longitude: ${location.longitude}<br>
                        Area: ${location.area_sq_km} km²<br>
                        County: ${location.county}
                    `);
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }
});

function parseData(data) {
    var lines = data.trim().split('\n');
    var locations = lines.map(line => {
        var parts = line.split(',');
        return {
            name: parts[0],
            latitude: parseFloat(parts[1]),
            longitude: parseFloat(parts[2]),
            area_sq_km: parts[3],
            county: parts[4]
        };
    });
    return locations;
}

function loadTableData() {
    fetch('data.txt')
        .then(response => response.text())
        .then(data => {
            var locations = parseData(data);
            var tableBody = document.querySelector('#data-table tbody');
            locations.forEach(location => {
                var row = document.createElement('tr');
                row.innerHTML = `
                    <td>${location.name}</td>
                    <td>${location.latitude}</td>
                    <td>${location.longitude}</td>
                    <td>${location.area_sq_km}</td>
                    <td>${location.county}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}
