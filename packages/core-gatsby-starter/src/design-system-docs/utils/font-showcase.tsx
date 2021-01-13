import { HEADING } from '@newrade/core-design-system';
import React from 'react';
import { useStyles } from 'react-treat';
import * as styleRefs from './font-showcase.treat';
import { title } from 'case';
import { useTreatTheme, Stack, Heading, Cluster } from '@newrade/core-react-ui';

type Props = {};

const sampleText = `
ABCČĆDĐEFGHIJKLMNOPQRSŠTUVWXYZŽabcčćdđefghijklmnopqrsštuvwxyzžАБВГҐДЂЕЁЄЖЗЅИІЇЙЈКЛЉМНЊОПРСТЋУЎФХЦЧЏШЩЪЫЬЭЮЯабвгґдђеёєжзѕиіїйјклљмнњопрстћуўфхцчџшщъыьэюяΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψωάΆέΈέΉίϊΐΊόΌύΰϋΎΫΏĂÂÊÔƠƯăâêôơư1234567890‘?’“!”(%)[#]{@}/&\<-+÷×=>®©$€£¥¢:;,.*12345678910 $ 1 000 000 123,94$`;

export const FontShowcase: React.FC<Props> = (props) => {
  const { cssTheme } = useTreatTheme();
  const { styles } = useStyles(styleRefs);

  return (
    <Stack className={styles.wrapper} gap={[cssTheme.sizing.var.x5]}>
      <Stack gap={[cssTheme.sizing.var.x3]}>
        <Heading variant={HEADING.h4}>
          {'Sans'} - {title(cssTheme.typography.fonts.sans[0].name)}
        </Heading>

        <Cluster justifyContent={['flex-start']} gap={[cssTheme.sizing.var.x2]}>
          <div className={`${styles.letters} ${styles.lettersSans}`}>Aa</div>
          <div className={`${styles.letters} ${styles.lettersMedium} ${styles.lettersSans}`}>Aa</div>
          <div className={`${styles.letters} ${styles.lettersBold} ${styles.lettersSans}`}>Aa</div>
        </Cluster>

        <p className={`${styles.paragraphSans}`}>{sampleText}</p>
      </Stack>

      <Stack className={styles.wrapper} gap={[cssTheme.sizing.var.x3]}>
        <Heading variant={HEADING.h4}>
          {'Sans Alternate'} - {title(cssTheme.typography.fonts.sansAlternate[0].name)}
        </Heading>

        <Cluster justifyContent={['flex-start']} gap={[cssTheme.sizing.var.x2]}>
          <div className={`${styles.letters} ${styles.lettersSansAlternate}`}>Aa</div>
          <div className={`${styles.letters} ${styles.lettersMedium} ${styles.lettersSansAlternate}`}>Aa</div>
          <div className={`${styles.letters} ${styles.lettersBold} ${styles.lettersSansAlternate}`}>Aa</div>
        </Cluster>

        <p className={`${styles.paragraphSansAlternate}`}>{sampleText}</p>
      </Stack>

      <Stack className={styles.wrapper} gap={[cssTheme.sizing.var.x3]}>
        <Heading variant={HEADING.h4}>
          {'Serif'} - {title(cssTheme.typography.fonts.serif[0].name)}
        </Heading>

        <Cluster justifyContent={['flex-start']} gap={[cssTheme.sizing.var.x2]}>
          <div className={`${styles.letters} ${styles.lettersSansSerif}`}>Aa</div>
          <div className={`${styles.letters} ${styles.lettersMedium} ${styles.lettersSansSerif}`}>Aa</div>
          <div className={`${styles.letters} ${styles.lettersBold} ${styles.lettersSansSerif}`}>Aa</div>
        </Cluster>

        <p className={`${styles.paragraphSerif}`}>{sampleText}</p>
      </Stack>

      <Stack className={styles.wrapper} gap={[cssTheme.sizing.var.x3]}>
        <Heading variant={HEADING.h4}>
          {'Mono'} - {title(cssTheme.typography.fonts.monospace[0].name)}
        </Heading>

        <Cluster justifyContent={['flex-start']} gap={[cssTheme.sizing.var.x2]}>
          <div className={`${styles.letters} ${styles.lettersSansMono}`}>Aa</div>
          <div className={`${styles.letters} ${styles.lettersMedium} ${styles.lettersSansMono}`}>Aa</div>
          <div className={`${styles.letters} ${styles.lettersBold} ${styles.lettersSansMono}`}>Aa</div>
        </Cluster>

        <p className={`${styles.paragraphMono}`}>{sampleText}</p>
      </Stack>
    </Stack>
  );
};
