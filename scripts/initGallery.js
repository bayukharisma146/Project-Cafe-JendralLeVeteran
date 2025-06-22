import dotenv from "dotenv";
dotenv.config();

import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// === Inisialisasi Firebase Admin ===
initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  }),
});

const db = getFirestore();
const region = process.env.AWS_REGION || "ap-southeast-1";
const bucket = "jendralmy-gallery-bucket-123";

// === Data Gambar Statis ===
const data = [
  ...Array.from({ length: 19 }, (_, i) => ({
    id: `food${i + 1}`,
    image_url: `https://${bucket}.s3.${region}.amazonaws.com/food/food${
      i + 1
    }.jpg`,
    tab: "food",
  })),
  ...Array.from({ length: 7 }, (_, i) => ({
    id: `people${i + 1}`,
    image_url: `https://${bucket}.s3.${region}.amazonaws.com/people/people${
      i + 1
    }.jpg`,
    tab: "people",
  })),
  {
    id: "other1",
    image_url: `https://${bucket}.s3.${region}.amazonaws.com/other/other1.jpg`,
    tab: "other",
  },
];

// === Fungsi Upload ke Firestore ===
async function uploadStaticGallery() {
  try {
    for (const item of data) {
      await db.collection("gallery").doc(item.id).set(item);
      console.log(`✅ Uploaded: ${item.id}`);
    }
    console.log("🎉 Semua gambar berhasil dimigrasikan ke Firestore!");
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

uploadStaticGallery();
