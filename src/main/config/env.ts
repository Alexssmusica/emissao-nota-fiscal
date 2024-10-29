import 'dotenv/config';

export const env = {
  CERTIFICATE_PATH: process.env.CERTIFICATE_PATH ?? 'certificado/certificado.pfx',
  CERTIFICATE_PASSWORD: process.env.CERTIFICATE_PASSWORD ?? 'any_password',
  DADOS_ID_CSC: process.env.DADOS_ID_CSC ?? 'ANY_ID',
  DADOS_CSC: process.env.DADOS_CSC ?? 'ANY_CSC'
};
