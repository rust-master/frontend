import type { LinkProps as ChakraLinkProps } from '@chakra-ui/react';
import { Link as ChakraLink, LinkBox as ChakraLinkBox, LinkOverlay as ChakraLinkOverlay, Icon, createIcon } from '@chakra-ui/react';
import NextLink from 'next/link';
import type { LinkProps as NextLinkProps } from 'next/link';
import React from 'react';

// import ArrowIcon from 'icons/link_external.svg';


import { Skeleton } from './skeleton';

// export const LinkExternalIcon = ({ color }: { color?: ChakraLinkProps['color'] }) => (
//   <Icon
//     boxSize={ 3 }
//     verticalAlign="middle"
//     color={ color ?? 'icon.externalLink' }
//     _groupHover={{
//       color: 'inherit',
//     }}
//     flexShrink={ 0 }
//   >
//     <ArrowIcon/>
//   </Icon>
// );

export const LinkExternalIcon = createIcon({
  displayName: "LinkExternalIcon",
  viewBox: "0 0 24 24",
  path: (
    <g fill="currentColor">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15,3 21,3 21,9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </g>
  ),
})



interface LinkPropsChakra extends ChakraLinkProps {
  loading?: boolean;
  external?: boolean;
  iconColor?: ChakraLinkProps['color'];
  noIcon?: boolean;
  disabled?: boolean;
}

interface LinkPropsNext extends Partial<Pick<NextLinkProps, 'shallow' | 'prefetch' | 'scroll'>> {}

export interface LinkProps extends LinkPropsChakra, LinkPropsNext {}

const splitProps = (props: LinkProps): { chakra: LinkPropsChakra; next: NextLinkProps } => {
  const { scroll = true, shallow = false, prefetch = false, ...rest } = props;

  return {
    chakra: rest,
    next: {
      href: rest.href as NextLinkProps['href'],
      scroll,
      shallow,
      prefetch,
    },
  };
};

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  function Link(props, ref) {
    const { chakra, next } = splitProps(props);
    const { external, loading, href, children, disabled, noIcon, iconColor, ...rest } = chakra;

    if (external) {
      return (
        <Skeleton loading={ loading } ref={ ref as React.ForwardedRef<HTMLDivElement> } asChild>
          <ChakraLink
            href={ href }
            className="group"
            target="_blank"
            rel="noopener noreferrer"
            { ...(disabled ? { 'data-disabled': true } : {}) }
            { ...rest }
          >
            { children }
            { !noIcon && <LinkExternalIcon color={ iconColor }/> }
          </ChakraLink>
        </Skeleton>
      );
    }

    return (
      <Skeleton loading={ loading } ref={ ref as React.ForwardedRef<HTMLDivElement> } asChild>
        <ChakraLink
          asChild
          { ...(disabled ? { 'data-disabled': true } : {}) }
          { ...rest }
        >
          { next.href ? (
            <NextLink { ...next }>
              { children }
            </NextLink>
          ) :
            <span>{ children }</span>
          }
        </ChakraLink>
      </Skeleton>
    );
  },
);

export const LinkBox = ChakraLinkBox;

export const LinkOverlay = React.forwardRef<HTMLAnchorElement, LinkProps>(
  function LinkOverlay(props, ref) {
    const { chakra, next } = splitProps(props);
    const { children, external, ...rest } = chakra;

    if (external) {
      return (
        <ChakraLinkOverlay ref={ ref } target="_blank" rel="noopener noreferrer" { ...rest }>
          { children }
        </ChakraLinkOverlay>
      );
    }

    return (
      <ChakraLinkOverlay ref={ ref } asChild={ Boolean(next.href) } { ...rest }>
        { next.href ? <NextLink { ...next }>{ children }</NextLink> : children }
      </ChakraLinkOverlay>
    );
  },
);
