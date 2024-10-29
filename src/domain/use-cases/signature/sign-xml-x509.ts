import { SignedXml } from 'xml-crypto';
import type { Empresa } from '../../../domain/contracts/repos';

export function signXmlX509(xml: string, tag: string, empresa: Empresa): string {
  const transforms = ['http://www.w3.org/2000/09/xmldsig#enveloped-signature', 'http://www.w3.org/TR/2001/REC-xml-c14n-20010315'];

  const infoProvider = (pem: string) => ({
    getKeyInfo() {
      const cert = this.getCert();
      return `<X509Data><X509Certificate>${cert}</X509Certificate></X509Data>`;
    },
    getCert() {
      const certLines = pem.toString().split('\n');
      return certLines.filter((line, index) => index && line && !line.startsWith('-----')).join('');
    }
  });

  const sig = new SignedXml();
  sig.addReference(`//*[local-name(.)='${tag}']`, transforms, '', '', '', '', false);
  sig.signingKey = empresa.key;
  sig.canonicalizationAlgorithm = 'http://www.w3.org/TR/2001/REC-xml-c14n-20010315';
  sig.keyInfoProvider = infoProvider(empresa.pem) as any;
  sig.computeSignature(xml);

  return sig.getSignedXml();
}
