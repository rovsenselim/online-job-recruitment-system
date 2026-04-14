import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI); // artıq əlavə optionlara ehtiyac yoxdur
        console.log("✅ MongoDB bağlantısı uğurla quruldu");
    } catch (error) {
        console.error("❌ MongoDB bağlantı xətası:", error.message);
        process.exit(1);
    }
};