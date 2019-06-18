const mongoose = require('mongoose');

let ToDosSchema = new mongoose.Schema ({
	task: {
		type: String,
		required: true
	},
	in_date: {
		type: Date,
		required: true
	}
})
let ToDosModel = mongoose.model('todos', ToDosSchema)
module.exports = ToDosModel;
