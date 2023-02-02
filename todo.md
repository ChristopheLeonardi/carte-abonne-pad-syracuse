    - Mettre en surbrillance Toutes les institutions + fond neutre & border
    - Ajout des vignettes DOM TOM
- VBA prise en charge des doublons
    - In cartouche : Faire apparaitre le nom du réseau
    - Link & filter nom du reseau 
- Ajout de prise en charge d'id d'entrée & d'id de réseau
    - Add button to filter
    - Discuss radio button filter
    - régler le focus sur la carte on click enter
    - Couleur des cartouches 
- Open popup on button

    -	Les majuscules dans les adresses ne s’affichent pas, possible de le corriger ?
    -	Ajouter si possible le picto lien externe pour les boutons « consulter le site internet »
    -	Intitulé du bouton : peut-être qu’on peut raccourcir à « Consulter le site » ?
    -	Je pense que le title du même lien n’a pas besoin de répéter toutes ces infos qui figurent déjà juste au-dessus. Seule la mention « Ouvre un nouvel onglet » est à conserver en title.
    -	Au clic sur le champ de recherche, le focus « mord » un peu la barre de texte et le picto du dessous (voir capture en PJ)

-	Est-il possible d’ajouter un title par-dessus les picto d’institution ? Car niveau accessibilité, on ne donne les infos que visuellement, ça ne passera pas les tests 
d’accessibilité. Il faudrait je pense un title du style « Voir le conservatoire/la bibliothèque/l’université » + un alt pour chaque picto svg. Tu peux demander les bonnes pratiques à Louis qui saura sans doute mieux que moi 😊 
>>> Ce sont des boutons radio, et les pictos sont des images chargées en css. sujet à discuter


    -	Il me semble qu’il manque pas mal de lien vers les sites, je ne sais pas si vous l’avez repéré (par exemples, les bib de la ville de Paris n’ont pas de site)

# Log Problèmes Affichage

•	Ecole de musique de Fontenay (en vendée) 
>> TODO ajout on script

École Intercommunale de Musique et de Danse
34 rue Rabelais 85200 Fontenay-le-Comte
02 51 53 41 64
eimd.secretariat@fontenayvendee.fr
https://www.fontenayvendee.fr/ecole-intercommunale-de-musique-et-de-danse/


•	Conservatoire de Sainte Maxime 
>> TODO ajout on script

Conservatoire Rostropovitch Landowski 
Sainte-Maxime :
Conservatoire Rostropovitch Landowski 
Rue Pierre Curie, 83120 Sainte-Maxime
04 94 43 95 90
conservatoire@cc-golfedesainttropez.fr
https://www.conservatoire-rostropovitch-landowski.fr/

Cogolin : 
Conservatoire Rostropovitch Landowski
44 Rue Marceau, 83310 Cogolin
04 98 12 29 74
conservatoire@cc-golfedesainttropez.fr
https://www.conservatoire-rostropovitch-landowski.fr/

•	Ecole de musique d'Orvault 
>> TODO ajout on script

Ecole Municipale des Musiques - OrigaMi
37, avenue de la Ferrière 44700 orvault
ecole-musique@mairie-orvault.fr
02 51 78 33 34
https://www.orvault.fr/annuaires/annuaire-des-equipements-et-services/ecole-municipale-des-musiques-origami

•	Les conservatoires et écoles de musique de Corrèze 
>> TODO ajout on script

Les conservatoires sont ceux de cette adresse ? https://conservatoireinfo.com/departement/19/
J'ai 2 ping sur la base basilic
https://data.culture.gouv.fr/explore/dataset/base-des-lieux-et-des-equipements-culturels/api/?disjunctive.type_equipement_ou_lieu&disjunctive.label_et_appellation&disjunctive.region&disjunctive.domaine&disjunctive.sous_domaines&disjunctive.departement&disjunctive.precision_equipement&q=conservatoire+corr%C3%A8ze


le conservatoire d'Annonay  
>> TODO ajout on script

Conservatoire à Rayonnement Communal
Route Levert Groupe scolaire Malleval 07100 ANNONAY
04 75 32 01 28
https://www.mairie-annonay.fr/-Conservatoire-a-Rayonnement,25-.html

l'école de musique de Faverges (74) 
>> TODO ajout on script

École des Arts Vivants Faverges-Seythenex
Centre musical, place de Bühlertal, Pl. Robert Staubli, 74210 Faverges
accueil@artsvivants.fr
04 50 44 45 28
www.artsvivants.fr


J'ai trouvé des cas spéciaux pour la carte des abonnés :
•	La BPI : elle n'est pas dans l'API du ministère. L'adresse est cependant reliée au Musée Pompidou 😕 
>>>> J'ai pris le résultat Basilic et modifié les infos copie ligne excel :
BPI	place Georges Pompidou		75004	Paris	place Georges Pompidou 75004 Paris France						48.860307, 2.351132	Paris	Ministère de la Culture - Direction générale des Patrimoines - Service des musées de France	75056	75104	MUSEE7510402	bibliothèque	Musée de France		Île-de-France	Patrimoine	Musée					69889	MUFR		200054781


•	La Cité de la musique de Marseille. Je l'ai ajouté à la main mais elle ne s'affiche pas. Elle devrait s'afficher comme un conservatoire.
>>>> Il y a un autre fichier df_all pad dans le dossier output, enquêter sur sa génération + Type_lieu equipement absent > copie ligne excel :

Cité de la Musique de Marseille	4 Rue Bernard du Bois		13001	 Marseille	4 Rue Bernard du Bois, 13001 Marseille	https://www.citemusique-marseille.com/	04 91 39 28 28				5.387725, 43.301854						conservatoire													

•	Le réseau des médiathèques de Monaco

Bibliothèque Louis Notari
8, rue Louis Notari 98000 MONACO  
+377 93 15 29 40  
mediatheque@mairie.mc
https://www.mediatheque.mc/Default/accueil-portal.aspx

Fonds patrimonial
L'Hélios - 3, promenade Honoré II 98000 MONACO 
+377 93 25 22 57
mediatheque@mairie.mc
https://www.mediatheque.mc/Default/accueil-portal.aspx

Vidéothèque - Sonothèque José Notari
2, rue Princesse Antoinette 98000 MONACO  
+377 93 30 64 48
mediatheque@mairie.mc
https://www.mediatheque.mc/Default/accueil-portal.aspx

Bibliothèque Princesse Caroline - Ludothèque
1, boulevard Albert Ier 98000 MONACO 
+377 93 15 22 72
mediatheque@mairie.mc
https://www.mediatheque.mc/Default/accueil-portal.aspx 
    

L'école européenne de Parme en Italie. 

Fondazione Collegio Europeo di Parma
Via Università 12 - 43121 Parma (PR) - Italy
+39.0521.207525
info@collegioeuropeo.it
https://www.europeancollege.it/


Universités : 

J'ai ajouté les bibliothèques de l'Université de Côte d'Azur que l'on vient d'abonner ! Malheureusement elles ne s'affichent pas 😕
>>> Je ne vois pas l'ajout dans les fichiers

Je te laisse vérifier pourquoi. Il faudra ajouter ensuite les bibliothèques de l'Université Grenoble Alpes.
>>> Univertistés Grenoble

Bibliothèque de l'Institut d'urbanisme et de géographie alpine
14-14 bis Avenue Marie Reynoard 38100 Grenoble
04 76 74 87 42
iuga-bibliotheque@univ-grenoble-alpes.fr
http://bibliotheques.univ-grenoble-alpes.fr/

Bibliothèque universitaire Droit et Lettres
71 rue des Universités CS 10085 38402 Saint-Martin-d'Hères Cedex
04 76 82 61 42
budl-public@univ-grenoble-alpes.fr

Bibliothèque universitaire Joseph-Fourier
40 rue des Mathématiques CS 20066 38402 Saint-Martin-d'Hères Cedex
04 76 51 42 84
bujf-public@univ-grenoble-alpes.fr

Bibliothèque universitaire Médecine-Pharmacie
Domaine de la Merci 38706 La Tronche
04 76 63 71 48
bump-public@univ-grenoble-alpes.fr

Bibliothèque universitaire Professorat Éducation Annecy
Parc d'activités Annecy La Ravoire Bât C Impasse de La Ravoire 74370 Épagny Metz-Tessy
04 50 78 71 64
bupeann-public@univ-grenoble-alpes.fr

Bibliothèque universitaire Professorat Éducation Chambéry
289 rue Marcoz 73000 Chambéry
04 57 04 10 71
bupechamb-public@univ-grenoble-alpes.fr
http://bibliotheques.univ-grenoble-alpes.fr/

Bibliothèque universitaire Rodolphe-Pesce
19 place Latour-Maubourg CS 92122 26000 Valence
04 38 38 84 00
buvalence@univ-grenoble-alpes.fr

Bibliothèque Yves-de-la-Haye
Institut de la Communication et des Médias 11 avenue du 8 mai 1945 38434 Échirolles
04 76 74 83 22
buicm-public@univ-grenoble-alpes.fr

>>>> Il y a d'autres valeurs dans la colonne type equipement, à corriger (autre que spécifié)


