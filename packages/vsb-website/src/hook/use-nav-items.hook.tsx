import { title, kebab } from 'case';
import { graphql, useStaticQuery } from 'gatsby';
import { NavItem } from '@newrade/core-gatsby-ui/src';
import { LayoutAllSitePageQuery } from '../../types/graphql-types';

const query = graphql`
  query LayoutAllSitePage {
    pages: allSitePage(filter: { path: { glob: "!/{docs,design-system}/{**,*}" } }) {
      totalCount
      nodes {
        id
        path
        context {
          siteMetadata {
            description
            languages {
              defaultLangKey
              langs
            }
            siteEnv
            siteUrl
            title
          }
          id
          name
          dirName
          locale
          layout
        }
      }
    }
    companyAddress: contentfulCompanyAddress {
      addressLine1
      addressLine2
      city
      provinceState
      postalCode
      websiteURL
      phone
      email
      fax
    }
    companyInfo: contentfulCompanyInfo {
      copyright
    }
  }
`;

export function useQuery() {
  return useStaticQuery<LayoutAllSitePageQuery>(query);
}

export function useNavItems(): NavItem[] {
  const data = useQuery();
  const dirSortOrder = ['Services', 'La Clinique', 'Nous Joindre'];
  const pageSortOrder = ['Tout sur', 'Formulaire', 'Examen'];

  const navItems: NavItem[] = data?.pages.nodes
    .filter((node) => !/404/gi.test(node.context?.name || ''))
    .filter((node) => node.context?.name !== 'Accueil')
    .map((node: any) => ({
      name: formatName(node.context?.name),
      dirName: node.context?.dirName,
      path: node.path,
    }));
  const sortedNavItems = navItems.sort((itemA, itemB) => {
    const indexA = dirSortOrder.indexOf(kebab(itemA.dirName));
    const indexB = dirSortOrder.indexOf(kebab(itemB.dirName));

    return indexA > indexB ? 1 : -1;
  });

  function formatName(name?: string | null): string {
    if (!name) {
      return '';
    }
    return name?.replace('.page', '').replace('design-system-', '');
  }

  return sortedNavItems;
}

export function useVsbCompanyInfo() {
  const data = useQuery();
  return { companyInfo: data.companyInfo, companyAddress: data.companyAddress };
}
