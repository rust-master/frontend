import { Icon, createIcon } from '@chakra-ui/react';
import React from 'react';

// import ArrowIcon from 'icons/arrows/east.svg';

const ArrowIcon = createIcon({
  displayName: 'ArrowIcon',
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
