/**
 * @license
 * MIT License
 * Copyright (c) 2026 wimwian-org. All rights reserved.
 */

import type { Meta, StoryObj } from '@storybook/svelte';
import { Button } from '../index.js';

const meta = {
	title: 'Components/Button',
	component: Button,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: { type: 'select' },
			options: ['contained', 'outlined', 'text'],
		},
		color: {
			control: { type: 'select' },
			options: ['primary', 'secondary', 'success', 'error', 'warning', 'info'],
		},
		size: {
			control: { type: 'select' },
			options: ['small', 'medium', 'large'],
		},
		disabled: { control: 'boolean' },
		fullWidth: { control: 'boolean' },
		loading: { control: 'boolean' },
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Contained: Story = {
	args: {
		variant: 'contained',
		children: 'Contained Button',
	},
};

export const Outlined: Story = {
	args: {
		variant: 'outlined',
		children: 'Outlined Button',
	},
};

export const Text: Story = {
	args: {
		variant: 'text',
		children: 'Text Button',
	},
};

export const Loading: Story = {
	args: {
		loading: true,
		children: 'Loading...',
	},
};

export const WithIcons: Story = {
	args: {
		children: 'Icon Button',
	},
};
