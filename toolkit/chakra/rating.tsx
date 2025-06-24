import { Icon, RatingGroup, useRatingGroup, createIcon } from '@chakra-ui/react';
import * as React from 'react';

// import StarFilledIcon from 'icons/star_filled.svg';
// import StarOutlineIcon from 'icons/star_outline.svg';

const StarFilledIcon = createIcon({
  displayName: 'StarFilledIcon',
  viewBox: '0 0 24 24',
  path: (
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M18 6L6 18"/>
      <path d="M6 6l12 12"/>
    </g>
  ),
});

const StarOutlineIcon = createIcon({
  displayName: 'StarOutlineIcon',
  viewBox: '0 0 24 24',
  path: (
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M18 6L6 18"/>
      <path d="M6 6l12 12"/>
    </g>
  ),
});

export interface RatingProps extends Omit<RatingGroup.RootProviderProps, 'value'> {
  count?: number;
  label?: string | Array<string>;
  defaultValue?: number;
  onValueChange?: ({ value }: { value: number }) => void;
  readOnly?: boolean;
}

export const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  function Rating(props, ref) {
    const { count = 5, label: labelProp, defaultValue, onValueChange, readOnly, ...rest } = props;
    const store = useRatingGroup({ count, defaultValue, onValueChange, readOnly });

    const highlightedIndex = store.hovering && !readOnly ? store.hoveredValue : store.value;
    const label = Array.isArray(labelProp) ? labelProp[highlightedIndex - 1] : labelProp;

    return (
      <RatingGroup.RootProvider ref={ ref } value={ store } { ...rest }>
        <RatingGroup.HiddenInput/>
        <RatingGroup.Control>
          { Array.from({ length: count }).map((_, index) => {
            const icon = index < highlightedIndex ?
              <Icon boxSize={ 5 }><StarFilledIcon/></Icon> :
              <Icon boxSize={ 5 }><StarOutlineIcon/></Icon>;

            return (
              <RatingGroup.Item key={ index } index={ index + 1 }>
                <RatingGroup.ItemIndicator icon={ icon }/>
              </RatingGroup.Item>
            );
          }) }
        </RatingGroup.Control>
        { label && <RatingGroup.Label>{ label }</RatingGroup.Label> }
      </RatingGroup.RootProvider>
    );
  },
);
