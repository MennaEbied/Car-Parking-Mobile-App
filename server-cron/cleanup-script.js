/* eslint-disable prettier/prettier */
// cleanup-script.js

// Import the Firebase Admin SDK
const admin = require('firebase-admin');

// Get the service account key from the environment variable set by GitHub Actions
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

// Initialize the Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// The main function to run the cleanup logic
async function runCleanup() {
  console.log("Running scheduled job: cleanupExpiredReservations");
  const nowISO = new Date().toISOString();

  const query = db.collection("reservations")
    .where("status", "==", "active")
    .where("endTime", "<=", nowISO);

  try {
    const expiredReservationsSnapshot = await query.get();

    if (expiredReservationsSnapshot.empty) {
      console.log("No expired reservations found. Job finished.");
      return;
    }

    const batch = db.batch();
    let expiredCount = 0;

    expiredReservationsSnapshot.forEach(doc => {
      expiredCount++;
      const reservation = doc.data();
      console.log(`Found expired reservation (ID: ${doc.id}) for slot ${reservation.slotId}.`);

      const reservationRef = doc.ref;
      batch.update(reservationRef, { status: "completed" });

      const slotRef = db.collection("slots").doc(reservation.slotId.toString());
      batch.update(slotRef, { status: "available", reservedBy: null });
    });

    await batch.commit();
    console.log(`Successfully processed and cleaned up ${expiredCount} expired reservation(s).`);

  } catch (error) {
    console.error("Error cleaning up expired reservations:", error);
    // Exit with an error code to make the GitHub Action fail
    process.exit(1);
  }
}

// Run the function
runCleanup();