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
git clone https://github.com/your-repo/gestion-documents.git
cd gestion-documents
