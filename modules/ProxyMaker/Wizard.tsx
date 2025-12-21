'use client';

import {
  Box,
  FormControl,
  InputLabel,
  Select,
  TextField,
  textFieldClasses,
  type SxProps,
  type TextFieldProps,
} from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useRef } from 'react';

import { ScryField } from '~/modules/ProxyMaker/ScryField';

const FIELDS = [
  'ARTWORK',
  'FLAVOR',
  'FRAME',
  'MANA',
  'NAME',
  'SUBTYPES',
  'TEXT',
  'TYPES',
] as const;

const FIELD_STYLES = {
  FULL: { flexBasis: '100%' },
  SMALL: { flexBasis: 0, flexGrow: 1, minWidth: 160 },
  WIDE: { flexBasis: 0, flexGrow: 1, minWidth: 300 },
} as const satisfies Record<string, SxProps>;

type Props = {
  frames: Record<string, Record<string, { label: string; path: string }>>;
};

export const Wizard = ({ frames }: Props) => {
  const router = useRouter();
  const parameters = useSearchParams();
  const initial = useRef(parameters);

  const onSave = useCallback(
    (name: string, value: string | undefined) => {
      const query = new URLSearchParams(parameters.toString());
      if (value) query.set(name, value);
      else query.delete(name);
      query.sort();
      router.replace(`?${query.toString()}`);
    },
    [parameters, router],
  );

  const makeProperties = useCallback(
    (name: Lowercase<(typeof FIELDS)[number]>, label: String) =>
      ({
        defaultValue: initial.current.get(name) || '',
        label,
        name,
        onChange: (event: { target: { name: string; value: string } }) =>
          onSave(event.target.name, event.target.value),
      }) as const satisfies TextFieldProps,
    [onSave],
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        [`.${textFieldClasses.root}`]: { flexGrow: 1 },
      }}
    >
      <FormControl sx={FIELD_STYLES.SMALL}>
        <InputLabel htmlFor="frame">Frame</InputLabel>
        <Select {...makeProperties('frame', 'Frame')} native>
          <option aria-label="None" value="" />
          {Object.entries(frames).map(([kind, colors]) => (
            <optgroup key={kind} label={kind}>
              {Object.entries(colors).map(([color, { label }]) => (
                <option key={color} value={`${kind}.${color}`}>
                  {label}
                </option>
              ))}
            </optgroup>
          ))}
        </Select>
      </FormControl>
      <TextField
        {...makeProperties('mana', 'Mana cost')}
        sx={FIELD_STYLES.SMALL}
      />
      <TextField {...makeProperties('name', 'Name')} sx={FIELD_STYLES.WIDE} />
      <ScryField
        inputProps={makeProperties('artwork', 'Artwork')}
        onSave={onSave}
        sx={FIELD_STYLES.WIDE}
      />
      <TextField
        {...makeProperties('types', 'Types and supertypes')}
        sx={FIELD_STYLES.WIDE}
      />
      <TextField
        {...makeProperties('subtypes', 'Subtypes')}
        sx={FIELD_STYLES.WIDE}
      />
      <TextField
        {...makeProperties('text', 'Text box')}
        maxRows={8}
        minRows={2}
        multiline
        sx={FIELD_STYLES.FULL}
      />
      <TextField
        {...makeProperties('flavor', 'Flavor text')}
        maxRows={8}
        minRows={2}
        multiline
        sx={FIELD_STYLES.FULL}
      />
    </Box>
  );
};
