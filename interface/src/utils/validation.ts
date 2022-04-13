import * as yup from 'yup';

yup.setLocale({
  mixed: {
    default: 'Há algum problema com um dos campos do seu formulário',
    required: 'Preencha esse campo',
  },
  string: {
    max: "O número de caracteres desse campo deve ser menor que ${max}",
    length: "O número de algarismos desse campo deve ser ${length}",
  },
  array: {
    min: 'O mínimo de especialidades são duas',
  },
});

export const DoctorSchema = yup.object().shape({
  name: yup.string().required().max(120),
  crm: yup
    .string()
    .matches(/^[0-9]*$/, 'Esse campo só aceita números')
    .required()
    .length(7),
  landline: yup
    .string()
    .required()
    .length(10),
  cellPhone: yup
    .string()
    .required()
    .length(11),
  cep: yup
    .string()
    .required()
    .length(8)
});