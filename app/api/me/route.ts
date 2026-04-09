export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";
import { cookies } from 'next/headers';
import { db } from "../../lib/db";

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;

    if (!userId) {
      return NextResponse.json(
        { success: false, user: null },
        { status: 401 }
      );
    }

    // Récupérer l'utilisateur
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, createdAt: true },
    });

    if (!user) {
      // Cookie invalide, supprimer le cookie
      (await cookies()).delete('userId');
      return NextResponse.json(
        { success: false, user: null },
        { status: 401 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      user,
    });

  } catch (error: any) {
    // Log l'erreur complète en développement/serveur seulement
    if (process.env.NODE_ENV === 'development') {
      console.error("❌ Erreur API /me :", error);
    }
    return NextResponse.json(
      { success: false, user: null },
      { status: 500 }
    );
  }
}