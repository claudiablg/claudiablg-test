import { PartialOrNull } from '../utilities';
import { LinkAPI } from './link.api';

export enum NavComponent {
  navbar = 'navbar',
  sidebar = 'sidebar',
  footer = 'footer',
  menu = 'menu',
  links = 'links',
  link = 'link',
  button = 'button',
}

export type NavigationAPI = PartialOrNull<{
  /**
   * System unique identifier
   */
  id: string;
  /**
   * The name of the navigation, e.g. 'main site footer', or 'mobile sidenav'
   */
  name: string;
  /**
   * User facing label
   */
  label: string;
  /**
   * Controls how the navigation item is rendered
   */
  component: NavComponent;
  /**
   * Links to other pages or external pages
   */
  links: LinkAPI[];
  /**
   * Sub-navigation
   */
  subNavigation?: (NavigationAPI | null | undefined)[] | null;
}>;
