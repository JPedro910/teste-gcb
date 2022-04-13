import * as yup from 'yup';

yup.setLocale({
  mixed: {
    default: 'Há algum problema com um dos campos do seu formulário',
    required: 'Preencha todos os campos',
  },
  string: {
    max: 'Um dos campos tem mais caracteres do que o permitido',
  },
  array: {
    min: 'O mínimo de especialidades são duas',
  },
});

const DoctorSchema = yup.object().shape({
  name: yup.string().required().max(120),
  crm: yup
    .string()
    .matches(/^[0-9]*$/, 'O campo CRM só aceita números')
    .required()
    .max(7),
  landline: yup
    .string()
    .matches(/^[0-9]*$/, 'O campo de telefone fixo só aceita números')
    .required()
    .max(10),
  cellPhone: yup
    .string()
    .matches(/^[0-9]*$/, 'O campo de telefone celular só aceita números')
    .required()
    .max(11),
  cep: yup
    .string()
    .matches(/^[0-9]*$/, 'O campo de CEP só aceita números')
    .required()
    .max(8),
  specialties: yup.array().min(2),
});

export const Validation = (object: any) =>
  DoctorSchema.validate(object).catch((error) => error);
