export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import bcryptjs from 'bcryptjs';
import { cookies } from 'next/headers';
import { checkRateLimit } from "@/app/lib/security";

export async function POST(request: Request) {
  try {
    // Rate limiting - 10 tentatives de login par 15 minutes
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('cf-connecting-ip') || 'unknown';
    if (!checkRateLimit(`login:${ip}`, 10, 900000)) { // 10 attempts par 15 minutes
      return NextResponse.json(
        { success: false, error: "Trop de tentatives. Veuillez réessayer plus tard." },
        { status: 429 }
      );
    }

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Veuillez remplir tous les champs." },
        { status: 400 }
      );
    }

    // 1. Trouver l'utilisateur
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Identifiants incorrects." },
        { status: 401 }
      );
    }

    // 2. Vérifier le mot de passe
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: "Identifiants incorrects." },
        { status: 401 }
      );
    }

    // 3. Créer une session avec cookie
    const cookieStore = await cookies();
    cookieStore.set('userId', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 jours
    });

    return NextResponse.json({ 
      success: true, 
      error: null,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      }
    });

  } catch (error: any) {
    // Log l'erreur complète en développement/serveur seulement
    if (process.env.NODE_ENV === 'development') {
      console.error("❌ Erreur API Login :", error);
    }
    // Ne jamais révéler les détails d'erreur au client
    return NextResponse.json(
      { success: false, error: "Erreur serveur. Veuillez réessayer plus tard." },
      { status: 500 }
    );
  }
}
