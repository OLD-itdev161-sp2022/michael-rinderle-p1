import mongoose from 'mongoose';

const CompileSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
});

const Compile = mongoose.model('user', CompileSchema);

export default Compile;