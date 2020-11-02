import { graphql } from 'gatsby';

export const companyInfoQuery = graphql`
  fragment CompanyInfoFragment on ContentfulCompanyInfo {
    companyName
    logo {
      file {
        url
      }
    }
    logoFooter {
      file {
        url
      }
    }
    linkedinPageURL
    facebookPageURL
    instagramPageURL
    twitterPageURL
    metadataTwitterSite
    metadataTwitterCreator
    metadataSiteName
  }
`;
