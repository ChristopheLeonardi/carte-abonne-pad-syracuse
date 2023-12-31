# Système de cartographie

Ce fichier contient des fonctions principales pour la gestion des filtres, de la recherche, et de l'affichage des résultats sur la carte des abonnés Philharmonie à la demande. Il inclut des fonctions pour gérer la création de la carte, le filtrage des catégories, la boîte de recherche, l'affichage des résultats, et la création de boutons pour les réseaux.

Ce module permet de créer un système de cartographie à partir d'un jeu de données. Réalisée à partir de la library Leaflet et du module ClusterMarker.

# Liste des modules

- Leaflet 1.9.2
- markercluster 1.4.1
- Fichier excel de base de données
- Fichier excel d'automatisation de mise en base de nouvelles données et export csv

# Description du code

## config.json

Fichier de paramétrage des catégories et de valeurs de multiclustering.

## map.js

Fichier chargeant les données et créant la carte et les clusters. Il permet l'appel du système de filtrage. 

Pour permettre le filtrage, des variables globales sont crées :

```
window["allCluster"]
window[`${cat.name}Cluster`]
window["allData"]
window["data_selected"]

```
## functions.js

Fichier prenant en charge la construction du DOM des marqueurs, de celui su système de fltrage ainsi que de celui des résultats de recherches. Il contient aussi le code de filtrage des données. 

## encart.html

Fichier contenant le code html pour l'execution des scripts de la carte.

## Fonctions

#### handleCatFilter(id)
Cette fonction gère le filtrage des catégories sur la carte. Elle retire tous les clusters de la carte et ajoute ceux qui sont pertinents en fonction de l'ID de la catégorie sélectionnée.

##### Paramètres

- **id (string) :** L'identifiant de la catégorie à filtrer.

#### searchBox(data, map, cats, regions)
Cette fonction gère la boîte de recherche et le filtrage des données sur la carte. Elle met à jour les résultats affichés sur la carte en fonction des critères de recherche.

##### Paramètres

- **data (Array) :** Le tableau des données à filtrer.
- **map (Object) :** L'objet de la carte où les résultats filtrés seront affichés.
- **cats (Array) :** Les catégories utilisées pour le filtrage des données.
- **regions (Array) :** Les régions utilisées pour le filtrage des données.

#### createResultsDisplay()
Cette fonction crée un élément d'affichage des résultats sur la page. Elle ajoute un élément paragraph avec l'ID 'result-msg' pour afficher le nombre d'institutions trouvées.


#### createButtonReseaux(reseaux)
Cette fonction crée des boutons pour différents réseaux. Elle prend un tableau de réseaux et crée un bouton pour chacun d'eux sur la page.

##### Paramètres

- **reseaux (Array) :** Le tableau des réseaux pour lesquels créer des boutons.

## map.js

### Description Globale
Ce fichier est utilisé pour créer et configurer une carte avec Leaflet. Il initialise la carte, définit le style et gère l'interaction utilisateur, comme le zoom.

### Fonctions

## catfilter.js

### Description Globale
Ce fichier contient la fonction catFilter utilisée pour créer un élément de filtre basé sur différentes catégories.

### Fonctions

#### catFilter(cat, index, fieldset)
Cette fonction crée un élément de filtre pour une catégorie spécifique. Elle crée un élément d'input et d'autres éléments associés pour permettre la sélection et le filtrage basés sur cette catégorie.

##### Paramètres

- **cat (Object) :** L'objet de la catégorie pour laquelle créer le filtre.
- **index (number) :** L'index de la catégorie dans le tableau des catégories.
- **fieldset (Element) :** L'élément fieldset auquel ajouter le filtre de catégorie.

