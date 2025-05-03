import type { StorybookConfig } from '@storybook/experimental-nextjs-vite';
import path from 'path';

const config: StorybookConfig = {
  stories: [
    '../components/ui/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@chromatic-com/storybook',
    '@storybook/experimental-addon-test',
  ],
  framework: {
    name: '@storybook/experimental-nextjs-vite',
    options: {},
  },
  staticDirs: ['../public'],
  viteFinal: async (config) => {
    config.resolve = {
      alias: {
        '@': path.resolve(__dirname, '../'),
        '@components': path.resolve(__dirname, '../components'),
        '@app': path.resolve(__dirname, '../app'),
        '@lib': path.resolve(__dirname, '../lib'),
      },
    };
    return config;
  },
};

export default config;
