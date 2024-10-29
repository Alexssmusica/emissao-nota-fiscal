import forge from 'node-forge';
import type { CertificateLoad } from '../../domain/contracts/repos';
import { CertificatePasswordError } from '../../domain/errors';

type Setup = () => LoadCertificate;
type Input = CertificateLoad.Input;
type Output = CertificateLoad.Output;

export type LoadCertificate = (input: Input) => Output;

export const setupLoadCertificate: Setup = () => (input) => {
  const asn = forge.asn1.fromDer(forge.util.decode64(input.buffer));
  let p12: any;
  try {
    p12 = forge.pkcs12.pkcs12FromAsn1(asn, true, input.password);
  } catch (err) {
    throw new CertificatePasswordError();
  }
  const pem = getPem(p12);
  const data = getData(pem);
  return {
    pem,
    key: getKey(p12),
    data
  };
};

function getKey(p12: any): string {
  const keyData = p12
    .getBags({ bagType: forge.pki.oids.pkcs8ShroudedKeyBag })
    [forge.pki.oids.pkcs8ShroudedKeyBag].concat(p12.getBags({ bagType: forge.pki.oids.keyBag })[forge.pki.oids.keyBag]);
  const rsaPrivateKey = forge.pki.privateKeyToAsn1(keyData[0].key);
  const privateKeyInfo = forge.pki.wrapRsaPrivateKey(rsaPrivateKey);
  return forge.pki.privateKeyInfoToPem(privateKeyInfo);
}

function getPem(p12: any): string {
  const certBags = p12.getBags({ bagType: forge.pki.oids.certBag })[forge.pki.oids.certBag];
  return forge.pki.certificateToPem(certBags[0].cert);
}

function getData(pem: string): { validade: Date; nome: string; cnpj: string } {
  const pki = forge.pki;
  const certificate = pki.certificateFromPem(pem);
  const values = certificate.subject.getField({ name: 'commonName' }).value.toString().split(':');
  return {
    validade: certificate.validity.notAfter,
    nome: values[0],
    cnpj: values[1]
  };
}
