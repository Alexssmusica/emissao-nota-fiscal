import type { TNFeInfNFeDet, TNFeInfNFeDetProdComb } from '../../../domain/contracts/repos';

export function getDet(produtos: TNFeInfNFeDet[], ambiente: string, modelo: string): TNFeInfNFeDet[] {
  const det_list: TNFeInfNFeDet[] = [];

  for (let i = 0; i < produtos.length; i++) {
    let xProd = produtos[i].prod.xProd;

    if (ambiente === '2' && i === 0) {
      xProd = 'NOTA FISCAL EMITIDA EM AMBIENTE DE HOMOLOGACAO - SEM VALOR FISCAL';
    }

    det_list.push({
      $: { nItem: produtos[i].$.nItem },
      prod: {
        cProd: produtos[i].prod.cProd,
        cEAN: produtos[i].prod.cEAN,
        xProd,
        NCM: produtos[i].prod.NCM,
        nVE: produtos[i].prod.nVE,
        CEST: produtos[i].prod.CEST,
        indEscala: produtos[i].prod.indEscala,
        indEscalaSpecified: produtos[i].prod.indEscalaSpecified,
        cNPJFab: produtos[i].prod.cNPJFab,
        cBenef: produtos[i].prod.cBenef,
        eXTIPI: produtos[i].prod.eXTIPI,
        CFOP: produtos[i].prod.CFOP,
        uCom: produtos[i].prod.uCom,
        qCom: produtos[i].prod.qCom,
        vUnCom: produtos[i].prod.vUnCom,
        vProd: produtos[i].prod.vProd,
        cEANTrib: produtos[i].prod.cEANTrib,
        uTrib: produtos[i].prod.uTrib,
        qTrib: produtos[i].prod.qTrib,
        vUnTrib: produtos[i].prod.vUnTrib,
        vFrete: produtos[i].prod.vFrete,
        vSeg: produtos[i].prod.vSeg,
        vDesc: produtos[i].prod.vDesc,
        vOutro: produtos[i].prod.vOutro,
        indTot: produtos[i].prod.indTot,
        di: produtos[i].prod.di,
        det: produtos[i].prod.det,
        xPed: produtos[i].prod.xPed,
        nItemPed: produtos[i].prod.nItemPed,
        nFCI: produtos[i].prod.nFCI,
        rastro: produtos[i].prod.rastro,
        comb: getComb(produtos[i].prod.comb)
      },
      imposto: produtos[i].imposto,
      infAdProd: produtos[i].infAdProd,
      impostoDevol: undefined
    });
  }
  return det_list;
}

function getComb(comb?: any) {
  if (!comb) {
    return undefined;
  }
  return {
    cProdANP: comb.cProdANP,
    descANP: comb.descANP,
    pGLP_Opc: comb.pGLP_Opc,
    pGNn_Opc: comb.pGNn_Opc,
    pGNi_Opc: comb.pGNi_Opc,
    vPart_Opc: comb.vPart_Opc,
    CODIF_Opc: comb.CODIF_Opc,
    qTemp_Opc: comb.qTemp_Opc,
    UFCons: comb.UFCons,
    qBCprod_Opc: comb.qBCprod_Opc,
    vAliqProd_Opc: comb.vAliqProd_Opc,
    vCIDE_Opc: comb.vCIDE_Opc,
    encerrante_Opc: comb.encerrante_Opc,
    encerrante: getEncerrante(comb.encerrante)
  } as TNFeInfNFeDetProdComb;
}

function getEncerrante(encerrante?: any) {
  if (!encerrante) {
    return undefined;
  }
  return {
    nBico: encerrante.nBico,
    nBomba: encerrante.nBomba,
    nTanque: encerrante.nTanque,
    vEncIni: encerrante.vEncIni,
    vEncFin: encerrante.vEncFin
  };
}
