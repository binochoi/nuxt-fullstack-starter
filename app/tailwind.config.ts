/* eslint-disable @typescript-eslint/no-require-imports */

import { type Config } from 'tailwindcss';
import { generateColorPalette } from './src/utils/generateColorPalette';

export default {
    content: [
        './**/*.{vue,ts}',
    ],
    future: {
        hoverOnlyWhenSupported: true,
    },
    theme: {
        extend: {
            colors: {
                primary: generateColorPalette('--color-primary'),
                secondary: generateColorPalette('--color-secondary'),
                tertiary: generateColorPalette('--color-tertiary'),
                quaternary: generateColorPalette('--color-quaternary'),
            },
        },
    },
    plugins: [
        require('tailwindcss-animate'),
        require('@tailwindcss/container-queries'),
        require('@tailwindcss/typography'),
    ],
} satisfies Config;