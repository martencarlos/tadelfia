import mongoose from "mongoose";

const { Schema } = mongoose;

const bookingSchema = new Schema(
  {
    contact: {
      firstName: {
        type: String,
        required: true,
        },
      lastName: {
        type: String,
        required: true,
        },
      email: {
        type: String,
        required: true,
        },
      phone: {
        type: String,
        required: true,
      },
    },
    address: {
      street: {
        type: String,
        required: true,
      },
      postal: {
        type: Number,
        required: true,
      },
      towncity: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    accomodation: {
      villa: {
        type: String,
        required: true,
      },
      messageToHost: {
        type: String,
        required: false,
      },
      checkin: {
        type: Date,
        required: true,
      },
      checkout: {
        type: Date,
        required: true,
      },
      nights: {
        type: Number,
        required: true,
      },
      guests: {
        type: String,
        required: true,
      },
    },
    payment: {
      id: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      currency: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Booking || mongoose.model("Booking", bookingSchema); 
