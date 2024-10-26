import i18n from 'i18n';
import path from 'path';

i18n.configure({
  locales: ['en', 'fr', 'ar'], // Ajout des langues disponibles
  directory: path.join(__dirname, '../locales'), // Chemin non utilisé ici mais requis par i18n
  defaultLocale: 'fr',
  autoReload: true,
  updateFiles: false,
  objectNotation: true,
  register: global
});

// Définir les traductions dans un seul fichier
const translations = {
  en: {
    userNotFound: "User not found.",
    fetchUsersError: "An error occurred while fetching users.",
    fetchUserError: "An error occurred while fetching the user.",
    missingFields: "All fields (name, email, password, role) must be provided.",
    emailInUse: "This email is already in use. Please choose another.",
    createUserError: "An error occurred while creating the user.",
    updateUserSuccess: "User updated successfully.",
    updateUserError: "An error occurred while updating the user.",
    deleteUserSuccess: "User deleted successfully.",
    deleteUserError: "An error occurred while deleting the user."
  },
  fr: {
    userNotFound: "Utilisateur non trouvé.",
    fetchUsersError: "Une erreur est survenue lors de la récupération des utilisateurs.",
    fetchUserError: "Une erreur est survenue lors de la récupération de l'utilisateur.",
    missingFields: "Tous les champs (nom, email, mot de passe, rôle) doivent être fournis.",
    emailInUse: "Cet email est déjà utilisé. Veuillez en choisir un autre.",
    createUserError: "Une erreur est survenue lors de la création de l'utilisateur.",
    updateUserSuccess: "Utilisateur mis à jour avec succès.",
    updateUserError: "Une erreur est survenue lors de la mise à jour de l'utilisateur.",
    deleteUserSuccess: "Utilisateur supprimé avec succès.",
    deleteUserError: "Une erreur est survenue lors de la suppression de l'utilisateur."
  },
  ar: {
    userNotFound: "المستخدم غير موجود.",
    fetchUsersError: "حدث خطأ أثناء جلب المستخدمين.",
    fetchUserError: "حدث خطأ أثناء جلب المستخدم.",
    missingFields: "يجب توفير جميع الحقول (الاسم، البريد الإلكتروني، كلمة المرور، الدور).",
    emailInUse: "البريد الإلكتروني هذا مستخدم بالفعل. يرجى اختيار بريد آخر.",
    createUserError: "حدث خطأ أثناء إنشاء المستخدم.",
    updateUserSuccess: "تم تحديث المستخدم بنجاح.",
    updateUserError: "حدث خطأ أثناء تحديث المستخدم.",
    deleteUserSuccess: "تم حذف المستخدم بنجاح.",
    deleteUserError: "حدث خطأ أثناء حذف المستخدم."
  }
};

// Charger les traductions dans i18n
Object.keys(translations).forEach((locale) => {
  i18n.addTranslations(locale, translations[locale]);
});

export default i18n;
