const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createDocument = async (req, res) => {
  try {
    const { titre, description, date_depot, id_utilisateur, id_typedocument, id_statutdocument } = req.body;
    const document = await prisma.documents.create({
      data: {
        titre,
        description,
        date_depot,
        id_utilisateur,
        id_typedocument,
        id_statutdocument
      }
    });
    res.status(201).json(document);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDocuments = async (req, res) => {
  try {
    const documents = await prisma.documents.findMany();
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
