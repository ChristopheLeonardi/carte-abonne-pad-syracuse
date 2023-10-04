/* Fonction permettant de créer le DOM des popup des markers */
const createPopup = (data, contexte = "default", markerData = {}, color = "default") => {
    let popupContent = document.createElement('div')
    popupContent.setAttribute("class", 'values')

    let title = document.createElement('h4')
    title.textContent = data.nom.replace(/\*/gm, ' ') + ' '
    title.setAttribute("class", contexte)
    popupContent.appendChild(title)

    if ((data.nom_cmpp != "") && (data.nom_cmpp != "-")) {
        let reseau = document.createElement('button')
        reseau.setAttribute('class', 'btn-text')
        reseau.textContent = `${data.nom_cmpp}`
        $(reseau).click(e => {
            console.log(data)
            $("#seeker")[0].value = `"${data.nom_cmpp}"`
            $("#search").click()
            carteAbonnee.setView(L.latLng(data.coordonnees_gps_lat_lon.split(",")), 8)
        })
        popupContent.appendChild(reseau)
    }

    /* ////////////////////////// */
    /* TODO : Format case adresse */
    /* ////////////////////////// */
    let adresse = document.createElement('address')

    let regex = /\b(?!rue|avenue|boulevard|r\s+|av\s+|ave\s+|bd\s+|bvd\s+|square\s+|sente\s+|impasse\s+|cours\s+|esplanade\s+|allée\s+|résidence\s+|parc\s+|rond-point\s+|chemin\s+|côte\s+|place\s+|cité\s+|quai\s+|passage\s+|lôtissement\s+|hameau\s+|le\s+|la\s+|les\s+|des\s+|du\s+|de\s+|l\'|d\'|bis,*\s+|ter,*\s+)\b\S+/gi
    let formatAdresse = data.adresse_postale.toLowerCase()
        .replace(/[0-9]{5}.+/gm, str => { return str.toUpperCase() })
        .replace(regex, str => { return capitalizeFirstLetter(str) })
        .replace(/\s+france$/ig, "")

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    adresse.innerHTML = formatAdresse
    adresse.setAttribute("class", contexte)
    popupContent.appendChild(adresse)

    /* Abonnements */
    let abonnement_title = document.createElement("h5")
    abonnement_title.textContent = "Services disponibles :"
    popupContent.appendChild(abonnement_title)

    let is_domicile = data.services == "A" || data.services == "AP" ? "abo" : "noabo"

    let domicile_service = document.createElement('div')
    domicile_service.setAttribute("class", `services ${is_domicile}`)

    let domicile_service_icon = document.createElement("img")
    domicile_service_icon.setAttribute("src", `/ui/plug-in/integration/carte-abonne-pad/img/${is_domicile}.svg`)
    domicile_service.appendChild(domicile_service_icon)

    let domicile_service_text = document.createElement("p")
    domicile_service_text.textContent = "Accès à domicile"
    domicile_service.appendChild(domicile_service_text)

    popupContent.appendChild(domicile_service)
    
    let is_proj = data.services == "P" || data.services == "AP" ? "proj" : "noproj"
    let proj_service = document.createElement('div')
    proj_service.setAttribute("class", `services ${is_proj}`)

    let proj_service_icon = document.createElement("img")
    proj_service_icon.setAttribute("src", `/ui/plug-in/integration/carte-abonne-pad/img/${is_proj}.svg`)
    proj_service.appendChild(proj_service_icon)

    let proj_service_text = document.createElement("p")
    proj_service_text.textContent = "Accès sur place"
    proj_service.appendChild(proj_service_text)

    popupContent.appendChild(proj_service)

    if (data.lien != "") {
        let webButton = document.createElement('a')
        webButton.textContent = `Consulter le site`
        webButton.setAttribute('class', 'btn btn-default extLink')
        webButton.setAttribute('style', `background-color: ${color} !important`)
        webButton.setAttribute('href', data.lien)
        webButton.setAttribute('title', `Aller sur le site dans un nouvel onglet`)
        webButton.setAttribute('target', '_blank')
        popupContent.appendChild(webButton)
    }
    if (contexte == "isSearch") {
        let showButton = document.createElement('button')
        showButton.textContent = "Faire apparaitre sur la carte"
        showButton.setAttribute('class', 'btn btn-default')
        showButton.setAttribute('id', `${(data.nom + data.libelle_geographique).replace(/\W/g, '')}`.replace(/\s*/gm, ""))
        $(showButton).click(e => {

            var mapPosition = parseInt($("#mapContainer").offset().top)
            $('html').scrollTop(mapPosition - 300)
            $("#typeSelection #all").click()
            carteAbonnee.setView(L.latLng(markerData[`marker${e.target.id}`]._latlng), 16)
            markerData[`marker${e.target.id}`].openPopup()

        })
        popupContent.appendChild(showButton)
    }
    return popupContent
}

const catFilter = (cat, index, fieldset) => {
    var container = document.createElement('div')
    container.setAttribute('class', 'container')

    var checkBackground = document.createElement('div')
    checkBackground.setAttribute('class', 'checkBackground')

    var input = document.createElement('input')
    input.setAttribute('id', cat.name.replace(/\s*/gm, ""))
    input.setAttribute('type', 'radio')
    input.setAttribute('name', 'selection')
    $(input).click(e => {
        handleCatFilter(e.currentTarget.id)
    })

    if (index == 0) {
        input.setAttribute('checked', 'true')
    }

    var label = document.createElement('label')
    label.setAttribute("for", cat.name.replace(/\s*/gm, ""))
    label.textContent = cat.label

    container.appendChild(input)
    container.appendChild(checkBackground)
    container.appendChild(label)
    fieldset.appendChild(container)
}

const handleCatFilter = (id) => {

    if ($("#seeker")[0].value != "") {
        $("#search").click()
    }

    // Retire tous les clusters de la carte puis ajoute les pertinents
    carteAbonnee.eachLayer(layer => { if (layer instanceof L.MarkerClusterGroup) { carteAbonnee.removeLayer(layer) } })
    window[`${id}Cluster`].map(item => { item.cluster.addTo(carteAbonnee) })
    document.getElementById("typeSelection").setAttribute("data-select", id)
    $("#result-msg span")[0].textContent = window[`${id}Data`].length
    $("#search").click()
}

const searchBox = (data, map, cats, regions) => {

    /* SEEKER FUNCTION */
    if (!RegExp.escape) {
        RegExp.escape = function(s) {
            return s.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
        }
    }

    $('.search-bar').submit(function(e) { e.preventDefault() })
    accessibilityButton(data, cats)

    $('#search').click(function(e) {

        var catSelected = $("#typeSelection").data("select")
        if (catSelected) {
            data = window[`${catSelected}Data`]
        }
        var filterQuery = filterSearch(data)
        $("#result-msg span")[0].textContent = filterQuery.filtered.length

        if (filterQuery.filtered.length == 0) {
            return
        }

        // Mise à jour des résultats de la carte en supprimant les cluster et les recréant avec le dataset filtré
        var newMarkers = []
        carteAbonnee.eachLayer(layer => { if (layer instanceof L.MarkerClusterGroup) { carteAbonnee.removeLayer(layer) } })
        cats.map(cat => {
            var filterCatItem = []
            filterQuery.filtered.map(item => {
                if (item.type_equipement_ou_lieu.toLowerCase() == cat.type) {
                    filterCatItem.push(item)
                }
            })
            newMarkers.push(window.map_utils.createCluster(cat, filterCatItem, regions))
        })

        // Création de la liste des marqueurs filtrés 

        newMarkers = flatArray(newMarkers.flat().map(cluster => { return cluster.markers }))

        $("#access-button").remove()
        accessibilityButton(filterQuery.filtered)
        createButtonReseaux(filterQuery.filtered)

        // Construction du DOM des résultats
        document.getElementById('searchResults').replaceChildren()
        if (filterQuery.query != `(?=.*)`) {
            carteAbonnee.setView([46.71109, 1.7191036], 6)
            $.each(filterQuery.filtered, function(key, val) {
                var popup = createPopup(val, "isSearch", newMarkers, map)
                document.getElementById('searchResults').appendChild(popup)
            })

            if ($("#resultsLink").length == 0) {
                // If button does not exists, create it
                let resultsLink = document.createElement("a")
                resultsLink.setAttribute("href", "#filter-results")
                resultsLink.setAttribute("id", "resultsLink")
                resultsLink.setAttribute("class", "btn btn-default")
                resultsLink.textContent = "Voir la liste"

                $(".search-bar")[0].insertBefore(resultsLink, document.getElementById("result-msg"))

                $("#noResult-msg").remove()

            }
        }

    })

}

const flatArray = (array) => {
    array = array.flat().reduce(function(result, current) {
        return Object.assign(result, current);
    }, {})
    return array
}
const filterSearch = (data) => {

    var catFilter = $("#typeSelection").attr("data-select")
    if (catFilter) {
        data = window[`${catFilter}Data`]
    }

    var searchTerms = document.getElementById("seeker").value.replace(/\s$/gmi, "")

    // Traitement de la recherche avec prise en charge de la recherche exacte ("lorem")

    let queryReg = []
    var regexQuote = new RegExp(/\"(.*?)\"/, 'gm')

    if (regexQuote.test(searchTerms)) {
        queryReg = searchTerms.match(regexQuote).map(q => q.replace(/\"/gm, ''))

    } else {
        searchTerms.toLowerCase().split(' ').map(q => queryReg.push(`(?=.*${q})`))
    }

    var filtered = []

    /* Data filter method */
    var filtered = []

    const filterIt = (arr, query) => {
        return arr.filter(obj => Object.keys(obj).some(key => {
            return new RegExp(query, "mgi").test(obj[key])
        }))
    }
    queryReg.map(query => { filtered.push(filterIt(data, query)) })

    // Prise en charge de la recherche avec mots multiples dans tous les champs de data
    if (queryReg.length > 1) {
        const findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) !== index)
        filtered = findDuplicates(filtered.flat())
    }
    return { "filtered": filtered.flat(), "query": queryReg }
}
const DOMFilter = parent => {
    var DOMcontainer = document.createElement('div')
    DOMcontainer.setAttribute('class', 'dom-container')

    var DOMTOM = [
        //{ "nom": "Guyane", "coord": [4.310684416848732, -53.13004717679813] },
        { "nom": "Martinique", "coord": [14.671913536724809, -61.007602954405996] },
        { "nom": "La Réunion", "coord": [-21.123115727737574, 55.56781053662923] },
        //{ "nom": "Mayotte", "coord": [-12.803834545052649, 45.150281904815635] },
        { "nom": "Guadeloupe", "coord": [16.25758328531217, -61.55501057513679] }
    ]

    DOMTOM.map(item => {
        let link = document.createElement("button")
        link.setAttribute("id", item.nom.replace(/\s+/gm, "-").toLowerCase())

        let image = document.createElement("img")
        image.setAttribute("src", `/ui/plug-in/integration/carte-abonne-pad/img/${item.nom.replace(" ", "-").toLowerCase()}.jpg`)
        image.setAttribute("alt", `Faire apparaitre ${item.nom.replace(" ", "-").toLowerCase()} sur la carte`)

        let text = document.createElement("p")
        text.textContent = item.nom

        link.appendChild(image)
        link.appendChild(text)

        $(link).click(e => {
            $("#typeSelection #all")[0].click()
            document.getElementById("seeker").value = `${item.nom}`
            $("#search").click()
            carteAbonnee.setView(L.latLng(item.coord), 8)
        })

        DOMcontainer.appendChild(link)
    })

    parent.appendChild(DOMcontainer)
}
const createResetButton = (cats, data, regions) => {
    let resetButton = document.createElement('button')
    resetButton.textContent = `Réinitialiser`
    resetButton.setAttribute('class', 'btn btn-default')
    resetButton.setAttribute('id', 'reset-button')
    $(resetButton).click(e => {
        carteAbonnee.setView([46.71109, 1.7191036], 6)
        $("#typeSelection #all")[0].click()
        $("#seeker")[0].value = ""
        $(".search-bar #search")[0].click()
        $("#resultsLink").remove()
        $(".btn-reseau").remove()

        cats.slice(1).map(cat => {
            var resetData = []
            data.map(item => {
                if (item.type_equipement_ou_lieu.toLowerCase() == cat.type) {
                    resetData.push(item)
                }
            })
            window.map_utils.createCluster(cat, resetData, regions)
        })
        $("#result-msg span")[0].textContent = data.length
    })
    document.getElementsByClassName("search-bar")[0].appendChild(resetButton)
}

const accessibilityButton = data => {
    if ($("#access-button").length == 0) {
        let accessButton = document.createElement('button')
        accessButton.textContent = `Version accessible`
        accessButton.setAttribute('class', 'btn btn-default')
        accessButton.setAttribute('id', 'access-button')
        $(accessButton).click(e => {
            accessTable(data)
        })

        document.getElementById("mapFilter").appendChild(accessButton)
    }

}

const accessTable = data => {

    // Create modal
    if ($("#access-modal").length) {
        $("#access-modal").show()
        return
    }
    var modal = document.createElement("section")
    modal.setAttribute("id", "access-modal")

    var closeButton = document.createElement("button")
    closeButton.setAttribute("class", "btn btn-default close")
    closeButton.textContent = "Fermer le tableau"
    $(closeButton).click(e => {
        $("#access-modal").remove()
    })
    modal.appendChild(closeButton)

    var table = document.createElement("table")
    var caption = document.createElement("caption")
    caption.textContent = "Liste des institutions abonnées à Philharmonie à la demande"

    table.appendChild(caption)

    //Add a header
    var header = document.createElement("thead")

    var typeHeader = document.createElement("th")
    typeHeader.setAttribute("scope", "col")
    typeHeader.textContent = "Type d'établissement"

    var nomHeader = document.createElement("th")
    nomHeader.setAttribute("scope", "col")
    nomHeader.textContent = "Nom"

    var adressHeader = document.createElement("th")
    adressHeader.setAttribute("scope", "col")
    adressHeader.textContent = "Adresse"

    var telHeader = document.createElement("th")
    telHeader.setAttribute("scope", "col")
    telHeader.textContent = "Téléphone"

    var mailHeader = document.createElement("th")
    mailHeader.setAttribute("scope", "col")
    mailHeader.textContent = "Mail"

    var webHeader = document.createElement("th")
    webHeader.setAttribute("scope", "col")
    webHeader.textContent = "Site internet"

    header.appendChild(typeHeader)
    header.appendChild(nomHeader)
    header.appendChild(adressHeader)
    header.appendChild(telHeader)
    header.appendChild(mailHeader)
    header.appendChild(webHeader)

    table.appendChild(header)

    //Add a body

    document.getElementById("mapContainer").appendChild(modal)

    var body = document.createElement("tbody")
    data.sort((a, b) => (a.type_equipement_ou_lieu > b.type_equipement_ou_lieu) ? 1 : ((b.type_equipement_ou_lieu > a.type_equipement_ou_lieu) ? -1 : 0))

    data.map(item => {

        var type = document.createElement("tr")
        type.setAttribute("scope", "row")

        var typeItem = document.createElement("td")
        typeItem.textContent = item.type_equipement_ou_lieu
        type.appendChild(typeItem)

        var nom = document.createElement("td")
        nom.textContent = item.nom
        type.appendChild(nom)

        var adress = document.createElement("td")
        adress.textContent = item.adresse_postale
        type.appendChild(adress)

        var tel = document.createElement("td")
        tel.textContent = item.telephone
        type.appendChild(tel)

        var mail = document.createElement("td")
        mail.textContent = item.email
        type.appendChild(mail)

        var web = document.createElement("td")
        var webButton = document.createElement("a")
        webButton.setAttribute("class", "btn btn-default")
        webButton.setAttribute("alt", "Nouvel onglet")
        webButton.setAttribute("href", item.lien)
        webButton.setAttribute("target", "_blank")
        webButton.textContent = "Aller sur le site"

        web.appendChild(webButton)
        type.appendChild(web)

        body.appendChild(type)

    })

    table.appendChild(body)
    modal.appendChild(table)

}
const createResultsDisplay = () => {
    let nbElement = document.createElement("p")
    nbElement.setAttribute("id", "result-msg")
    nbElement.innerHTML = `<span>${window["data_selected"].length}</span> Institution(s)`
    document.getElementsByClassName('search-bar')[0].appendChild(nbElement)
}

const createButtonReseaux = reseaux => {
    var reseaux = [...new Set([... reseaux.map(item => {return {"name":item.nom_cmpp, "latlng":item.coordonnees_gps_lat_lon}})])]
    var uniqueReseaux = [...new Map(reseaux.map(v => [v.name, v])).values()]
    uniqueReseaux = uniqueReseaux.filter(reseau => {return reseau.name != ""})

    $(".btn-reseaux").remove()
    if ($("#seeker")[0].value != ""){
        uniqueReseaux.map(reseau => {
            let button = document.createElement("button")
            button.setAttribute("class", "btn btn-default btn-reseaux")
            button.textContent = reseau.name
            document.getElementById("mapFilter").insertBefore(button, document.getElementById("typeSelection"))
            $(button).click(e => {

                $("#seeker")[0].value = `"${reseau.name}"`
                $("#search").click()
                let coord = reseau.latlng.split(",")
                carteAbonnee.setView(coord, 6)
            })
        })
    }
}

window["utils"] = {
    "createPopup":createPopup,
    "createResetButton":createResetButton,
    "createResultsDisplay":createResultsDisplay,
    "catFilter":catFilter,
    "DOMFilter":DOMFilter,
    "searchBox":searchBox   
}