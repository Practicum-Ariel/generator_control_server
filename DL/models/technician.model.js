const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const TechnicianSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  idNum: {
    type: String,
    required: true,
    unique: true,
  },

  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },

  treatmentsId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Treatment',
    },
  ],

  password: {
    type: String,
    required: true,
    select: false,
  },
});

// הצפנת הסיסמה לפני שמירת הטכנאי
TechnicianSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  try { 
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt); // הצפנת הסיסמא עם הסאילט שנוצר , והחלפת הסיסמא המקרואית בסיסמא המוצפנת
    next();
  } catch (error) {
    next(error);
  }
});

const Technician = mongoose.model('Technician', TechnicianSchema);
module.exports = Technician;
