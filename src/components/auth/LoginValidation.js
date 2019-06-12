import { createValidator, required, maxLength, email, minLength } from '../../utils/validations';

/******************************************************
* Constante para validaciones del formulario de Login *
*******************************************************/
const loginValidation = createValidator({
  email: [required, email], // Valido que el email sea requerido y cumpla con la REGEX
  password: [required, minLength(8), maxLength(16)] // Valido que el password este entre 8 y 16
});

export default loginValidation;