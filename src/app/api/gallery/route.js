// src/app/api/gallery/route.js
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient"; // sesuaikan path
import admin from "@/lib/firebaseAdmin"; // sesuaikan path

// Verifikasi token Firebase
async function verifyFirebaseUser(request) {
  const authHeader = request.headers.get("authorization") || "";
  if (!authHeader.startsWith("Bearer ")) return null;
  const idToken = authHeader.split("Bearer ")[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    return decodedToken;
  } catch (error) {
    return null;
  }
}

export async function GET() {
  const { data, error } = await supabase
    .from("gallery")
    .select("id, tab, image_url")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Group data by tab, each tab berisi array objek {id, image_url}
  const grouped = data.reduce((acc, item) => {
    if (!acc[item.tab]) acc[item.tab] = [];
    acc[item.tab].push({ id: item.id, image_url: item.image_url });
    return acc;
  }, {});

  return NextResponse.json(grouped);
}

export async function POST(request) {
  const user = await verifyFirebaseUser(request);
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { tab, image } = await request.json();

  if (!tab || !image) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("gallery")
    .insert([{ tab, image_url: image }])
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Image added", data });
}

export async function DELETE(request) {
  const user = await verifyFirebaseUser(request);
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await request.json();

  if (!id) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const { error } = await supabase.from("gallery").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Image deleted" });
}
