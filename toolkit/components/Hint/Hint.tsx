import { Icon } from '@chakra-ui/react';
import React from 'react';

// import InfoIcon from 'icons/info.svg';

import { createIcon } from "@chakra-ui/react"

const InfoIcon = createIcon({
  displayName: "InfoIcon",
  viewBox: "0 0 24 24",
  path: (
    <g fill="currentColor">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15,3 21,3 21,9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </g>
  ),
})

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
