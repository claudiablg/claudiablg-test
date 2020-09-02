import { GatsbyNode, GatsbyConfig } from 'gatsby';
import { createGatsbyWebpackConfig } from './webpack.config';
import { createRemoteFileNode } from 'gatsby-source-filesystem';

import crypto from 'crypto';

/**
 * Gatsby Node Configuration
 *
 * @see https://www.gatsbyjs.com/docs/node-apis/
 */

export const onCreateBabelConfig: GatsbyNode['onCreateBabelConfig'] = ({ actions }) => {
  actions.setBabelPlugin({
    name: 'babel-plugin-treat',
    options: {},
  });
};

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  stage,
  rules,
  loaders,
  plugins,
  actions,
}) => {
  const isProduction = stage !== `develop`;
  const isSSR = stage.includes(`html`);
  actions.setWebpackConfig(createGatsbyWebpackConfig({ isProduction, stage, isSSR, loaders, plugins }));
};

// from https://mcro.tech/gatsby-image-sharp/
export const sourceNodes: GatsbyNode['sourceNodes'] = async ({ actions, createNodeId }) => {
  const turnImageObjectIntoGatsbyNode = (image: ImageObject, project: Project) => {
    const content = {
      content: project.title,
      ['image___NODE']: createNodeId(`project-image-{${project.id}}`),
    };
    const nodeId = createNodeId(`image-{${image.id}}`);
    const nodeContent = JSON.stringify(image);
    const nodeContentDigest = crypto.createHash('md5').update(nodeContent).digest('hex');

    const nodeData = {
      ...image,
      ...content,
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: 'Image',
        content: nodeContent,
        contentDigest: nodeContentDigest,
      },
    };
    return nodeData;
  };

  const createImageObjectFromURL = ({ source, fileName }: Image): ImageObject => {
    const lastIndexOfSlash = source.lastIndexOf('/');
    const id = source.slice(lastIndexOfSlash + 1, source.lastIndexOf('.'));
    return { id, image: id, url: source, fileName };
  };

  type Image = {
    id: number;
    fileName: string;
    source: string;
  };

  type ImageObject = {
    id: string;
    image: string;
    fileName: string;
    url: string;
  };

  type Project = {
    id: number;
    title: string;
    images: Image[];
  };

  const { createNode } = actions;
  const projects = [
    {
      id: 1,
      title: 'First Project',
      images: [
        {
          id: 1,
          fileName: 'one',
          source: 'https://media.graphcms.com/rBJ6mgb6QCfOv25Rboww',
        },
        {
          id: 2,
          fileName: 'two',
          source: 'https://media.graphcms.com/rBJ6mgb6QCfOv25Rboww',
        },
      ],
    },
  ];
  // const projects = await service.getProjects();

  projects.forEach((project: Project) => {
    project.images.map((image: Image) => {
      const imgObj = createImageObjectFromURL(image);
      const nodeData = turnImageObjectIntoGatsbyNode(imgObj, project);
      createNode(nodeData);
    });
  });
};

export const onCreateNode: GatsbyNode['onCreateNode'] = async ({
  node,
  actions,
  store,
  cache,
  reporter,
  createNodeId,
}) => {
  if (node.internal.type === 'Image') {
    const { createNode } = actions;

    /* Download the image and create the File node. Using gatsby-plugin-sharp and gatsby-transformer-sharp the node will become an ImageSharp. */

    const fileNode = await createRemoteFileNode({
      url: (node as any).url, // string that points to the URL of the image
      parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
      store, // Gatsby's redux store
      cache, // get Gatsby's cache
      reporter,
      createNode, // helper function in gatsby-node to generate the node
      createNodeId, // helper function in gatsby-node to generate the node id
    });

    if (fileNode) {
      // link the File node to Image node at field image
      (node as any).image___NODE = fileNode.id;
    }
  }
};
