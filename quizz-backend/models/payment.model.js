const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema(
	{
		amount: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
		},
		status: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
		},
		paymeny_method: {
			type: String,
		},
		item: {
			type: String,
			default: true,
		},
		user: {
			type: String,
			default: true,
		},
		email: {
			type: String,
			default: true,
		},
		trx_date: {
			type: Date,
			default: true,
		}
	},
);

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;