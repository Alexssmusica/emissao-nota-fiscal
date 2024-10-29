import { appendQRCodeXML } from '../../../application/helpers/processo/append-qrcode-xml';
import { gerarRetornoEmissao } from '../../../application/helpers/processo/gerar-retorno-emissao';
import { gerarXml } from '../../../application/helpers/processo/gerar-xml';
import { gerarXmlLote } from '../../../application/helpers/processo/gerar-xml-lote';
import { configuraUrlsSefaz } from '../../../application/helpers/utils';
import { makeSoapRequest } from '../../../application/helpers/web-service';
import { validateEnvNfe } from '../../../application/helpers/xsd';
import type { Configuracoes, NFeBase } from '../../../domain/contracts/repos';
import { ServicosSefaz } from '../../../domain/contracts/repos';
import type { RetornoNF } from '../../../domain/contracts/repos/retorno';
import { signXmlX509 } from '../signature';
import { consultaRecibo } from './consulta-recibo';

type Emissao = {
  documento: NFeBase;
  configuracoes: Configuracoes;
};

export async function emitir({ documento, configuracoes }: Emissao): Promise<RetornoNF> {
  const response = await request({ documento, configuracoes });
  return await builderResponse(configuracoes, documento.emit.enderEmit.UF, response);
}

async function request({ documento, configuracoes }: Emissao) {
  const soap = configuraUrlsSefaz(documento.ide.cUF, configuracoes, ServicosSefaz.autorizacao);
  const doc = gerarXml(documento, configuracoes.geral);
  let xmlAssinado = signXmlX509(doc.xml, 'infNFe', configuracoes.empresa);
  if (configuracoes.geral.modelo === '65') {
    const appendQRCode = await appendQRCodeXML(documento, xmlAssinado, configuracoes.empresa, soap, configuracoes.geral);
    xmlAssinado = appendQRCode.xml;
  }
  const xml = gerarXmlLote(xmlAssinado, false);
  await validateEnvNfe(xml);
  const { webProxy, empresa } = configuracoes;
  const cUf = documento.ide.cUF;
  return await makeSoapRequest({
    xml,
    empresa,
    soap,
    webProxy,
    cUf
  });
}

async function builderResponse(configuracoes: Configuracoes, uf: string, response: any) {
  if (response.data.retEnviNFe !== undefined) {
    if (response.data.retEnviNFe.cStat === '103' && response.data.retEnviNFe.infRec.nRec !== undefined) {
      return await consultaRecibo(response, uf, configuracoes);
    }
  }
  return await gerarRetornoEmissao({
    protNFe: Object(response.data.retEnviNFe.protNFe),
    success: response.data.retEnviNFe.cStat === '104' && response.data.retEnviNFe.protNFe?.infProt.cStat === '100',
    xml_enviado: response.xml_enviado,
    xml_recebido: response.xml_recebido,
    xMotivo: response.data.retEnviNFe.protNFe?.infProt.xMotivo ?? response.data.retEnviNFe.xMotivo
  });
}
