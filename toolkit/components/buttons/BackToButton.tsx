import { Icon, createIcon } from '@chakra-ui/react';
import React from 'react';

// import ArrowIcon from 'icons/arrows/east.svg';

const ArrowIcon = createIcon({
  displayName: 'ArrowIcon',
  viewBox: '0 0 24 24',
  path: (
    <g fill="currentColor">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15,3 21,3 21,9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </g>
  ),
});

import type { IconButtonProps } from '../../chakra/icon-button';
import { IconButton } from '../../chakra/icon-button';
import { Link } from '../../chakra/link';
import { Tooltip } from '../../chakra/tooltip';

export interface BackToButtonProps extends IconButtonProps {
  href?: string;
  hint?: string;
}

export const BackToButton = ({ href, hint, boxSize = 6, ...rest }: BackToButtonProps) => {

  const button = (
    <IconButton { ...rest } boxSize={ boxSize }>
      <Icon
        transform="rotate(180deg)"
        color="icon.backTo"
        _hover={{ color: 'link.primary.hover' }}
        boxSize={ boxSize }
      >
        <ArrowIcon/>
      </Icon>
    </IconButton>
  );

  return (
    <Tooltip content={ hint } disabled={ !hint }>
      { href ? <Link href={ href } asChild>{ button }</Link> : button }
    </Tooltip>
  );
};
