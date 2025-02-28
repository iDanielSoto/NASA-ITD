document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'PFNVlVbxq1LRUUC9Sem2LVNlCscUhfLsbnBwKYMU';
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.url) {
                document.getElementById('img').src = data.url;
                document.getElementById('img').alt = data.title || 'NASA Image of the Day';
            }
            document.getElementById('explanation').textContent = data.explanation || 'No explanation available.';
            document.getElementById('date').textContent = new Date(data.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            document.getElementById('title').textContent = data.title || 'Untitled';
            document.getElementById('copyright').textContent = data.copyright ? data.copyright : new Date().getFullYear();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.querySelector('main').innerHTML = '<p>Failed to load the image. Please try again later.</p>';
        });

        // mostrar UNICAMENTE el nombre de la foto del dia sigueinte:
        
        // Establecer día siguiente como variable:
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var tomorrowString = tomorrow.toISOString().split('T')[0];

        // Fetch de la imagen del día siguiente:
        const apiUrlTomorrow = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${tomorrowString}`;
        fetch(apiUrlTomorrow)
            .then(response => response.json())
            .then(data => {
                if (data.title) {
                    document.getElementById('tomorrow').textContent = data.title;
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                document.getElementById('titleTomorrow').textContent = 'Untitled';
            });
});