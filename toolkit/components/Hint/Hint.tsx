import { Icon, createIcon } from '@chakra-ui/react';
import React from 'react';

// import InfoIcon from 'icons/info.svg';

const InfoIcon = createIcon({
  displayName: 'InfoIcon',
  viewBox: '0 0 24 24',
  path: (
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M18 6L6 18"/>
      <path d="M6 6l12 12"/>
    </g>
  ),
});

import type { IconButtonProps } from '../../chakra/icon-button';
import { IconButton } from '../../chakra/icon-button';
import type { TooltipProps } from '../../chakra/tooltip';
import { Tooltip } from '../../chakra/tooltip';

interface Props extends IconButtonProps {
  label: string | React.ReactNode;
  tooltipProps?: Partial<TooltipProps>;
  isLoading?: boolean;
  as?: React.ElementType;
}

export const Hint = React.memo(({ label, tooltipProps, isLoading, boxSize = 5, ...rest }: Props) => {
  return (
    <Tooltip
      content={ label }
      positioning={{ placement: 'top' }}
      { ...tooltipProps }
    >
      <IconButton
        aria-label="hint"
        boxSize={ boxSize }
        loadingSkeleton={ isLoading }
        borderRadius="sm"
        color="icon.info"
        _hover={{ color: 'link.primary.hover' }}
        { ...rest }
      >
        <Icon boxSize={ boxSize }>
          <InfoIcon/>
        </Icon>
      </IconButton>
    </Tooltip>
  );
});
