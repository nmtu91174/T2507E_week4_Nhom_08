//onmap
function onMap(){
    document.getElementById("map").classList.toggle("hide");
} 

//code map
let map;
async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    map = new Map(document.getElementById("map"), {
        center: { lat: 34.0204789, lng: -118.4117326},
        zoom: 12,
        mapId: `15rcncxc`,
    });
    const marker = new AdvancedMarkerElement({
        map,
        position: { lat: 34.0304789, lng: -118.4117326 },
    });
}
initMap();