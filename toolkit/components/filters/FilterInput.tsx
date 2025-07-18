import { Icon, createIcon } from '@chakra-ui/react';
import type { ChangeEvent } from 'react';
import React, { useCallback, useState } from 'react';

// import SearchIcon from 'icons/search.svg';

const SearchIcon = createIcon({
  displayName: 'SearchIcon',
  viewBox: '0 0 24 24',
  path: (
    <g fill="currentColor">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15,3 21,3 21,9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </g>
  ),
});

import type { InputProps } from '../../chakra/input';
import { Input } from '../../chakra/input';
import { InputGroup } from '../../chakra/input-group';
import type { SkeletonProps } from '../../chakra/skeleton';
import { Skeleton } from '../../chakra/skeleton';
import { ClearButton } from '../buttons/ClearButton';

export interface FilterInputProps extends Omit<SkeletonProps, 'onChange' | 'loading'> {
  onChange?: (searchTerm: string) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  loading?: boolean;
  size?: 'sm' | 'md' | 'lg';
  placeholder: string;
  initialValue?: string;
  type?: React.HTMLInputTypeAttribute;
  name?: string;
  inputProps?: InputProps;
};

export const FilterInput = ({
  onChange,
  size = 'sm',
  placeholder,
  initialValue,
  type,
  name,
  loading = false,
  onFocus,
  onBlur,
  inputProps,
  ...rest
}: FilterInputProps) => {
  const [ filterQuery, setFilterQuery ] = useState(initialValue || '');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFilterQueryChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setFilterQuery(value);
    onChange?.(value);
  }, [ onChange ]);

  const handleFilterQueryClear = useCallback(() => {
    setFilterQuery('');
    onChange?.('');
    inputRef?.current?.focus();
  }, [ onChange ]);

  const startElement = <Icon boxSize={ 5 }><SearchIcon/></Icon>;
  const endElement = <ClearButton onClick={ handleFilterQueryClear } visible={ filterQuery.length > 0 }/>;

  return (
    <Skeleton
      minW="250px"
      borderRadius="base"
      loading={ loading }
      { ...rest }
    >
      <InputGroup
        startElement={ startElement }
        startElementProps={{ px: 2 }}
        endElement={ endElement }
        endElementProps={{ w: '32px' }}
      >
        <Input
          ref={ inputRef }
          size={ size }
          value={ filterQuery }
          onChange={ handleFilterQueryChange }
          onFocus={ onFocus }
          onBlur={ onBlur }
          placeholder={ placeholder }
          borderWidth="2px"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          type={ type }
          name={ name }
          { ...inputProps }
        />
      </InputGroup>
    </Skeleton>
  );
};
