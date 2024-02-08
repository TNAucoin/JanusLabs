import React from 'react';
import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Tooltip,
} from '@chakra-ui/react';
import { BoxIcon } from 'lucide-react';

export const ValueSlider = ({
  value,
  setValue,
  startValue,
  maxValue,
  minValue,
  step,
}) => {
  const [showTooltip, setShowTooltip] = React.useState(false);
  // Create SliderMarks
  const sliderMarks = Array.from(
    { length: 100 },
    (_, i) =>
      i % step === 0 && (
        <SliderMark key={i} value={i} mt="2" ml={-2} fontSize="sm">
          {i}
        </SliderMark>
      )
  );
  return (
    <Slider
      id="slider"
      defaultValue={startValue}
      min={minValue}
      max={maxValue}
      colorScheme="orange"
      onChange={v => setValue(v)}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {sliderMarks}
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <Tooltip
        hasArrow
        bg="lightcoral"
        color="white"
        placement="top"
        isOpen={showTooltip}
        label={`${value}`}
      >
        <SliderThumb boxSize={6}>
          <Box>
            <BoxIcon width={16} />
          </Box>
        </SliderThumb>
      </Tooltip>
    </Slider>
  );
};
