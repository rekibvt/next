import { NextResponse } from "next/server";
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('userId');

    return NextResponse.json({ 
      success: true, 
      message: "Déconnexion réussie"
    });

  } catch (error: any) {
    console.error("❌ Erreur API Logout :", error);
    return NextResponse.json(
      { success: false, error: "Erreur lors de la déconnexion" },
      { status: 500 }
    );
  }
}
