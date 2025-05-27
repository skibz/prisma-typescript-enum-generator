
# prisma-typescript-enum-generator

## Example

Declare the generator in your Prisma schema with an output path.

```
generator enums {
  provider = "prisma-typescript-enum-generator"
  output   = "../../app/constants"
}
```

Run `prisma generate` to create your Prisma client and `enums.ts` file.
