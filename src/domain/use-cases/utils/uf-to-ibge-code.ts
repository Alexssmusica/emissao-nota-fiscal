import type { TCodUfIbge } from '../../../domain/contracts/repos';

export function getcUf(value: string): TCodUfIbge {
  switch (value) {
    case 'RO':
      return '11';
    case 'AC':
      return '12';
    case 'AM':
      return '13';
    case 'RR':
      return '14';
    case 'PA':
      return '15';
    case 'AP':
      return '16';
    case 'TO':
      return '17';
    case 'MA':
      return '21';
    case 'PI':
      return '22';
    case 'CE':
      return '23';
    case 'RN':
      return '24';
    case 'PB':
      return '25';
    case 'PE':
      return '26';
    case 'AL':
      return '27';
    case 'SE':
      return '28';
    case 'BA':
      return '29';
    case 'MG':
      return '31';
    case 'ES':
      return '32';
    case 'RJ':
      return '33';
    case 'SP':
      return '35';
    case 'PR':
      return '41';
    case 'SC':
      return '42';
    case 'RS':
      return '43';
    case 'MS':
      return '50';
    case 'MT':
      return '51';
    case 'GO':
      return '52';
    case 'DF':
      return '53';
    default:
      throw new Error('UF inválido');
  }
}
