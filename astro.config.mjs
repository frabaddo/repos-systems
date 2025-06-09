// @ts-check
import { defineConfig } from 'astro/config';

import angular from '@analogjs/astro-angular';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  integrations: [angular()]
});