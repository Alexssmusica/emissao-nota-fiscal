import { Builder } from 'xml2js';

export function serializeXml(obj: any, rootTag: string): string {
  const builder = new Builder({
    rootName: rootTag,
    headless: true,
    renderOpts: {
      pretty: false
    },
    cdata: true
  });
  return builder.buildObject(obj);
}
