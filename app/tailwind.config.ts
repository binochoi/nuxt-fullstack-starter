/* eslint-disable @typescript-eslint/no-require-imports */

import { type Config } from 'tailwindcss';
import { generateColorPalette } from './src/utils/generateColorPalette';
import tailwindcssAnimate from 'tailwindcss-animate';
import tailwindcssContainerQueries from '@tailwindcss/container-queries';
import tailwindcssTypography from '@tailwindcss/typography';

export default {
    content: [
        './src/**/*.{vue,ts}',
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
        tailwindcssAnimate,
        tailwindcssContainerQueries,
        tailwindcssTypography,
    ],
} satisfies Config;
