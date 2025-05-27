#!/usr/bin/env node

import fs from "fs";
import path from "path";

import gh from '@prisma/generator-helper';

gh.generatorHandler({
  onManifest() {
    return {
      defaultOutput: './generated-enums',
      prettyName: 'TypeScript Enum Generator'
    };
  },

  async onGenerate({ dmmf, generator }) {
    const outputPath = generator.output?.value || './generated-enums';
    const enums = dmmf.datamodel.enums;

    const tsEnums = enums.map(e => {
      const members = e.values.map(val => `  ${val.name} = "${val.name}",`).join('\n');

      return `export enum ${e.name} {\n${members}\n}`;
    });

    const content = tsEnums.join('\n\n') + '\n';

    fs.mkdirSync(outputPath, { recursive: true });
    fs.writeFileSync(path.join(outputPath, 'enums.ts'), content);

    console.log(`✅ Enums written to ${path.join(outputPath, 'enums.ts')}`);
  }
});
