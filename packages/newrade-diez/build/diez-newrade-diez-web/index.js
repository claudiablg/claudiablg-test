// This file was generated with Diez - https://diez.org
// Do not edit this file directly.

module.exports = {};

if (typeof process === 'undefined' || !process) {
  process = {env: {}};
} else if (!process.env) {
  Object.defineProperty(process, 'env', {
    value: {},
  });
}

const Environment = {
  serverUrl: process.env.DIEZ_SERVER_URL || '/diez',
  isHot: process.env.DIEZ_IS_HOT,
};

const diezHTMLExtensions = [];

class Diez {
  constructor (componentType) {
    if (typeof document !== 'undefined') {
      this.iframe = document.createElement('iframe');
    } else {
      this.iframe = {};
    }

    this.componentType = componentType;
    this.component = new this.componentType();
    this.subscribers = [];
  }

  static applyHTMLExtensions () {
    diezHTMLExtensions.forEach((extension) => {
      if (extension instanceof Function) {
        extension();
      }
    });
  }

  broadcast () {
    for (const subscriber of this.subscribers) {
      subscriber(this.component);
    }
  }

  subscribe (subscriber) {
    this.subscribers.push(subscriber);
  }

  attach (subscriber) {
    subscriber(this.component);
    if (!Environment.isHot) {
      return;
    }
    this.subscribe(subscriber);
    if (this.iframe.contentWindow) {
      return;
    }
    this.iframe.src = `${Environment.serverUrl}/components/${this.component.constructor.name}`;
    this.iframe.width = '0';
    this.iframe.height = '0';
    this.iframe.style.display = 'none';

    if (typeof document !== 'undefined') {
      document.body.appendChild(this.iframe);
      window.addEventListener('message', (event) => {
        if (event.source === this.iframe.contentWindow && event.origin.startsWith(Environment.serverUrl)) {
          this.component = new this.componentType(JSON.parse(event.data));
          this.broadcast();
        }
      });
    }
  }
}

module.exports.Diez = Diez;

/**
 * A component encapsulating color, including alpha transparency.
 * 
 * You can use the provided static constructors [[Color.rgb]], [[Color.rgba]], [[Color.hsl]], [[Color.hsla]], and
 * [[Color.hex]] to conveniently create color primitives using familiar patterns for color specification.
 *
 */
class Color {
  constructor({
    h,
    s,
    l,
    a
  }) {
    /**
     * Provides simple hue-saturation-lightness-alpha color data.
     *
     * 0
     */
    this.h = h;
    /**
     * Provides simple hue-saturation-lightness-alpha color data.
     *
     * 0
     */
    this.s = s;
    /**
     * Provides simple hue-saturation-lightness-alpha color data.
     *
     * 1
     */
    this.l = l;
    /**
     * Provides simple hue-saturation-lightness-alpha color data.
     *
     * 1
     */
    this.a = a;
  }
}


module.exports.Color = Color;

const {colorToCss, colorToLowFidelityCss} = require('@diez/web-sdk-common');

Object.defineProperties(Color.prototype, {
  color: {
    get () {
      return colorToCss(this);
    },
  },
  lowFidelityColor: {
    get () {
      return colorToLowFidelityCss(this);
    },
  },
  colorStyle: {
    get () {
      return {
        color: this.color,
      };
    },
  },
  backgroundColorStyle: {
    get () {
      return {
        backgroundColor: this.color,
      };
    },
  },
  borderColorStyle: {
    get () {
      return {
        borderColor: this.color,
      };
    },
  },
  outlineColorStyle: {
    get () {
      return {
        outlineColor: this.color,
      };
    },
  },
});

/**
 * Representation of all colors used in a ColorTheme
 *
 */
class Colors {
  constructor({
    primary
  }) {
    /**
     * Importing prebuilt diez prefab
     *
     * hsla(0, 0, 1, 1)
     */
    this.primary = new Color(primary);
  }
}


module.exports.Colors = Colors;

/**
 * Representation of a color theme.
 *
 */
class DesignSystemTheme {
  constructor({
    colors
  }) {
    /**
     * - primary: `hsla(0, 0, 1, 1)`
     */
    this.colors = new Colors(colors);
  }
}


module.exports.DesignSystemTheme = DesignSystemTheme;

/**
 * Available themes for a design system.
 *
 */
class DesignSystemThemes {
  constructor({
    light,
    dark
  }) {
    /**
     * - colors: ``
     */
    this.light = new DesignSystemTheme(light);
    /**
     * - colors: ``
     */
    this.dark = new DesignSystemTheme(dark);
  }
}


module.exports.DesignSystemThemes = DesignSystemThemes;

/**
 * Complete representation of a design system.
 *
 */
class DesignSystem {
  constructor({
    themes
  }) {
    /**
     * - light: ``
     * - dark: ``
     */
    this.themes = new DesignSystemThemes(themes);
  }
}


module.exports.DesignSystem = DesignSystem;

class DesignLanguage {
  constructor({
    name = "newrade",
    ds = {themes: {light: {colors: {primary: {h: 0, s: 0, l: 1, a: 1}}}, dark: {colors: {primary: {h: 0.673873873873874, s: 0.9585492227979273, l: 0.6215686274509804, a: 1}}}}}
  } = {}) {
    /**
     * newrade
     */
    this.name = name;
    /**
     * - name: `Design System Name`
     * - themes: ``
     */
    this.ds = new DesignSystem(ds);
  }
}

Object.defineProperty(DesignLanguage, 'name', {value: 'DesignLanguage'});

module.exports.DesignLanguage = DesignLanguage;

