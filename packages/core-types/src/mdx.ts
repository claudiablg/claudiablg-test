declare module '@mdx-js/react' {
  const value: any;
  const MDXProvider: any;
  export default value;
  export { MDXProvider };
}

declare module '*.mdx' {
  const value: any;
  export default value;
}
