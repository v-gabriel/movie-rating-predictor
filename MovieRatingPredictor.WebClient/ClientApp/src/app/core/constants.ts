import { ScaleType } from '@swimlane/ngx-charts';

export const NUM_REG_EXP = /^(0|[1-9]\d*)?$/;

export const MAX_RELEASED_YEAR = 2019;
export const MIN_RELEASED_YEAR = 1930;

export const MAX_GROSS_DOLLAR = 999999999;
export const MIN_GROSS_DOLLAR = 1;

export const MAX_RUNTIME_MIN = 1440; // 24h
export const MIN_RUNTIME_MIN = 1;

export const NGX_CHART_DATA_COLORS = [
  '#232ED1',
  '#40C4FF',
  '#61E294',
  '#D62828',
  '#B47AEA',
  '#78D5D7',
];
export const NGX_COLOR = '#232837';
export const NGX_DATA_COLOR_SCHEME = {
  name: 'primary',
  selectable: false,
  group: ScaleType.Quantile,
  domain: NGX_CHART_DATA_COLORS,
};
export const NGX_SIZE_MEDIUM: [number, number] = [500, 500];
export const NGX_SIZE_SMALL: [number, number] = [350, 350];
export const NGX_SIZE_XSMALL: [number, number] = [150, 150];
export const NGX_SIZE_LARGE: [number, number] = [700, 700];
