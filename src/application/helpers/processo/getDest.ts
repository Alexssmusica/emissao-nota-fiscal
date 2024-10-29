import type { TNFeInfNFeDest } from '../../../domain/contracts/repos';

export function getDest(ambiente: '1' | '2', dest?: TNFeInfNFeDest): TNFeInfNFeDest | undefined {
  if (dest === undefined || dest === null) {
    return undefined;
  }
  return {
    CNPJ: dest.CNPJ,
    CPF: dest.CPF,
    idEstrangeiro: dest.idEstrangeiro,
    xNome: ambiente === '2' ? 'NF-E EMITIDA EM AMBIENTE DE HOMOLOGACAO - SEM VALOR FISCAL' : dest.xNome,
    enderDest: dest.enderDest
      ? {
          xLgr: dest.enderDest.xLgr ?? '',
          nro: dest.enderDest.nro ?? '',
          xCpl: dest.enderDest.xCpl,
          xBairro: dest.enderDest.xBairro ?? '',
          cMun: dest.enderDest.cMun ?? '',
          xMun: dest.enderDest.xMun ?? '',
          UF: dest.enderDest.UF,
          CEP: dest.enderDest.CEP ?? '',
          cPais: dest.enderDest.cPais ?? '1058',
          cPaisSpecified: dest.enderDest.cPaisSpecified,
          xPais: dest.enderDest.xPais ?? 'BRASIL',
          xPaisSpecified: dest.enderDest.xPaisSpecified,
          fone: dest.enderDest.fone
        }
      : undefined,
    indIEDest: dest.indIEDest ?? '9',
    IE: dest.IE,
    ISUF: dest.ISUF,
    IM: dest.IM,
    email: dest.email
  };
}
