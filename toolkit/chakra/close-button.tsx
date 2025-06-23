import type { ButtonProps, IconButtonProps } from '@chakra-ui/react';
import { Icon, useRecipe, createIcon } from '@chakra-ui/react';
import * as React from 'react';

// import CloseIcon from 'icons/close.svg';

import { recipe as closeButtonRecipe } from '../theme/recipes/close-button.recipe';
import { IconButton } from './icon-button';

// Create a custom close icon using createIcon
const CloseIcon = createIcon({
  displayName: 'CloseIcon',
  viewBox: '0 0 24 24',
  path: (
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M18 6L6 18"/>
      <path d="M6 6l12 12"/>
    </g>
  ),
});

export interface CloseButtonProps extends Omit<ButtonProps, 'variant' | 'size'> {
  variant?: 'plain';
  size?: 'md';
}

export const CloseButton = React.forwardRef<
  HTMLButtonElement,
  CloseButtonProps
>(function CloseButton(props, ref) {
  const recipe = useRecipe({ recipe: closeButtonRecipe });
  const [ recipeProps, restProps ] = recipe.splitVariantProps(props);
  const styles = recipe(recipeProps);

  return (
    <IconButton aria-label="Close" ref={ ref } css={ styles } { ...restProps }>
      { props.children ?? <Icon boxSize={ 5 }><CloseIcon/></Icon> }
    </IconButton>
  );
});
