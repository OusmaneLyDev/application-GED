# Gestion Électronique de Documents (GED)

## Description

Cette application de Gestion Électronique de Documents (GED) est conçue pour gérer les utilisateurs, les types de documents, les statuts des documents, et les documents eux-mêmes. Elle permet d'effectuer des opérations CRUD (Créer, Lire, Mettre à jour, Supprimer) sur ces entités et utilise une base de données PostgreSQL avec Prisma ORM.

---

## Prérequis

Avant d'installer et de lancer l'application, assurez-vous que les éléments suivants sont installés sur votre machine :

1. **Node.js** - Version 14 ou plus récente
2. **PostgreSQL** - Version 13 ou plus récente
3. **NPM** - Version 6 ou plus récente
4. **Prisma** - ORM pour Node.js
5. **Git** - Pour la gestion des versions (optionnel)

### Packages utilisés

- `express` : Framework web pour Node.js
- `prisma` : ORM pour interagir avec PostgreSQL
- `pg` : Pilote pour PostgreSQL
- `nodemon` : Outil pour redémarrer automatiquement le serveur
- `dotenv` : Pour charger les variables d'environnement

---

## Installation

### 1. Cloner le dépôt (si nécessaire)

```bash
git clone https://github.com/OusmaneLyDev/application-GED.git
cd application-GED

install
```

- Configurer l'environnement
  Créez un fichier .env à la racine du projet et ajoutez les configurations nécessaires (par exemple, pour la base de données).

- Exemple .env :

2. **Installer les dépendances**

    ```bash
    npm install
    ```

3. **Lancer l'application**

    ```bash
    npm start
    ```

### 4. Configurer la base de données

- Assurez-vous que PostgreSQL est en cours d'exécution sur votre machine locale.
- Mettez les paramètres de connexion dans schema.prisma.
- Créez un fichier .env avec la configuration de votre base de données : 

```bash
DATABASE_URL="postgresql://postgres:mot-de-passe@localhost:5432/gestion_documents"

PORT = 3051
```

- Importer la collection les collections dans postman pour effectuer des tests:
 - `RequetteAjout.postman_collection.json`
 - `Login.postman_collection.json`
- ` Document.postman_collection.json`
 - `TypeDocument.postman_collection.json`


## Endpoints API


**Récupérer toutes les utilisateurs**

- URL : http://localhost:3051/users
- Méthode : GET
- Réponse: 

```bash
[
   {
            "id": 1,
            "nom": "Ousmane Ly",
            "email": "ousmane@gmail.com",
            "mot_de_passe": "$2b$10$TuanqEzfpXSDe2VkZUxxOeucgkFxDlz20OVLnJXdXL3uAaZIj5SPm",
            "role": "Administrateur",
        },
        {
            "id": 2,
            "nom": "Abdoul Ba",
            "email": "abdoul@gmail.com",
            "mot_de_passe": "$2b$10$PAyUWprLGAKEAmZlXGqCIuM4B4hpnWIRbxj4GVtrNJc78vtXMVMuy",
            "role": "Gestionnaire RH",
        },
]
```

**Créer une nouveau utilisateur**

- URL : http://localhost:3051/users
- Méthode : POST

```bash
 [
    {
   "fullname": "Ousmane",
   "email": "ousmane@gmail.com",
   "mot_de_passe": "password123",
   "role": "Adminisrateur"
  }
 ]
```

**Récupérer un utilisateur**

- URL : http://localhost:3051/users/3
- Méthode : GET
- Réponse: 

```bash
[
  
    {
        "id": 3,
        "nom": "Siwa Sall",
        "email": "siwa@gmail.com",
        "mot_de_passe": "$2b$10$nsKGLpIGNCToOKc.0w1zROmasLUDdxRM6dcg88X7J6T9NbhiN5NJe",
        "role": "Gestionnaire RH",
    }
  
]
```

**Mettre à jour une  information d'un utilisateur**

- URL : http://localhost:3051/users/2
- Méthode : PUT

```bash
{
    "message": "User with ID 2 updated successfully.",
    "user": {
        "id": 2,
        "nom": "Seydou",
        "email": "seydou98@gmail.com",
        "mot_de_passe": "$2a$10$LwkAv1z0GBMOW5SZ0M0/TOR95C2Lc.pALdchalia7npAvsAVGxpgO",
        "role": "Gestionnaire RH",
    }
 }
```

 **Supprimer un utilisateur**

- URL :http://localhost:3051/users/14
- Méthode : DELETE
- Réponse: 
  ```bash
  {
    "message": "User with ID 14 deleted successfully."
  }
```

### Tests unitaires

```bash
npm test
```

### Eslint : corriger le code

```bash
npm run lint
```

```bash
npm run lint:fix
```

### Prettier :formater le code

```bash
npm run format
```


## Auteur

[Ethman Ly](https://github.com/OusmaneLyDev).