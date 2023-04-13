/* 
Nomenclature des variables globales : 
window[`${cat.name}Cluster`]
window[`${cat.name}Data`]
*/

// Create map with leaflet
var carteAbonnee = L.map('map', { scrollWheelZoom: false }).setView([46.71109, 1.7191036], 6);
carteAbonnee.on('click', () => { carteAbonnee.scrollWheelZoom.enable() })

// Set the map style
L.tileLayer('https://tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png?access-token=YCEYIYWB5ZcUuCYc2XQe9fGjttHukDxdSd2wqzlA7mhBwMK8SXM9h3RGqxtZzuna', {}).addTo(carteAbonnee);
carteAbonnee.attributionControl.addAttribution("<a href=\"https://www.jawg.io\" target=\"_blank\">&copy; Jawg</a> - <a href=\"https://www.openstreetmap.org\" target=\"_blank\">&copy; OpenStreetMap</a>&nbsp;contributors")

// mix with d3js load data
var svg = d3.select(carteAbonnee.getPanes().overlayPane).append("svg"),
    g = svg.append("g").attr("class", "leaflet-zoom-hide");


var promises = []

promises.push((d3.csv("/ui/plug-in/integration/carte-abonne-pad/output/df_all_pad.csv")))
promises.push((d3.json("/ui/plug-in/integration/carte-abonne-pad/config.json")))

Promise.all(promises).then(data => {
    console.log(data)
    window["allData"] = data[0]
    window["data_selected"] = data[0]
    window["allCluster"] = []

    const regions = data[1].regions
    var cats = data[1].categories

    /* Création des layers à partir du fichier config avec des variables dynamiques */
    cats.map((cat, index) => {
        if (cat.name == "all") {
            catStyle(cat)
            return
        }

        window[`${cat.name}Data`] = []

        window["allData"].map(item => {
            if (item.type_equipement_ou_lieu.toLowerCase() == cat.type) {
                window[`${cat.name}Data`].push(item)
            }
        })
        window[`${cat.name}Cluster`] = []
        window["allCluster"].push(createCluster(cat, window[`${cat.name}Data`], regions))

        catStyle(cat)

    })

    window[`allCluster`] = window[`allCluster`].flat()

    /* Création du panneau de contrôle */

    var command = L.control({ position: 'topright' })
    command.onAdd = function(carteAbonnee) {

        var div = L.DomUtil.create('div', 'command')
        var fieldset = document.createElement('fieldset')
        fieldset.setAttribute('id', 'typeSelection')

        createResetButton(cats, data[0], regions)
        createResultsDisplay()

        let catTitle = document.createElement("h3")
        catTitle.textContent = "Filtrer par catégories"
        fieldset.appendChild(catTitle)

        cats.forEach((cat, index) => { catFilter(cat, index, fieldset) })

        document.getElementById("mapFilter").appendChild(fieldset)

        DOMFilter(document.getElementById("mapContainer"))

        return div;
    };

    command.addTo(carteAbonnee);

    searchBox(window["allData"], L, cats, regions)

})

/* Define catégories style */
const catStyle = cat => {
    var catStyle = document.createElement("style")
    catStyle.textContent = `
        #typeSelection input#${cat.name} { content: url(${cat.icon});}
        #typeSelection #${cat.name}+.checkBackground, .${cat.layer} { background-color:${cat.color};}
        `
    document.getElementsByTagName("head")[0].appendChild(catStyle)
}

/* Fonction de création des icones */
const defineIcon = (url) => {
    return L.icon({
        iconUrl: url,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
        popupAnchor: [0, 0]
    })
}

/* Fonction de création des types de markers */
const createMarkers = (className, color) => {
    var markers = L.markerClusterGroup({
        showCoverageOnHover: false,
        iconCreateFunction: function(cluster) {
            return L.divIcon({
                html: `<b class="${className}">${cluster.getChildCount()}</b>`
            })
        },
        polygonOptions: {
            fillColor: color,
            color: color,
            weight: 0.7,
            opacity: 1,
            fillOpacity: 0.5
        }

    })
    return markers
}

/* Fonction de création des clusters */
const createLayer = (data, cluster, icon, color) => {
    var markers = []
    data.map(item => {
        var geo = item['coordonnees_gps_lat_lon'].split(',')
        if (geo.length != 2) {
            return
        }

        new_markers = L.marker(geo, { icon: icon })
        cluster.addLayer(new_markers.bindPopup(createPopup(item, "default", {}, color)).openPopup())
        carteAbonnee.addLayer(cluster)

        var marker = {}

        // Création des référecements des marqueurs pour event extérieur à la map
        var idMarker = (item.nom + item.libelle_geographique).replace(/\W/g, '')
        marker[`marker${idMarker}`] = new_markers
        markers.push(marker)


    })
    return { "cluster": cluster, "markers": markers }
}

const createCluster = (cat, data, regions) => {
    window[`${cat.name}Cluster`] = []
    window[`${cat.name}Icon`] = defineIcon(cat.icon)

    if (cat.cluster_multiple) {
        regions.map(region => {
            data.filter(item => { if (item.region.toLowerCase() == region.toLowerCase()) return item })
        })
    }
    let markers = createMarkers(cat.layer, cat.color)
    window[`${cat.name}Cluster`].push(createLayer(data, markers, window[`${cat.name}Icon`], cat.color))

    return window[`${cat.name}Cluster`]
}



const flatArray = (array) => {
    array = array.flat().reduce(function(result, current) {
        return Object.assign(result, current);
    }, {})
    return array
}