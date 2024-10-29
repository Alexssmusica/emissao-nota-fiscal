import { join } from 'path';
import { validateXML } from 'xsd-schema-validator';

export async function validateEnvNfe(xml: string): Promise<void> {
  const response = await new Promise<Output>((resolve, reject) => {
    validateXML(xml, join(__dirname, 'enviNFe_v4.00.xsd'), function (err, result) {
      if (result !== undefined) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  });
  console.log(response.messages[0]);
  if (!response.valid) {
    throw new Error(response.messages[0]);
  }
}

export async function validateInutNfe(xml: string): Promise<void> {
  const response = await new Promise<Output>((resolve, reject) => {
    validateXML(xml, join(__dirname, 'inutNFe_v4.00.xsd'), function (err, result) {
      if (result !== undefined) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  });
  if (!response.valid) {
    throw new Error(response.messages[0]);
  }
}

export async function validateCancelNfe(xml: string): Promise<void> {
  const response = await new Promise<Output>((resolve, reject) => {
    validateXML(xml, join(__dirname, 'envEventoCancNFe_v1.00.xsd'), function (err, result) {
      if (result !== undefined) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  });
  if (!response.valid) {
    throw new Error(response.messages[0]);
  }
}

export async function validateCartaCorrecaoNfe(xml: string): Promise<void> {
  const response = await new Promise<Output>((resolve, reject) => {
    validateXML(xml, join(__dirname, 'envCCe_v1.00.xsd'), function (err, result) {
      if (result !== undefined) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  });
  if (!response.valid) {
    throw new Error(response.messages[0]);
  }
}

type Output = {
  valid: boolean;
  messages: string[];
  result: string;
};
