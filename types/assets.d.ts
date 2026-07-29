/* Parcel turns an imported image into a URL string. The 2024 source tried to say this with
   a bare `declare module "*.png";` inside src/shared/assets/imades/cards/index.ts, but that
   file is a module, so TypeScript read it as an augmentation of a module called "*.png"
   rather than as a wildcard declaration (TS2664) and every image import failed with TS2307. */
declare module '*.png' {
  const url: string;
  export default url;
}
