import * as servicos from '../../application/helpers/urls/servicos.json';
import { validaUrlWsdl } from '../../application/helpers/utils';
import type { InfoQRCodeByUF, SoapInfo } from '../../domain/contracts/repos';
import { ServicosSefaz } from '../../domain/contracts/repos';
import { getContentType } from '../../main/webservices/functions';

export abstract class SoapAbstract {
  static getAutorizadorByUF(uf: string): any | undefined {
    return undefined;
  }

  static getAutorizadorContingenciaByUF(uf: string): any | undefined {
    return undefined;
  }

  static getInfoQRCodeByUF({ uf, amb }: InfoQRCodeByUF.Input): InfoQRCodeByUF.Output | undefined {
    return undefined;
  }

  static getSoapInfo({ uf, amb, modelo, servicoSefaz, isContingencia = false }: SoapInfo.Input): SoapInfo.Output {
    if (isContingencia && modelo === '65') {
      throw new Error('Contingência não desenvolvida para NFCE');
    }
    const autorizador = isContingencia ? this.getAutorizadorContingenciaByUF(uf) : this.getAutorizadorByUF(uf);

    const url =
      amb === '1'
        ? validaUrlWsdl(autorizador.servicos[servicoSefaz].url_producao)
        : validaUrlWsdl(autorizador.servicos[servicoSefaz].url_homologacao);
    let soap = {
      url,
      contentType: getContentType(uf),
      method: servicos[servicoSefaz].method,
      action: servicos[servicoSefaz].action
    };
    if (servicoSefaz === ServicosSefaz.autorizacao && modelo === '65') {
      const infoQRCode = this.getInfoQRCodeByUF({ uf, amb });
      if (infoQRCode) {
        soap = {
          ...soap,
          urlQRCode: infoQRCode.urlQRCode,
          urlChave: infoQRCode.urlChave
        } as SoapInfo.Output;
      }
    }
    return soap;
  }
}
