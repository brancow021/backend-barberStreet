import { Schema, model } from "mongoose";

var validateEmail = function (email: string) {
	var expressionEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

	return expressionEmail.test(email);
};

const barberSchema = new Schema({
	typeDocumentId: {
		type: String,
		required: [true, "El tipo de documento es requerido"],
	},
	name: {
		type: String,
		required: [true, "El nombre es requerido"],
		minlength: [3, "El nombre debe contener minimo 3 carateres"],
		maxlength: [30, "El nombre no puede exceder los 30 caracteres"],
	},
	lastName: {
		type: String,
		required: [true, "El apellido es requerido"],
		minlength: [3, "El apellido debe contener minimo 3 carateres"],
		maxlength: [50, "El apellido no puede exceder los 30 caracteres"],
	},
	identityDocument: {
		type: Number,
		required: [true, "El numero de identidad es requerido"],
		minlength: [
			10,
			"El documento de identidad debe tener minimo 10 caracteres",
		],
		maxlength: [
			15,
			"El documento de identidad no puede exceder los 15 caracteres",
		],
	},
	email: {
		type: String,
		unique: true,
		lowercase: true,
		trim: true,
		required: [true, "El email es requerido"],
		validate: [validateEmail, "Por favor ingrese un email valido!"],
	},
	phone: {
		type: String,
		unique: true,
		required: [true, "El numero de telefono es requerido"],
		minlength: [10, "El numero de telefono debe tener minimo 10 caracteres"],
		maxlength: [15, "El numero no debe exceder los 15 caracteres"],
	},
	country: {
		type: String,
		required: [true, "El pais es requerido"],
	},
	city: {
		type: String,
		required: [true, "La ciudad es requerida"],
	},

	dataAuth: {
		username: {
			type: String,
		},
		password: {
			type: String,
			minlength: [6, "La contraseña debe tener como minimo 6 caracteres"],
		},
		last_login: Date,
		addedDate: { type: Date, default: Date.now },
	},
	paymentMethod: {},

	date: {
		type: Date,
		default: Date.now,
	},
	frontalDocument: {
		type: String,
		required: [true, "Foto del documento es requerida"],
	},
	backDocument: {
		type: String,
		required: [true, "Foto del documento es requerida"],
	},
	active: {
		type: Boolean,
		default: false,
	},
});

export default model("barber", barberSchema);
