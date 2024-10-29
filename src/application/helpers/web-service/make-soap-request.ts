import https from 'https';
import fetch from 'node-fetch';
import type { SoapRequest } from '../../../domain/contracts/repos';
import { deserializeXml } from '../xml';
import { buildSoapEnvelope } from './build-soap-envelope';

export async function makeSoapRequest({ empresa, soap, xml, webProxy, cUf }: SoapRequest.Input): Promise<SoapRequest.Output> {
  const body = buildSoapEnvelope(xml, soap.method);

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': soap.contentType,
      SOAPAction: soap.action
    },
    agent: new https.Agent({
      rejectUnauthorized: false,
      cert: empresa.pem,
      key: empresa.key,
      passphrase: empresa.password
    }),
    body
  };

  const res = await fetch(soap.url, options);
  const xmlRecebido = await res.text();
  const retorno = await deserializeXml(xmlRecebido, { explicitArray: false });
  const objectEnvelope = Object.values(retorno)[0] as Record<string, any>;
  const objectBody = Object.values(objectEnvelope)[1] !== '' ? Object.values(objectEnvelope)[1] : Object.values(objectEnvelope)[2];
  const nfeResultMsg =
    cUf === '41' ? Object.values(objectBody as Record<string, any>)[1] : Object.values(objectBody as Record<string, any>)[0];
  return {
    xml_enviado: xml,
    xml_recebido: xmlRecebido,
    data: nfeResultMsg
  };
}
