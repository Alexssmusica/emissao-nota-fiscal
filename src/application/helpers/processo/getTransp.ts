import type { TNFeInfNFeTransp } from '../../../domain/contracts/repos';

export function getTransp(transp: TNFeInfNFeTransp): TNFeInfNFeTransp {
  return {
    modFrete: transp.modFrete,
    transporta:
      transp.transporta === undefined
        ? undefined
        : {
            CNPJ: transp.transporta.CNPJ,
            CPF: transp.transporta.CPF,
            item: transp.transporta.item,
            itemElementName: transp.transporta.itemElementName,
            xNome: transp.transporta.xNome,
            ie: transp.transporta.ie,
            xEnder: transp.transporta.xEnder,
            xMun: transp.transporta.xMun,
            uf: transp.transporta.uf,
            ufSpecified: transp.transporta.ufSpecified
          },
    retTransp:
      transp.retTransp === undefined
        ? undefined
        : {
            vServ: transp.retTransp.vServ,
            vBCRet: transp.retTransp.vBCRet,
            pICMSRet: transp.retTransp.pICMSRet,
            vICMSRet: transp.retTransp.vICMSRet,
            cFOP: transp.retTransp.cFOP,
            cMunFG: transp.retTransp.cMunFG
          },
    veicTransp:
      transp.veicTransp === undefined
        ? undefined
        : {
            placa: transp.veicTransp.placa,
            UF: transp.veicTransp.UF,
            RNTC: transp.veicTransp.RNTC
          },
    items: transp.items,
    itemsElementName: transp.itemsElementName,
    vol:
      transp.vol === undefined
        ? undefined
        : transp.vol.map((vol) => ({
            qVol: vol.qVol,
            esp: vol.esp,
            marca: vol.marca,
            nVol: vol.nVol,
            pesoL: vol.pesoL,
            pesoB: vol.pesoB,
            lacres: vol.lacres
          }))
  };
}
