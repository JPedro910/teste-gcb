import 'dotenv/config';
import { v4 } from 'uuid';
import axios from 'axios';

export default class Helper {
  static createId() {
    return v4();
  }

  static async getCEPData(cep: string) {
    return axios
      .get(`https://viacep.com.br/ws/${cep}/json/`)
      .then(({ data }) => data)
      .catch(() => 'Aconteceu um erro na requisição');
  }
}
