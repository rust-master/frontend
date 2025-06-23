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
    <g fill="currentColor">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15,3 21,3 21,9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </g>
  ),
});

const PlaceholderFileIcon = createIcon({
  displayName: 'PlaceholderFileIcon',
  viewBox: '0 0 24 24',
  path: (
    <g fill="currentColor">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15,3 21,3 21,9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </g>
  ),
});

const SolFileIcon = createIcon({
  displayName: 'SolFileIcon',
  viewBox: '0 0 24 24',
  path: (
    <g fill="currentColor">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15,3 21,3 21,9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </g>
  ),
});

const YulFileIcon = createIcon({
  displayName: 'YulFileIcon',
  viewBox: '0 0 24 24',
  path: (
    <g fill="currentColor">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15,3 21,3 21,9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
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
