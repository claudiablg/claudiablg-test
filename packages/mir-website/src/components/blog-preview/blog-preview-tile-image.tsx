import React, { HTMLAttributes } from 'react';
import { useStyles } from 'react-treat';
import * as styleRefs from './blog-preview-tile-image.treat';
import { BlogPreviewTile } from './blog-preview-tile';
// import styles from './blog-preview-tile-image.module.scss';

type OwnProps = {
  imageUrl?: string;
  subtitle: string;
  title: string;
  actionLabel: string;
};

export const BlogPreviewTileImage: React.FC<HTMLAttributes<any> & OwnProps> = (props) => {
  const styles = useStyles(styleRefs);

  return (
    <div className={styles.wrapper}>
      {props.imageUrl ? (
        <img src={props.imageUrl} className={styles.imgPreview} />
      ) : (
        <div className={styles.imgPreview}></div>
      )}

      <BlogPreviewTile {...props} className={styles.tilePreview} />
    </div>
  );
};
