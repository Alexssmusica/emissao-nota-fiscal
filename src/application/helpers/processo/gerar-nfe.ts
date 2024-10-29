import type { NFeNFCe, TNFeInfNFe } from '../../../domain/contracts/repos';
import { getDataAtual } from '../../../domain/use-cases/utils';
import { getDet } from './det';
import { gerarChaveNF } from './gerar-chave-nfe';
import { getCobr } from './getCobr';
import { getDest } from './getDest';
import { getEmit } from './getEmit';
import { getIde } from './getIde';
import { getInfAdic } from './getInfAdic';
import { getPag } from './getPag';
import { getResponsavelTecnico } from './getResponsavelTecnico';
import { getTotal } from './getTotal';
import { getTransp } from './getTransp';

export function gerarNFe({ documento, geral }: NFeNFCe.Input): TNFeInfNFe {
  const dadosChave = gerarChaveNF(documento.emit.CNPJ, {
    cUF: documento.ide.cUF,
    dhEmi: getDataAtual(),
    mod: geral.modelo,
    serie: documento.ide.serie,
    nNF: documento.ide.nNF,
    tpEmis: documento.ide.tpEmis
  });

  const nfe: TNFeInfNFe = {
    $: { versao: '4.00', Id: `NFe${dadosChave.chave}` },
    ide: getIde(geral, documento.ide, dadosChave),
    emit: getEmit(documento.emit),
    dest: getDest(geral.ambiente, documento.dest),
    det: getDet(documento.det_list, geral.ambiente, geral.modelo),
    total: getTotal(documento.total),
    transp: getTransp(documento.transp),
    cobr: getCobr(documento.cobr),
    pag: getPag(documento.pag),
    infAdic: getInfAdic(documento.infAdic),
    infRespTec: getResponsavelTecnico(documento.infRespTec)
  };

  return nfe;
}
