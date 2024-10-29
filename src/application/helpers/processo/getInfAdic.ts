import type { TNFeInfNFeInfAdic } from '../../../domain/contracts/repos';

export function getInfAdic(inf: TNFeInfNFeInfAdic): TNFeInfNFeInfAdic {
  const listObsCont = inf.obsCont.map((element) => ({
    xTexto: element.xTexto,
    xCampo: element.xCampo
  }));
  const listObsFisco = inf.obsFisco.map((element) => ({
    xTexto: element.xTexto,
    xCampo: element.xCampo
  }));
  const listProcRef = inf.procRef.map((element) => ({
    nProc: element.nProc,
    indProc: element.indProc
  }));
  return {
    infAdFisco: inf.infAdFisco,
    infCpl: inf.infCpl,
    obsCont: listObsCont,
    obsFisco: listObsFisco,
    procRef: listProcRef
  };
}
