import { defineMarkdocConfig } from '@astrojs/markdoc/config';
import starlightMarkdoc from '@astrojs/starlight-markdoc';

// https://docs.astro.build/en/guides/integrations-guide/markdoc/
export default defineMarkdocConfig({
	extends: [starlightMarkdoc()],
	// Markdoc requires HTML elements to be explicitly defined as tags in the configuration
	tags: {
		iframe: {
			render: 'iframe',
			attributes: {
				src: { type: String, required: true },
				width: { type: String },
				height: { type: String },
				loading: { type: String },
				title: { type: String },
				style: { type: String },
			},
			selfClosing: true,
		},
		abbr: {
			render: 'abbr',
			attributes: {
				title: { type: String, required: true },
			},
			selfClosing: false,
		},
	},
});