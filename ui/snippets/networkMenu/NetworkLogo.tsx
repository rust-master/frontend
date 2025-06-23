import { chakra } from '@chakra-ui/react';
import React from 'react';

import { route } from 'nextjs-routes';

import config from 'configs/app';
import { useColorModeValue } from 'toolkit/chakra/color-mode';
import { Image } from 'toolkit/chakra/image';
import IconSvg from 'ui/shared/IconSvg';
import logoSTC from "../../../icons/logostc.svg"


interface Props {
  isCollapsed?: boolean;
  onClick?: (event: React.SyntheticEvent) => void;
  className?: string;
}

const LogoFallback = ({ isCollapsed, isSmall }: { isCollapsed?: boolean; isSmall?: boolean }) => {
  const display = isSmall ? {
    base: 'none',
    lg: isCollapsed === false ? 'none' : 'block',
    xl: isCollapsed ? 'block' : 'none',
  } : {
    base: 'block',
    lg: isCollapsed === false ? 'block' : 'none',
    xl: isCollapsed ? 'none' : 'block',
  };

  return (
    <IconSvg
      name={ isSmall ? 'networks/icon-placeholder' : 'networks/logo-placeholder' }
      width={ isSmall ? '30px' : '120px' }
      height="100%"
      color={{ base: 'blue.600', _dark: 'white' }}
      display={ display }
      aria-label={ isSmall ? 'Network icon placeholder' : 'Network logo placeholder' }
    />
  );
};

const INVERT_FILTER = 'brightness(0) invert(1)';

const NetworkLogo = ({ isCollapsed, onClick, className }: Props) => {
 
  const logoSrc = useColorModeValue(config.UI.navigation.logo.default, config.UI.navigation.logo.dark || config.UI.navigation.logo.default);
  const iconSrc = useColorModeValue(config.UI.navigation.icon.default, config.UI.navigation.icon.dark || config.UI.navigation.icon.default);

  return (
    <div>
      <img width="100" height="100" src="https://pouch.jumpshare.com/preview/5eu6lsB_6Ubf962W7SyFPIAuThugCf8V9MpHU1hM6E293AMGFh03ho-sKlbZifk_AawBoIRaYSrtruO_hjplP6mkw7L6Q-OzDV3jw3eJO7I" alt="Network Logo" />
    </div>
    // <chakra.a
    //   className={ className }
    //   href={ route({ pathname: '/' }) }
    //   width={{ base: '120px', lg: isCollapsed === false ? '120px' : '30px', xl: isCollapsed ? '30px' : '120px' }}
    //   height={{ base: '24px', lg: isCollapsed === false ? '24px' : '30px', xl: isCollapsed ? '30px' : '24px' }}
    //   display="inline-flex"
    //   overflow="hidden"
    //   onClick={ onClick }
    //   flexShrink={ 0 }
    //   aria-label="Link to main page"
    // >
    //   { /* big logo */ }
    //   <Image
    //     w="100%"
    //     h="100%"
    //     src={ "https://pouch.jumpshare.com/preview/TBobd3qkpYlNEI3kFERF5HcVH1yizkqgUIE3dA2DnCJ_WdB9-9bANq_Fm-w1Kiy3uXlTNfjhw6LYJRnJjaBHd9dFEa_ozXvY8DSKJbAUqC0" }
    //     alt={ `${ config.chain.name } network logo` }
    //     fallback={ <LogoFallback isCollapsed={ isCollapsed }/> }
    //     display={{ base: 'block', lg: isCollapsed === false ? 'block' : 'none', xl: isCollapsed ? 'none' : 'block' }}
    //     filter={{ _dark: !config.UI.navigation.logo.dark ? INVERT_FILTER : undefined }}
    //     objectFit="contain"
    //     objectPosition="left"
    //   />
    //   { /* small logo */ }
    //   <Image
    //     w="900px"
    //     h="900px"
    //     src={ "https://pouch.jumpshare.com/preview/TBobd3qkpYlNEI3kFERF5HcVH1yizkqgUIE3dA2DnCJ_WdB9-9bANq_Fm-w1Kiy3uXlTNfjhw6LYJRnJjaBHd9dFEa_ozXvY8DSKJbAUqC0" }
    //     alt={ `${ config.chain.name } network logo` }
    //     fallback={ <LogoFallback isCollapsed={ isCollapsed } isSmall/> }
    //     display={{ base: 'none', lg: isCollapsed === false ? 'none' : 'block', xl: isCollapsed ? 'block' : 'none' }}
    //     filter={{ _dark: !config.UI.navigation.icon.dark ? INVERT_FILTER : undefined }}
    //     objectFit="contain"
    //     objectPosition="left"
    //   />
    // </chakra.a>
  );
};

export default React.memo(chakra(NetworkLogo));
