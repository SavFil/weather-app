const mymap = L.map('mapid').setView([0, 0], 1);


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);


getJson();

async function getJson() {
    const response = await fetch("/api");
    const json = await response.json();


    json.forEach(element => {
        const marker = L.marker([element.lat, element.lon]).addTo(mymap);


        console.log(element);
        let txt = ` The weather here at ${element.lat}°;,
        ${element.lon}°
        is ${element.weath}
        with a temperature of ${element.weather.temperature}° C.`;

        if (element.air.value < 0) {
            txt += `  No air quality reading.`;
        } else {
            txt += `The
            concentration of particulate matter (${element.air.parameter})
            is ${element.air.value} ${element.air.unit} last read
            on ${element.air.lastUpdated}.`;

        }


        marker.bindPopup(txt);




    });

}