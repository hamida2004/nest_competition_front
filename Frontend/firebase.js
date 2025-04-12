// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, push } from "firebase/database";

// 🔐 معلومات التهيئة
const firebaseConfig = {
  apiKey: "AIzaSyBUkfs6FIGeM1fQ9BjOKHnlswuzfIQURJ4",
  authDomain: "hackthonproject-68248.firebaseapp.com",
  databaseURL: "https://hackthonproject-68248-default-rtdb.firebaseio.com",
  projectId: "hackthonproject-68248",
  storageBucket: "hackthonproject-68248.firebasestorage.app",
  messagingSenderId: "106740702821",
  appId: "1:106740702821:web:b8daeb0321e094bf89b08c"
};

// 🔧 تهيئة التطبيق
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ✅ 🔽 📤 دالة لكتابة بيانات إلى المسار (تحديث أو إضافة)
export function writeData(path, data) {
  set(ref(db, path), data)
    .then(() => console.log("✅ Data written successfully!"))
    .catch((error) => console.error("❌ Write failed:", error));
}

// ✅ 🔼 📥 دالة لقراءة بيانات من المسار
export function readData(path, callback) {
  const dataRef = ref(db, path);
  onValue(dataRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
}
