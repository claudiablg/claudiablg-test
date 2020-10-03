import { Buttons } from './components/molecules/buttons';
import { ColorIntents } from './foundations/color-intents';
import { Colors } from './foundations/colors';
import { BoxShadow, Effects } from './foundations/effects';
import { Iconography } from './foundations/iconography';
import { Layout } from './foundations/layout';
import { Sizing } from './foundations/sizing';
import { Typography } from './foundations/typography';
import { Color } from './primitives/color';

// export type DesignSystemTypes = {
//   themes: any;
//   color: any;
//   shadow: any;
//   sizing: any;
// };

export interface DesignSystemTypes {
  themes: 'light' | 'dark';
  color: Color | string;
  shadow: BoxShadow | string;
  sizing: Sizing | number;
}

export interface DesignSystem<Types extends DesignSystemTypes = DesignSystemTypes> {
  /**
   * Name of the project or brand's name.
   */
  name: string;
  /**
   * Theme variation's name.
   * @default 'light'
   */
  themes: Types['themes'];
  /**
   * Every color defined in the system.
   */
  colors: Colors<Types['color']>;
  /**
   * Contextual use of certain colors (text, action, state, etc).
   */
  colorIntents: ColorIntents<Types['color']>;
  /**
   * Shadows, elevation, blurs and other visual effects.
   */
  effects: Effects<Types['shadow']>;
  /**
   * Defines the system's sizing values.
   */
  sizing: Sizing<Types['sizing']>;
  /**
   * TODO
   */
  iconography: Iconography;
  /**
   * Defines every text styles.
   */
  typography: Typography;
  /**
   * TODO
   */
  animations?: {
    defaultDelay: number;
  };
  /**
   * Breakpoints, common content margins for different viewports.
   */
  layout: Layout;
  /**
   * Components' specific settings.
   */
  components: {
    buttons: Buttons;
    // inputs: any;
    // // TOOD
    // links: {
    //   small: {
    //     color: Color;
    //     visited: Color;
    //     hover: Color;
    //     active: Color;
    //   };
    //   medium: {
    //     color: Color;
    //     visited: Color;
    //     hover: Color;
    //     active: Color;
    //   };
    // };
  };
}
