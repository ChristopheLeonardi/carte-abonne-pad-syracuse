# Documentation for functions.js

## List of Functions

### createPopup

**Signature:**
```javascript
const createPopup = (data, contexte = "default", markerData = {}, color = "default") =>
```

**Comment:**
/* Fonction permettant de créer le DOM des popup des markers */

**Description:**
Crée des popups sur la carte pour afficher des informations supplémentaires lorsque l'utilisateur clique sur des marqueurs.

### capitalizeFirstLetter

**Signature:**
```javascript
function capitalizeFirstLetter(string) {
```

**Description:**
Capitalise la première lettre d'une chaîne de caractères, probablement utilisée pour formatter les textes affichés sur la carte.

### catFilter

**Signature:**
```javascript
const catFilter = (cat, index, fieldset) =>
```

**Description:**
Filtre les données affichées sur la carte en fonction des catégories sélectionnées.

### handleCatFilter

**Signature:**
```javascript
const handleCatFilter = (id) =>
```

**Description:**
Gère les actions de l'utilisateur relatives aux filtres de catégorie sur l'interface utilisateur.

### searchBox

**Signature:**
```javascript
const searchBox = (data, map, cats, regions) =>
```

**Description:**
Crée et gère une boîte de recherche pour permettre à l'utilisateur de trouver des emplacements spécifiques ou des catégories sur la carte.

### flatArray

**Signature:**
```javascript
const flatArray = (array) =>
```

**Description:**
Aplatit un tableau multidimensionnel, probablement utilisé pour traiter des données complexes ou imbriquées.

### filterSearch

**Signature:**
```javascript
const filterSearch = (data) =>
```

**Description:**
Filtre les résultats de la recherche basés sur la requête de l'utilisateur.

### filterIt

**Signature:**
```javascript
const filterIt = (arr, query) =>
```

**Description:**
Une autre fonction de filtrage utilisée pour filtrer des éléments sur la carte.

### createResetButton

**Signature:**
```javascript
const createResetButton = (cats, data, regions) =>
```

**Description:**
Crée un bouton de réinitialisation pour réinitialiser les filtres ou les options sélectionnés par l'utilisateur sur la carte.

### createResultsDisplay

**Signature:**
```javascript
const createResultsDisplay = () =>
```

**Description:**
Affiche les résultats de la recherche ou du filtrage à l'utilisateur.


---

# Documentation for map.js

## List of Functions

### defineIcon

**Signature:**
```javascript
const defineIcon = (url) =>
```

**Comment:**
/* 
Nomenclature des variables globales : 
window[`${cat.name}Cluster`]
window[`${cat.name}Data`]
*/

**Description:**
Définit les icônes personnalisées pour les marqueurs sur la carte.

### createMarkers

**Signature:**
```javascript
const createMarkers = (className, color) =>
```

**Comment:**
/* Création des layers à partir du fichier config avec des variables dynamiques */

**Description:**
Crée des marqueurs sur la carte basés sur les données fournies.

### createLayer

**Signature:**
```javascript
const createLayer = (data, cluster, icon, color) =>
```

**Comment:**
/* Création du panneau de contrôle */

**Description:**
Crée des couches sur la carte pour gérer l'affichage des différents types de données.

### createCluster

**Signature:**
```javascript
const createCluster = (cat, data, regions) =>
```

**Comment:**
/* Define catégories style */

**Description:**
Groupe les marqueurs proches sur la carte en clusters pour une meilleure lisibilité et performance.

