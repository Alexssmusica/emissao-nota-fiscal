export { gerarPDF } from '@alexssmusica/node-pdf-nfe';
export { cancelar } from './domain/use-cases/processo/cancelar';
export { cartaCorrecao } from './domain/use-cases/processo/carta-correcao';
export { emitir } from './domain/use-cases/processo/emissao';
export { inutilizar } from './domain/use-cases/processo/inutiliza';
export { statusServico } from './domain/use-cases/processo/status';
export * from './domain/use-cases/utils';
import { setupLoadCertificateFromBase64 } from './domain/use-cases/load-certificate-from-base64';
import { setupLoadCertificateFromPath } from './domain/use-cases/load-certificate-from-path';
const carregaCertificadoBase64 = setupLoadCertificateFromBase64();
const carregaCertificadoPath = setupLoadCertificateFromPath();

export { carregaCertificadoBase64, carregaCertificadoPath };
