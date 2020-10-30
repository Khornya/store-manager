# Installation

1. Installer CouchDB
2. Installer yarn
3. Créer un utilisateur "admin" avec le mot de passe "admin" dans CouchDB
4. Créer une base de données "store-manager" dans CouchDB (si ca ne fonctionne pas les params sont dans dbService)
5. yarn install
6. npm install -g add-cors-to-couchdb
7. add-cors-to-couchdb http://localhost:5984 -u admin -p admin (en remplacant par les bonnes informations si nécessaire --> pour les requêtes cors)
8. yarn build pour créer un éxécutable
9. yarn start pour démarré l'application en version de dev
10. yarn react-start pour uniquement démarré le côté web
11. exécuter le fichier .exe du dossier dist
