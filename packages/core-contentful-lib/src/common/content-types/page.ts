import { pascal } from 'case';
import * as Migration from 'contentful-migration';
import { CONTENTFUL_WIDGET } from '../../../types/contentful-widget-ids';
import { COMMON_CONTENT_TYPE } from '../common-content-types';
import { COMMON_FIELD } from '../common-fields';

export const createPage: Migration.MigrationFunction = function (migration) {
  const content = migration.createContentType(COMMON_CONTENT_TYPE.PAGE, {
    name: COMMON_CONTENT_TYPE.PAGE,
    description: 'Model to hold informations for pages',
  });

  /**
   * Unique page name
   */
  content.createField(COMMON_FIELD.NAME, {
    name: pascal(COMMON_FIELD.NAME),
    type: 'Symbol',
    validations: [
      {
        unique: true,
      },
    ],
  });

  /**
   * Page title used to set the page title (SEO)
   */
  content.createField(COMMON_FIELD.TITLE, {
    name: pascal(COMMON_FIELD.TITLE),
    type: 'Symbol',
    localized: true,
  });

  /**
   * Page slug / route
   */
  content.createField(COMMON_FIELD.SLUG, {
    name: pascal(COMMON_FIELD.SLUG),
    type: 'Symbol',
    localized: true,
    validations: [
      {
        regexp: {
          pattern: `^(\/[a-z,0-9,-]+)*\/`,
          flags: `g`,
        },
      },
      {
        unique: true,
      },
    ],
  });
  content.changeFieldControl(COMMON_FIELD.SLUG, 'builtin', CONTENTFUL_WIDGET.SLUG_EDITOR, {
    helpText: 'The page route after the domain, e.g. /route/',
  });

  /**
   * Type of the page
   */
  content.createField(COMMON_FIELD.TYPE, {
    name: pascal(COMMON_FIELD.TYPE),
    type: 'Array',
    validations: [{ size: { max: 1 } }],
    items: {
      type: 'Symbol',
      validations: [
        {
          in: [PAGE_TYPE.HOME, PAGE_TYPE.CONTENT, PAGE_TYPE.CONTACT, PAGE_TYPE.BLOG],
        },
      ],
    },
  });
  content.changeFieldControl(COMMON_FIELD.TYPE, 'builtin', CONTENTFUL_WIDGET.LIST, {
    helpText: 'Provide Text',
  });

  /**
   * Description of the page for SEO
   */
  content.createField(COMMON_FIELD.DESCRIPTION, {
    name: pascal(COMMON_FIELD.DESCRIPTION),
    type: 'Text',
    localized: true,
  });
  content.changeFieldControl(COMMON_FIELD.DESCRIPTION, 'builtin', CONTENTFUL_WIDGET.MULTI_LINE, {
    helpText: 'Enter the page description, it will be used for SEO purposes',
  });

  /**
   * Page sections'
   */
  content.createField(COMMON_FIELD.SECTIONS, {
    name: pascal(COMMON_FIELD.SECTIONS),
    type: 'Array',
    items: { type: 'Link', linkType: 'Entry', validations: [{ linkContentType: [COMMON_CONTENT_TYPE.SECTION] }] },
  });
};
