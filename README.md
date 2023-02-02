# Système de cartographie

Ce module permet de créer un système de cartographie à partir d'un jeu de données. Réalisée à partir de la library Leaflet et du module ClusterMarker.

# Liste des modules

- Leaflet 1.9.2
- markercluster 1.4.1
- Fichier excel de base de données
- Fichier excel d'automatisation de mise en base de nouvelles données et export csv

# Description du code

## congif.json

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