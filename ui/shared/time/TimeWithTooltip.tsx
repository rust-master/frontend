import { chakra } from '@chakra-ui/react';

import type { TimeFormat } from 'types/settings';

import { useSettingsContext } from 'lib/contexts/settings';
import dayjs from 'lib/date/dayjs';
import useTimeAgoIncrement from 'lib/hooks/useTimeAgoIncrement';
import { Skeleton } from 'toolkit/chakra/skeleton';
import { Tooltip } from 'toolkit/chakra/tooltip';

type Props = {
  timestamp?: string | number | null;
  fallbackText?: string;
  isLoading?: boolean;
  enableIncrement?: boolean;
  className?: string;
  timeFormat?: TimeFormat;
};

const TimeWithTooltip = ({
  timestamp,
  fallbackText,
  isLoading,
  enableIncrement,
  className,
  timeFormat: timeFormatProp,
}: Props) => {
  const settings = useSettingsContext();
  const timeFormat = timeFormatProp || settings?.timeFormat || 'relative';
  const timeAgo = useTimeAgoIncrement(timestamp || '', enableIncrement && !isLoading && timeFormat === 'relative');

  if (!timestamp && !fallbackText) {
    return null;
  }

  const content = (() => {
    if (!timestamp) {
      return fallbackText;
    }

    const date = dayjs(timestamp);

    // Check if the date is valid before attempting to format
    if (!date.isValid()) {
      return fallbackText || 'Invalid date';
    }

    try {
      if (timeFormat === 'relative') {
        const formattedDate = date.format('llll');
        return (
          <Tooltip content={ formattedDate }>
            <span>{ timeAgo }</span>
          </Tooltip>
        );
      }

      const formattedDate = date.format('lll');
      return (
        <Tooltip content={ timeAgo }>
          <span>{ formattedDate }</span>
        </Tooltip>
      );
    } catch (error) {
      return fallbackText || 'Invalid date';
    }
  })();

  return (
    <Skeleton loading={ isLoading } className={ className }>
      { content }
    </Skeleton>
  );
};

export default chakra(TimeWithTooltip);
