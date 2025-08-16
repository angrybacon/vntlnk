'use client';

import {
  Box,
  MenuItem,
  TextField,
  textFieldClasses,
  type SxProps,
} from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  useCallback,
  useRef,
  type ChangeEvent,
  type ComponentPropsWithoutRef,
} from 'react';

const FIELD_STYLES = {
  FULL: { flexBasis: '100%' },
  SMALL: { flexBasis: 0, minWidth: 160 },
  WIDE: { flexBasis: 0, minWidth: 300 },
} as const satisfies Record<string, SxProps>;

export const Wizard = () => {
  const router = useRouter();
  const parameters = useSearchParams();
  const initial = useRef(parameters);

  const onChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      const query = new URLSearchParams(parameters.toString());
      query.set(target.name, target.value);
      query.sort();
      router.replace(`?${query.toString()}`);
    },
    [parameters, router],
  );

  const makeProperties = (
    name: Lowercase<string>,
    label: String,
  ): ComponentPropsWithoutRef<typeof TextField> => ({
    defaultValue: initial.current.get(name),
    label,
    name,
    onChange,
    size: 'small',
  });

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        [`.${textFieldClasses.root}`]: { flexGrow: 1 },
      }}
    >
      <TextField
        {...makeProperties('frame', 'Frame')}
        select
        sx={FIELD_STYLES.SMALL}
      >
        <MenuItem value="adventure">Adventure</MenuItem>
        <MenuItem value="old">Old</MenuItem>
      </TextField>
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
