export function getUf(value: string): string {
  switch (value) {
    case '11':
      return 'RO';
    case '12':
      return 'AC';
    case '13':
      return 'AM';
    case '14':
      return 'RR';
    case '15':
      return 'PA';
    case '16':
      return 'AP';
    case '17':
      return 'TO';
    case '21':
      return 'MA';
    case '22':
      return 'PI';
    case '23':
      return 'CE';
    case '24':
      return 'RN';
    case '25':
      return 'PB';
    case '26':
      return 'PE';
    case '27':
      return 'AL';
    case '28':
      return 'SE';
    case '29':
      return 'BA';
    case '31':
      return 'MG';
    case '32':
      return 'ES';
    case '33':
      return 'RJ';
    case '35':
      return 'SP';
    case '41':
      return 'PR';
    case '42':
      return 'SC';
    case '43':
      return 'RS';
    case '50':
      return 'MS';
    case '51':
      return 'MT';
    case '52':
      return 'GO';
    case '53':
      return 'DF';
    default:
      throw new Error('cUF inválido');
  }
}
