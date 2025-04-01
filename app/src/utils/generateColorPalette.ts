/**
 * @example
 * generateColorPalette('--color-primary')
 * => {
 *  50: '--color-primary-50',
 *  ...
 *  900: '--color-primary-900',
 * }
 */
export const generateColorPalette = (prefix: string) => {
    const satr = (l: number | string) => `hsla(var(${prefix}${l}), <alpha-value>)`;
    const grades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
    return Object.fromEntries([
        ['DEFAULT', satr('-400')],
        ...grades.map((grade) => [grade, satr(`-${grade}`)]),
    ]);
};