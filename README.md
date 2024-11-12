# Mise en place d'une application de suivi des expeditions de colis

Ce projet est développé avec **Express.js** et utilise **Prisma** pour l'ORM (Object Relational Mapping), en interaction avec une base de données **PostgreSQL**. L'application offre des fonctionnalités pour la gestion des utilisateurs, expéditions, paiements, colis, livraisons, méthodes de paiement et types de colis.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- [Node.js](https://nodejs.org) (version 14 ou supérieure)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [PostgreSQL](https://www.postgresql.org/)

## Installation

1. Clonez le dépôt :

```bash
   git clone https://github.com/AssaBaradji/bakend_gestions_colis.git
```

2.Accédez au répertoire du projet :

```bash
cd bakend_gestions_colis
```

3.Installez les dépendances :

```bash
npm install
```

## Configuration de la Base de Données

1.Assurez-vous que PostgreSQL est en cours d'exécution et créez une base de données pour le projet.

2.Configurez Prisma en créant un fichier `.env` à la racine du projet et en ajoutant la variable `DATABASE_URL` avec l'URL de votre base de données :

```plaintext
DATABASE_URL="postgresql://utilisateur:mot_de_passe@localhost:5432/nom_de_la_base"
```

3.Générez le client Prisma et synchronisez le schéma avec la base de données :

```bash
npx prisma generate
npx prisma migrate dev --name initial_migration
```

## Utilisation

Pour démarrer le serveur backend, exécutez :

```bash
npm start
```

## Documentation API pour les Modèles

## Utilisateurs

### Ajouter un Utilisateur

- **Endpoint :** `POST /utilisateurs/register`
- **Description :** Crée un nouvel utilisateur.
- **Corps de la requête :**

```json
{
  "nom": "Nom",
  "email": "exemple@mail.com",
  "mot_de_passe": "motDePasse123",
  "role": "Admin",
  "statut": true
}
```

### Modifier un Utilisateur

- **Endpoint :** `PUT /utilisateurs/:id`
- **Description :** Met à jour les informations d'un utilisateur spécifique.
- **Corps de la requête :**

```json
{
  "nom": "Nom Modifié",
  "email": "nouveau@mail.com",
  "role": "Agent",
  "statut": false
}
```

### Lister les Utilisateurs

- **Endpoint :** `GET /utilisateurs`
- **Description :** Récupère la liste de tous les utilisateurs.

### Récupérer un Utilisateur par ID

- **Endpoint :** `GET /utilisateurs/:id`
- **Description :** Récupère un utilisateur spécifique via son ID.

### Supprimer un Utilisateur

- **Endpoint :** `DELETE /utilisateurs/:id`
- **Description :** Supprime un utilisateur spécifique par ID.

---

## Expéditions

### Ajouter une Expédition

- **Endpoint :** `POST /expeditions`
- **Description :** Crée une nouvelle expédition.
- **Corps de la requête :**

```json
{
  "nom_destinataire": "Nom",
  "prenom_destinataire": "Prénom",
  "telephone_destinataire": "0600000000",
  "destination": "Paris",
  "date_expedition": "2024-11-12"
}
```

### Modifier une Expédition

- **Endpoint :** `PUT /expeditions/:id`
- **Description :** Met à jour les informations d'une expédition.
- **Corps de la requête :**

```json
{
  "destination": "Nouvelle Destination",
  "date_expedition": "2024-12-01"
}
```

### Lister les Expéditions

- **Endpoint :** `GET /expeditions`
- **Description :** Récupère la liste de toutes les expéditions.

### Récupérer une Expédition par ID

- **Endpoint :** `GET /expeditions/:id`
- **Description :** Permet de récupérer les informations d'une expédition par ID.

### Supprimer une Expédition

- **Endpoint :** `DELETE /expeditions/:id`
- **Description :** Supprime une expédition par ID.

---

## Paiements

### Ajouter un Paiement

- **Endpoint :** `POST /paiements`
- **Description :** Crée un nouveau paiement pour une expédition ou un colis.
- **Corps de la requête :**

```json
{
  "montant": 100.0,
  "moment_paiement": "A la livraison",
  "date_paiement": "2024-11-12"
}
```

### Modifier un Paiement

- **Endpoint :** `PUT /paiements/:id`
- **Description :** Met à jour les informations d'un paiement.
- **Corps de la requête :**

```json
{
  "montant": 150.0
}
```

### Lister les Paiements

- **Endpoint :** `GET /paiements`
- **Description :** Récupère la liste de tous les paiements.

### Récupérer un Paiement par ID

- **Endpoint :** `GET /paiements/:id`
- **Description :** Permet de récupérer les informations d'un paiement par ID.

### Supprimer un Paiement

- **Endpoint :** `DELETE /paiements/:id`
- **Description :** Supprime un paiement par ID.

---

## Colis

### Ajouter un Colis

- **Endpoint :** `POST /colis`
- **Description :** Ajoute un colis avec les informations pertinentes.
- **Corps de la requête :**

```json
{
  "code_colis": "COL123",
  "description": "Fragile",
  "emplacement_colis": "Entrepôt A",
  "prix": 50.0
}
```

### Modifier un Colis

- **Endpoint :** `PUT /colis/:id`
- **Description :** Met à jour les informations d'un colis.
- **Corps de la requête :**

```json
{
  "emplacement_colis": "Entrepôt B",
  "prix": 60.0
}
```

### Lister les Colis

- **Endpoint :** `GET /colis`
- **Description :** Récupère la liste de tous les colis.

### Récupérer un Colis par ID

- **Endpoint :** `GET /colis/:id`
- **Description :** Récupère un colis spécifique par ID.

### Supprimer un Colis

- **Endpoint :** `DELETE /colis/:id`
- **Description :** Supprime un colis par ID.

---

## Livraisons

### Ajouter une Livraison

- **Endpoint :** `POST /livraisons`
- **Description :** Crée une nouvelle livraison.
- **Corps de la requête :**

```json
{
  "nom": "Nom",
  "prenom": "Prénom",
  "telephone": "0600000000",
  "date_livraison": "2024-11-15"
}
```

### Modifier une Livraison

- **Endpoint :** `PUT /livraisons/:id`
- **Description :** Met à jour les informations d'une livraison.
- **Corps de la requête :**

```json
{
  "date_livraison": "2024-11-20"
}
```

### Lister les Livraisons

- **Endpoint :** `GET /livraisons`
- **Description :** Récupère la liste de toutes les livraisons.

### Récupérer une Livraison par ID

- **Endpoint :** `GET /livraisons/:id`
- **Description :** Récupère une livraison par ID.

### Supprimer une Livraison

- **Endpoint :** `DELETE /livraisons/:id`
- **Description :** Supprime une livraison par ID.

---

## Méthodes de Paiement

### Ajouter une Méthode de Paiement

- **Endpoint :** `POST /methode-paiements`
- **Description :** Ajoute une nouvelle méthode de paiement.
- **Corps de la requête :**

```json
{
  "nom": "Carte de Crédit"
}
```

### Modifier une Méthode de Paiement

- **Endpoint :** `PUT /methode-paiements/:id`
- **Description :** Met à jour une méthode de paiement.
- **Corps de la requête :**

```json
{
  "nom": "Carte Débit"
}
```

### Lister les Méthodes de Paiement

- **Endpoint :** `GET /methode-paiements`
- **Description :** Affiche toutes les méthodes de paiement.

### Récupérer une Méthode de Paiement par ID

- **Endpoint :** `GET /methode-paiements/:id`
- **Description :** Récupère une méthode de paiement par ID.

### Supprimer une Méthode de Paiement

- **Endpoint :** `DELETE /methode-paiements/:id`
- **Description :** Supprime une méthode de paiement par ID.

---

## Types de Colis

### Ajouter un Type de Colis

- **Endpoint :** `POST /type-colis`
- **Description :** Ajoute un nouveau type de colis.
- **Corps de la requête :**

```json
{
  "nom": "Fragile"
}
```

### Modifier un Type de Colis

- **Endpoint :** `PUT /type-colis/:id`
- **Description :** Met à jour un type de colis.
- **Corps de la requête :**

```json
{
  "nom": "Express"
}
```

### Lister les Types de Colis

- **Endpoint :** `GET /type-colis`
- **Description :** Affiche tous les types de colis.

### Récupérer un Type de Colis par ID

- **Endpoint :** `GET /type-colis/:id`
- **Description :** Récupère un type de colis par ID.

### Supprimer un Type de Colis

- **Endpoint :** `DELETE /type-colis/:id`
- **Description :** Supprime un type de colis par ID.

## Auteur

[Assa Baradji](https://github.com/AssaBaradji)
