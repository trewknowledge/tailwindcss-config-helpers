import path from 'path';

const wpThemeJson = path.resolve('./theme.json');

const customWPColors = wpThemeJson?.settings?.custom?.colors;
const wpColorPalleteThemeJson = wpThemeJson?.settings?.color?.palette;
const wpFontFamilyThemeJson = wpThemeJson?.settings?.typography?.fontFamilies;
const wpFontSizeThemeJson = wpThemeJson?.settings?.typography?.fontSizes;

/**
 * Colors
 */
const formattedWpColorPalette = wpColorPalleteThemeJson?.reduce((acc, curr) => {
	acc[curr.slug] = curr.color;
	return acc;
}, {});

export const wpColors = {
	inherit: 'inherit',
	current: 'currentColor',
	transparent: 'transparent',
	...customWPColors,
	...formattedWpColorPalette,
};

/**
 * Font Family
 */
export const wpFontFamily = wpFontFamilyThemeJson?.reduce((acc, curr) => {
	acc[curr.slug] = curr.fontFamily;
	return acc;
}, {});

/**
 * Font Size
 */
export const wpFontSize = wpFontSizeThemeJson?.reduce((acc, curr) => {
	acc[curr.slug] = curr.size;
	return acc;
}, {});
