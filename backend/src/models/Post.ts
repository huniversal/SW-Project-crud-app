import mongoose, { Document, Schema } from 'mongoose';

export interface IPost extends Document {
  title: string;
  content: string;
  createdAt: Date;      
  updatedAt: Date;
}

const PostSchema: Schema = new Schema<IPost>({
  title: {
    type: String,           // 문자열이어야 해
    required: true,         // 반드시 있어야 해  
    trim: true,             // 앞뒤 공백 자동 제거
    maxlength: 255 
  },
  content: {
    type: String,
    required: true
  }
}, { timestamps: true
})

export default mongoose.model<IPost>('Post', PostSchema);