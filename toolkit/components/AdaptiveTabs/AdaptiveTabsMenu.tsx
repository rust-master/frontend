import { Icon, createIcon } from '@chakra-ui/react';
import React from 'react';

import type { TabItem } from './types';

// import DotsIcon from 'icons/dots.svg';

const DotsIcon = createIcon({
  displayName: 'DotsIcon',
  viewBox: '0 0 24 24',
  path: (
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M18 6L6 18"/>
      <path d="M6 6l12 12"/>
    </g>
  ),
});

import { IconButton } from '../../chakra/icon-button';
import type { IconButtonProps } from '../../chakra/icon-button';
import { PopoverBody, PopoverCloseTriggerWrapper, PopoverContent, PopoverRoot, PopoverTrigger } from '../../chakra/popover';
import { TabsCounter, TabsTrigger } from '../../chakra/tabs';
import { getTabValue } from './utils';

interface Props extends IconButtonProps {
  tabs: Array<TabItem>;
  tabsCut: number;
  isActive: boolean;
}

const AdaptiveTabsMenu = ({ tabs, tabsCut, isActive, ...props }: Props, ref: React.Ref<HTMLButtonElement>) => {

  return (
    <PopoverRoot positioning={{ placement: 'bottom-end' }}>
      <PopoverTrigger>
        <IconButton
          // we use "div" so the :last-of-type pseudo-class targets the last tab and not the menu trigger
          as="div"
          variant="plain"
          color="tabs.solid.fg"
          _hover={{
            color: 'link.primary.hover',
          }}
          _expanded={{
            color: 'tabs.solid.fg.selected',
            bg: 'tabs.solid.bg.selected',
          }}
          ref={ ref }
          expanded={ isActive }
          px="18px"
          { ...props }
        >
          <Icon boxSize={ 5 }><DotsIcon/></Icon>
        </IconButton>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody display="flex" flexDir="column" rowGap={ 2 } px={ 0 }>
          { tabs.slice(tabsCut).map((tab) => {
            const value = getTabValue(tab);

            return (
              <PopoverCloseTriggerWrapper key={ value }>
                <TabsTrigger
                  className="group"
                  value={ value }
                  w="100%"
                  py="5px"
                  borderRadius="none"
                  fontWeight="normal"
                  color="initial"
                  _hover={{
                    bg: 'tabs.solid.bg.selected',
                  }}
                >
                  { typeof tab.title === 'function' ? tab.title() : tab.title }
                  <TabsCounter count={ tab.count }/>
                </TabsTrigger>
              </PopoverCloseTriggerWrapper>
            );
          }) }
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
};

export default React.memo(React.forwardRef(AdaptiveTabsMenu));
