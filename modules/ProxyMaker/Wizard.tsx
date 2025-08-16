'use client';

import {
  Box,
  FormControl,
  InputLabel,
  Select,
  TextField,
  textFieldClasses,
  type SelectChangeEvent,
  type SxProps,
} from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useRef, type ChangeEvent } from 'react';

const FIELD_STYLES = {
  FULL: { flexBasis: '100%' },
  SMALL: { flexBasis: 0, minWidth: 160 },
  WIDE: { flexBasis: 0, minWidth: 300 },
} as const satisfies Record<string, SxProps>;

type Props = {
  frames: Record<string, Record<string, { label: string; path: string }>>;
};

export const Wizard = ({ frames }: Props) => {
  const router = useRouter();
  const parameters = useSearchParams();
  const initial = useRef(parameters);

  const onChange = useCallback(
    <TKind extends 'text' | 'select'>({
      target,
    }: TKind extends 'text'
      ? ChangeEvent<HTMLInputElement>
      : TKind extends 'select'
        ? SelectChangeEvent
        : never) => {
      const query = new URLSearchParams(parameters.toString());
      query.set(target.name, target.value);
      query.sort();
      router.replace(`?${query.toString()}`);
    },
    [parameters, router],
  );

  const makeProperties = <TKind extends 'select' | 'text' = 'text'>(
    name: Lowercase<string>,
    label: String,
  ) =>
    ({
      defaultValue: initial.current.get(name) || '',
      id: name,
      label,
      name,
      onChange: onChange<TKind>,
    }) as const;

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
        <Select {...makeProperties<'select'>('frame', 'Frame')} native>
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
      <TextField
        {...makeProperties('artwork', 'Artwork')}
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
        minRows={4}
        multiline
        sx={FIELD_STYLES.FULL}
      />
      <TextField
        {...makeProperties('flavor', 'Flavor text')}
        minRows={2}
        multiline
        sx={FIELD_STYLES.FULL}
      />
    </Box>
  );
};
