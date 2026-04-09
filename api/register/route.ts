export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import bcryptjs from 'bcryptjs';
import { isValidEmail, isValidPassword, checkRateLimit } from "@/app/lib/security";

export async function POST(request: Request) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('cf-connecting-ip') || 'unknown';
    if (!checkRateLimit(`register:${ip}`, 5, 3600000)) { // 5 registrations par heure
      return NextResponse.json(
        { success: false, error: "Trop de tentatives. Veuillez réessayer plus tard." },
        { status: 429 }
      );
    }

    const { email, password } = await request.json();

    // Validation des inputs
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Veuillez remplir tous les champs." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: "Email invalide." },
        { status: 400 }
      );
    }

    if (!isValidPassword(password)) {
      return NextResponse.json(
        { success: false, error: "Le mot de passe doit contenir au moins 8 caractères." },
        { status: 400 }
      );
    }

    // 1. Vérifier si l'utilisateur existe
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "Cet email est déjà utilisé." },
        { status: 400 }
      );
    }

    // 2. Hasher le mot de passe
    const hashedPassword = await bcryptjs.hash(password, 10);

    // 3. Créer l'utilisateur en base de données
    await db.user.create({
      data: { email, password: hashedPassword },
    });

    return NextResponse.json({ success: true, error: null });

  } catch (error: any) {
    // Log l'erreur complète en développement/serveur seulement
    if (process.env.NODE_ENV === 'development') {
      console.error("❌ Erreur API Register :", error);
    }
    // Ne jamais révéler les détails d'erreur au client
    return NextResponse.json(
      { success: false, error: "Erreur serveur. Veuillez réessayer plus tard." },
      { status: 500 }
    );
  }
}