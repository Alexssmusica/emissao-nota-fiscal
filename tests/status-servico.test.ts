import fs from 'fs';
import { inspect } from 'util';
import { carregaCertificadoPath, statusServico } from '../src';
import { Configuracoes } from '../src/domain/contracts/repos';
import { env } from '../src/main/config/env';

const keypem = carregaCertificadoPath({
  path: env.CERTIFICATE_PATH,
  password: env.CERTIFICATE_PASSWORD
});

const cert = {
  pfx: fs.readFileSync(env.CERTIFICATE_PATH),
  pem: keypem.pem,
  key: keypem.key,
  password: env.CERTIFICATE_PASSWORD
};

const configuracoes = {
  empresa: {
    pem: cert.pem,
    key: cert.key,
    password: env.CERTIFICATE_PASSWORD
  },
  geral: {
    versao: '4.00',
    ambiente: '2',
    modelo: '55'
  }
} as Configuracoes;

async function init() {
  const result = await statusServico(configuracoes, '41');
  const response = inspect(result, false, null);
  console.log('Status: \n\n' + response);
}

init();
