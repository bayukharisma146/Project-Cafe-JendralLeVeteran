export const runtime = "nodejs";
// src/app/api/gallery/route.js
import { NextResponse } from "next/server";

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

// Dummy data untuk contoh (karena Supabase dihapus)
const dummyGallery = [
  { id: 1, tab: "food", image_url: "/image/food/food1.jpg" },
  { id: 2, tab: "food", image_url: "/image/food/food2.jpg" },
  { id: 3, tab: "people", image_url: "/image/people/people1.jpg" },
  { id: 4, tab: "other", image_url: "/image/other/other1.jpg" },
];

export async function GET() {
  // Group data by tab, each tab berisi array objek {id, image_url}
  const grouped = dummyGallery.reduce((acc, item) => {
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

  // Simulasi insert ke dummy data
  const newItem = {
    id: Date.now(),
    tab,
    image_url: image,
  };
  dummyGallery.push(newItem);

  return NextResponse.json({ message: "Image added", data: newItem });
}

export async function DELETE(request) {
  const user = await verifyFirebaseUser(request);
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await request.json();

  if (!id) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  // Simulasi hapus dari dummy data
  const idx = dummyGallery.findIndex((item) => item.id === id);
  if (idx !== -1) {
    dummyGallery.splice(idx, 1);
    return NextResponse.json({ message: "Image deleted" });
  } else {
    return NextResponse.json({ error: "Image not found" }, { status: 404 });
  }
}
