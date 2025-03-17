import { Stack, Typography } from '@material-ui/core';
import * as convert from 'color-convert';
import React from 'react';
import { HelpTooltip } from '~/components/HelpTooltip';
import type { ParamFnDefault, ParamFunction } from '~/domain/types';
import { toParamFunction } from './utils';
import { HslColorPicker } from 'react-colorful';

const HuePickerParam: React.FC<{
  name: string;
  value?: number;
  description?: string;
  onChange: (v: number) => void;
}> = ({ name, value, description, onChange }) => {
  const hslColor = React.useMemo(() => {
    if (value === undefined) {
      return undefined;
    }
    const [h, s, l] = convert.hsl.rgb([value, 100, 50]);
    return { h, s, l };
  }, [value]);
  return (
    <Stack spacing={1}>
      <Stack direction="row" spacing={1}>
        <Typography variant="body2">{name}</Typography>
        <HelpTooltip description={description} />
      </Stack>
      <HslColorPicker color={hslColor} onChange={(col) => onChange(col.h)} />
    </Stack>
  );
};

export function huePickerParam(args: {
  name: string;
  defaultValue: ParamFnDefault<number>;
  description?: string;
}): ParamFunction<number> {
  return {
    name: args.name,
    defaultValue: toParamFunction(args.defaultValue),
    fn: (params) => {
      return (
        <HuePickerParam
          name={args.name}
          value={params.value}
          onChange={params.onChange}
        />
      );
    },
  };
}
