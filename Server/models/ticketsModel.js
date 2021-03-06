import mongoose from 'mongoose';
const ticketsSchema = new mongoose.Schema({
    name                : String,
    year                : String,
    month               : String,
    value               : Number,
    priority            : String,
    createdAt           : {
      type: Date,
      default: Date.now,
      required: 'Must have start date - default value is the created date'
    }
});

export default mongoose.model('Tickets', ticketsSchema, 'tickets');
