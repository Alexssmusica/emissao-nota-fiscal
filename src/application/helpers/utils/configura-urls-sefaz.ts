import type { Configuracoes, ServicosSefaz, SoapInfo } from '../../../domain/contracts/repos';
import { getUf } from '../../../domain/use-cases/utils/ibge-code-to-uf';
import { SefazNFCe } from '../../../main/webservices/sefazNfce';
import { SefazNFe } from '../../../main/webservices/sefazNfe';

export function configuraUrlsSefaz(cUf: string, configuracoes: Configuracoes, servicoSefaz: ServicosSefaz): SoapInfo.Output {
  const {
    geral: { modelo, ambiente }
  } = configuracoes;
  const uf = getUf(cUf);

  const input = {
    uf,
    amb: ambiente,
    modelo,
    isContingencia: false,
    servicoSefaz
  };

  if (modelo === '65') {
    return SefazNFCe.getSoapInfo(input);
  } else {
    return SefazNFe.getSoapInfo(input);
  }
}
