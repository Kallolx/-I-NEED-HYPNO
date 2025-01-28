
// src/models/Audio.js
const audioSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    category: { type: String, required: true },
    bundle: { type: String, required: true },
    audioUrl: { type: String, required: true },
    duration: Number,
    order: Number
  }, { timestamps: true });
  
  export default mongoose.models.Audio || mongoose.model('Audio', audioSchema);