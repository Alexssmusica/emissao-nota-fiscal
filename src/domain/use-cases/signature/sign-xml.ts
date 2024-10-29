import { SignedXml } from 'xml-crypto';

export function signXml(xml: string, tag: string, certificado: { key: Buffer | string }): string {
  const sig = new SignedXml();
  sig.addReference(`//*[local-name(.)='${tag}']`, [], '', '', '', '', true);
  sig.signingKey = certificado.key;
  sig.computeSignature(xml);
  return sig.getSignedXml();
}
