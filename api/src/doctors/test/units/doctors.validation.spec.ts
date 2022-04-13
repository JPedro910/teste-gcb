jest.setTimeout(20000);

import { Validation } from '../../doctor.validation';

describe('Unit Test form validation function', () => {
  it('should return a message Preencha todos os campos', async () => {
    const validation = await Validation({
      name: '',
      crm: '1234567',
      specialties: ['Cardiologia', 'Pediatria'],
      landline: '',
      cellPhone: '1196258012',
      cep: '03580888',
    });

    expect(validation.message).toBe('Preencha todos os campos');
  });

  it('should return a message: O campo CRM só aceita números', async () => {
    const validation = await Validation({
      name: 'João Pedro',
      crm: '123456f',
      specialties: ['Cardiologia', 'Pediatria'],
      landline: '1127275850',
      cellPhone: '1196258012',
      cep: '03580888',
    });

    expect(validation.message).toBe('O campo CRM só aceita números');
  });

  it('should return a message: O mínimo de especialidades são duas', async () => {
    const validation = await Validation({
      name: 'João Pedro',
      crm: '1234560',
      specialties: ['Cardiologia'],
      landline: '1127275850',
      cellPhone: '1196258012',
      cep: '03580888',
    });

    expect(validation.message).toBe('O mínimo de especialidades são duas');
  });

  it('should return a message: O campo de telefone fixo só aceita números', async () => {
    const validation = await Validation({
      name: 'João Pedro',
      crm: '1234560',
      specialties: ['Cardiologia', 'Pediatria'],
      landline: '112727585f',
      cellPhone: '1196258012',
      cep: '03580888',
    });

    expect(validation.message).toBe(
      'O campo de telefone fixo só aceita números',
    );
  });

  it('should return a message: O campo de telefone celular só aceita números', async () => {
    const validation = await Validation({
      name: 'João Pedro',
      crm: '1234560',
      specialties: ['Cardiologia', 'Pediatria'],
      landline: '1127275850',
      cellPhone: '119625801f',
      cep: '03580888',
    });

    expect(validation.message).toBe(
      'O campo de telefone celular só aceita números',
    );
  });

  it('should return a message: O campo de CEP só aceita números', async () => {
    const validation = await Validation({
      name: 'João Pedro',
      crm: '1234560',
      specialties: ['Cardiologia', 'Pediatria'],
      landline: '1127275850',
      cellPhone: '1196258010',
      cep: '0358088f',
    });

    expect(validation.message).toBe('O campo de CEP só aceita números');
  });

  it('should return a message: Um dos campos tem mais caracteres do que o permitido', async () => {
    const validation = await Validation({
      name: 'João Pedro',
      crm: '12345600',
      specialties: ['Cardiologia', 'Pediatria'],
      landline: '1127275850',
      cellPhone: '1196258010',
      cep: '03580880',
    });

    expect(validation.message).toBe(
      'Um dos campos tem mais caracteres do que o permitido',
    );
  });

  it('should return a message: Um dos campos tem mais caracteres do que o permitido', async () => {
    const validation = await Validation({
      name: 'João Pedro',
      crm: '12345600',
      specialties: ['Cardiologia', 'Pediatria'],
      landline: '1127275850',
      cellPhone: '1196258010',
      cep: '03580880',
    });

    expect(validation.message).toBe(
      'Um dos campos tem mais caracteres do que o permitido',
    );
  });

  it('should return a message: Um dos campos tem mais caracteres do que o permitido', async () => {
    const validation = await Validation({
      name: 'João Pedro',
      crm: '1234560',
      specialties: ['Cardiologia', 'Pediatria'],
      landline: '11272758500',
      cellPhone: '1196258010',
      cep: '03580880',
    });

    expect(validation.message).toBe(
      'Um dos campos tem mais caracteres do que o permitido',
    );
  });

  it('should return a message: Um dos campos tem mais caracteres do que o permitido', async () => {
    const validation = await Validation({
      name: 'João Pedro',
      crm: '1234560',
      specialties: ['Cardiologia', 'Pediatria'],
      landline: '1127275850',
      cellPhone: '119625801000',
      cep: '03580880',
    });

    expect(validation.message).toBe(
      'Um dos campos tem mais caracteres do que o permitido',
    );
  });

  it('should return a message: Um dos campos tem mais caracteres do que o permitido', async () => {
    const validation = await Validation({
      name: 'João Pedro',
      crm: '1234560',
      specialties: ['Cardiologia', 'Pediatria'],
      landline: '1127275850',
      cellPhone: '1196258010',
      cep: '035808800',
    });

    expect(validation.message).toBe(
      'Um dos campos tem mais caracteres do que o permitido',
    );
  });
});
