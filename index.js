const fs = require('fs');
import path from 'path';

const wpThemeJsonPath = path.resolve('./theme.json');
let exportObj = {};

try{
	// Synchronously read the file
  const data = fs.readFileSync(wpThemeJsonPath, 'utf8');

	// Parse the JSON data
  const wpThemeJson = JSON.parse(data);

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

	exportObj.wpColors = {
		inherit: 'inherit',
		current: 'currentColor',
		transparent: 'transparent',
		...customWPColors,
		...formattedWpColorPalette,
	};

	/**
	 * Font Family
	 */
	exportObj.wpFontFamily = wpFontFamilyThemeJson?.reduce((acc, curr) => {
		acc[curr.slug] = curr.fontFamily;
		return acc;
	}, {});

	/**
	 * Font Size
	 */
	exportObj.wpFontSize = wpFontSizeThemeJson?.reduce((acc, curr) => {
		acc[curr.slug] = curr.size;
		return acc;
	}, {});
} catch (err) {
	console.error(`Error reading or parsing ${wpThemeJsonPath}: ${err}`);
}

module.exports = exportObj;