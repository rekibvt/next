'use server'

import { db } from './db'
import bcryptjs from 'bcryptjs'

// --- ACTION INSCRIPTION ---
export async function register(prevState: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return { success: false, error: "Tous les champs sont obligatoires." };
  }

  try {
    // 1. Vérifier si l'utilisateur existe déjà
    const existingUser = await db.user.findUnique({
      where: { email: String(email) }
    });
    
    if (existingUser) {
      return { success: false, error: "Cet email est déjà utilisé." };
    }

    // 2. Créer l'utilisateur avec mot de passe hashé
    const hashedPassword = await bcryptjs.hash(String(password), 10);
    
    await db.user.create({
      data: {
        email: String(email),
        password: hashedPassword,
      }
    });
    
    return { success: true, error: null };

  } catch (error: any) {
    console.error("Erreur Register :", error);
    return { success: false, error: "Erreur lors de la création du compte." };
  }
}

// --- ACTION CONNEXION ---
export async function login(prevState: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return { success: false, error: "Veuillez remplir tous les champs." };
  }

  try {
    // Trouver l'utilisateur avec cet email
    const user = await db.user.findUnique({
      where: { email: String(email) }
    });

    // Vérifier si l'utilisateur existe et le mot de passe est correct
    if (!user) {
      return { success: false, error: "Identifiants incorrects." };
    }

    const isPasswordValid = await bcryptjs.compare(String(password), user.password);
    
    if (!isPasswordValid) {
      return { success: false, error: "Identifiants incorrects." };
    }

    // Connexion réussie !
    return { success: true, error: null, userId: user.id };

  } catch (error: any) {
    console.error("Erreur Login :", error);
    return { success: false, error: "Erreur lors de la tentative de connexion." };
  }
}
