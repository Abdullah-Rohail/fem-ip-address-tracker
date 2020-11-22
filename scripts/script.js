const API_KEY = "YOUR_IPIFY_API_KEY";
const MAPBOX_ACCESS_TOKEN = "YOUR_MAPBOX_API_KEY";

window.addEventListener("DOMContentLoaded",()=>{
    fetchIpData()
    document.getElementById("searchBtn").addEventListener("click",fetchIpData)
})

// var ip = "8.8.8.8";
const fetchIpData = () => {
    let data = {apiKey: API_KEY}
    let ip = document.querySelector("#search-box input").value
    
    if(ip !== ""){
        data["ipAddress"] = ip
    }
    $.ajax({
        url: "https://geo.ipify.org/api/v1",
        data,
        success: function(data) {
            // $("body").append("<pre>"+ JSON.stringify(data,"",2)+"</pre>");
            console.log(data)
            $("#data-ip").text(data["ip"])
            $("#data-loc").text(data["location"]["city"])
            $("#data-timezone").text("UTC "+data["location"]["timezone"])
            $("#data-isp").text(data["isp"])

            let lat = data["location"]["lat"]
            let lng = data["location"]["lng"]
            let mymap = L.map('mapid').setView([lat, lng], 13);
            var marker = L.marker([lat, lng]).addTo(mymap);
            marker.bindPopup(`<b>${data["location"]["city"]}</b>`).openPopup();
            L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${MAPBOX_ACCESS_TOKEN}`, {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox/streets-v11',
                tileSize: 512,
                zoomOffset: -1,
                accessToken:MAPBOX_ACCESS_TOKEN
            }).addTo(mymap);
        }
    });
}