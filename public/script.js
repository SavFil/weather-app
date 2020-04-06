if (!navigator.geolocation) {
    console.log("Geolocation not available.")
} else {
    console.log("Geolocation available.");
    let lat, lon, weather, air;
    navigator.geolocation.getCurrentPosition(async position => {
        try {
            lat = position.coords.latitude.toFixed(2);
            lon = position.coords.longitude.toFixed(2);
            const api_url = `weather/${lat},${lon}`;
            const response = await fetch(api_url);
            const json = await response.json();
            
            weather = json.weather.currently;
            
            document.getElementById("lat").textContent = lat;
            document.getElementById("long").textContent = lon;
            document.getElementById("weath").textContent = weather.summary;
            document.getElementById("deg").textContent = weather.temperature;
            air = json.air_quality.results[0].measurements[0];
            document.getElementById("aq_parameter").textContent = air.parameter;
            document.getElementById("aq_value").textContent = air.value;
            document.getElementById("aq_units").textContent = air.unit;
            document.getElementById("aq_date").textContent = air.lastUpdated;
        } catch (err) {
            air = { value: -1 };
            document.getElementById("aq_value").textContent = "NO READING";
        }

        const data = { lat, lon, weather, air };
            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            };
            const db_response = await fetch("/api", options);
            const db_json = await db_response.json();
            console.log(db_json);
    }, error => console.log(error));


}





