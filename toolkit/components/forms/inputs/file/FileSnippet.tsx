import { Box, Flex, Icon, Text, chakra, createIcon } from '@chakra-ui/react';
import React from 'react';

// import JsonFileIcon from 'icons/files/json.svg';
// import PlaceholderFileIcon from 'icons/files/placeholder.svg';
// import SolFileIcon from 'icons/files/sol.svg';
// import YulFileIcon from 'icons/files/yul.svg';

const JsonFileIcon = createIcon({
  displayName: 'JsonFileIcon',
  viewBox: '0 0 24 24',
  path: (
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M18 6L6 18"/>
      <path d="M6 6l12 12"/>
    </g>
  ),
});

const PlaceholderFileIcon = createIcon({
  displayName: 'PlaceholderFileIcon',
  viewBox: '0 0 24 24',
  path: (
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M18 6L6 18"/>
      <path d="M6 6l12 12"/>
    </g>
  ),
});

const SolFileIcon = createIcon({
  displayName: 'SolFileIcon',
  viewBox: '0 0 24 24',
  path: (
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M18 6L6 18"/>
      <path d="M6 6l12 12"/>
    </g>
  ),
});

const YulFileIcon = createIcon({
  displayName: 'YulFileIcon',
  viewBox: '0 0 24 24',
  path: (
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M18 6L6 18"/>
      <path d="M6 6l12 12"/>
    </g>
  ),
});

import { CloseButton } from '../../../../chakra/close-button';
import { Hint } from '../../../../components/Hint/Hint';

const FILE_ICONS: Record<string, React.ReactNode> = {
  '.json': <JsonFileIcon/>,
  '.sol': <SolFileIcon/>,
  '.yul': <YulFileIcon/>,
};

function getFileExtension(fileName: string) {
  const chunks = fileName.split('.');
  if (chunks.length === 1) {
    return '';
  }

  return '.' + chunks[chunks.length - 1];
}

interface Props {
  file: File;
  className?: string;
  index?: number;
  onRemove?: (index?: number) => void;
  isDisabled?: boolean;
  error?: string;
}

export const FileSnippet = chakra(({ file, className, index, onRemove, isDisabled, error }: Props) => {
  const handleRemove = React.useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    onRemove?.(index);
  }, [ index, onRemove ]);

  const fileExtension = getFileExtension(file.name);
  const fileIcon = FILE_ICONS[fileExtension] || <PlaceholderFileIcon/>;

  return (
    <Flex
      maxW="300px"
      overflow="hidden"
      className={ className }
      alignItems="center"
      textAlign="left"
      columnGap={ 2 }
    >
      <Icon boxSize="48px" color={ error ? 'text.error' : 'initial' }>
        { fileIcon }
      </Icon>
      <Box maxW="calc(100% - 58px - 24px)">
        <Flex alignItems="center">
          <Text
            fontWeight={ 600 }
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            color={ error ? 'text.error' : 'initial' }
          >
            { file.name }
          </Text>
          { Boolean(error) && <Hint label={ error } ml={ 1 } color="text.error"/> }
          <CloseButton
            aria-label="Remove"
            ml={ 2 }
            onClick={ handleRemove }
            disabled={ isDisabled }
          />
        </Flex>
        <Text color="text.secondary" textStyle="sm" mt={ 1 }>
          { file.size.toLocaleString(undefined, { notation: 'compact', maximumFractionDigits: 2, unit: 'byte', unitDisplay: 'narrow', style: 'unit' }) }
        </Text>
      </Box>
    </Flex>
  );
});
