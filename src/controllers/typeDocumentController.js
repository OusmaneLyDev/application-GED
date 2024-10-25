import prisma from '../config/prisma-client.js';  // Assure-toi que Prisma est bien configuré

// Récupérer tous les types de documents
export const getTypesDocument = async (req, res) => {
  try {
    const typesDocument = await prisma.typeDocument.findMany();
    res.json(typesDocument);  // Envoi de la réponse avec les types de documents
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des types de documents.' });
  }
};

// Récupérer un type de document par ID
export const getTypeDocumentById = async (req, res) => {
  try {
    const { id } = req.params;
    const typeDocument = await prisma.typeDocument.findUnique({
      where: { id: parseInt(id) }  // Recherche du type de document par ID
    });
    if (typeDocument) {
      res.json(typeDocument);
    } else {
      res.status(404).json({ error: 'Type de document non trouvé.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération du type de document.' });
  }
};

// Créer un nouveau type de document
export const createTypeDocument = async (req, res) => {
  try {
    const { nom, description, id_Utilisateur } = req.body;

    // Vérifier la présence des champs requis
    if (!nom || !id_Utilisateur) {
      return res.status(400).json({ error: 'Les champs "nom" et "id_Utilisateur" sont requis.' });
    }

    // Créer un nouveau type de document avec les données fournies
    const newTypeDocument = await prisma.typeDocument.create({
      data: {
        nom,
        description,
        id_Utilisateur: parseInt(id_Utilisateur)  // Assurez-vous que c'est bien un entier
      }
    });

    res.status(201).json(newTypeDocument);
  } catch (error) {
    console.error("Erreur détaillée:", error);
    res.status(500).json({ error: 'Erreur lors de la création du type de document.', details: error.message });
  }
};

// Mettre à jour un type de document existant
export const updateTypeDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, description } = req.body;

    // Vérifier la présence des champs requis
    if (!nom) {
      return res.status(400).json({ error: 'Le champ "nom" est requis.' });
    }

    const updatedTypeDocument = await prisma.typeDocument.update({
      where: { id: parseInt(id) },
      data: { nom, description }
    });
    res.json(updatedTypeDocument);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour du type de document.' });
  }
};

// Supprimer un type de document (vérification des documents associés)
export const deleteTypeDocument = async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifier si des documents actifs sont associés à ce type de document
    const documentsAssocies = await prisma.document.count({
      where: { typeDocumentId: parseInt(id), statut: 'actif' }
    });
    if (documentsAssocies > 0) {
      return res.status(400).json({ error: "Impossible de supprimer ce type de document. Il est associé à des documents actifs." });
    }

    await prisma.typeDocument.delete({
      where: { id: parseInt(id) }
    });
    res.status(204).send();  // Pas de contenu à renvoyer
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du type de document.' });
  }
};
