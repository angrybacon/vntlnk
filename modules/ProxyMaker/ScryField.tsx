import {
  Autocomplete,
  CircularProgress,
  TextField,
  type SxProps,
  type TextFieldProps,
} from '@mui/material';
import { useEffect, useState, type SyntheticEvent } from 'react';

import { useStateSafe } from '~/hooks/useStateSafe';
import { type Card as CardModel } from '~/modules/Scry/typings';
import { useScry } from '~/modules/Scry/useScry';

type Props = {
  onSave: (name: string, value: string | undefined) => void;
  sx: SxProps;
  inputProps: TextFieldProps & { defaultValue: string; name: string };
};

export const ScryField = ({ onSave, sx, inputProps }: Props) => {
  const [options, setOptions] = useState<CardModel[]>([]);
  const [_query, setQuery, querySafe] = useStateSafe('');
  const { cards, error, isLoading, warnings } = useScry({
    query: querySafe,
    unique: 'art',
  });

  useEffect(() => {
    setOptions(cards);
  }, [cards]);

  const onChange = (_event: SyntheticEvent, value: CardModel | null) =>
    onSave(inputProps.name, value?.name);

  const onClose = () => setOptions([]);

  const onQuery = (_event: SyntheticEvent, value: string) => setQuery(value);

  return (
    <Autocomplete
      filterOptions={(it) => it}
      forcePopupIcon={false}
      getOptionLabel={(it) => it.name}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      loading={isLoading}
      onChange={onChange}
      onClose={onClose}
      onInputChange={onQuery}
      options={options}
      renderInput={(parameters) => (
        <TextField
          {...parameters}
          helperText={inputProps.helperText}
          label={inputProps.label}
          name={inputProps.name}
          size={inputProps.size}
          slotProps={{
            input: {
              ...parameters.InputProps,
              endAdornment: isLoading && <CircularProgress size={24} />,
            },
          }}
        />
      )}
      renderOption={(properties, option, { selected }) => (
        <li {...properties} key={option.id}>
          {option.name}
        </li>
      )}
      sx={sx}
    />
  );
};
