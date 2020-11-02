import { graphql } from 'gatsby';

export const siteMetadataQuery = graphql`
  fragment SiteMetadata on Site {
    siteMetadata {
      title
      siteUrl
      languages {
        defaultLangKey
        langs
      }
    }
  }
`;
