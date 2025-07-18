#!/usr/bin/env node

import fs from "fs";
import path from "path";

import { generatorHandler } from '@prisma/generator-helper';

generatorHandler({
  onManifest() {
    return {
      defaultOutput: './enums.ts',
      prettyName: 'Prisma TypeScript Enum Generator',
      version: '1.0.1',
    };
  },

  async onGenerate({ dmmf, generator }) {
    if (!generator.output?.value) {
      throw new Error('no output path given');
    }

    const outputPath = generator.output?.value;
    const enums = dmmf.datamodel.enums;

    const tsEnums = enums.map(e => {
      const members = e.values.map(val => `  ${val.name} = '${val.name}',`).join('\n');

      return `export enum ${e.name} {\n${members}\n}`;
    });

    const content = tsEnums.join('\n\n') + '\n';

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, content);

    console.log(`✅ Enums written to ${outputPath}`);
  }
});
