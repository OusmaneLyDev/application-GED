const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createUtilisateur = async (req, res) => {
  try {
    const { nom, email, mot_de_passe, role } = req.body;
    const utilisateur = await prisma.utilisateurs.create({
      data: { nom, email, mot_de_passe, role }
    });
    res.status(201).json(utilisateur);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUtilisateurs = async (req, res) => {
  try {
    const utilisateurs = await prisma.utilisateurs.findMany();
    res.status(200).json(utilisateurs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
