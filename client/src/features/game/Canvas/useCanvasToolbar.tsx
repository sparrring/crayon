import React, { useState, useCallback } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import { Box } from '@chakra-ui/react';

enum StrokeWidth {
  S = 2,
  M = 4,
  L = 12,
  XL = 30,
}

// TODO: 색상 HEX값 지정
enum StrokeColor {
  Black = 'black',
  Red = 'red',
  Blue = 'blue',
  Green = 'green',
  Yellow = 'yellow',
}

const storkeWidths = Object.values(StrokeWidth);
const strokeColors = Object.values(StrokeColor);

interface UseCanvasToolbarProps {
  canvasRef: React.RefObject<ReactSketchCanvas>;
}

function useCanvasToolbar({ canvasRef }: UseCanvasToolbarProps) {
  const [strokeColor, setStrokeColor] = useState(StrokeColor.Black);
  const [strokeWidth, setStrokeWidth] = useState(StrokeWidth.L);

  const handleClickStrokeColorSelectButton = useCallback(
    (color: StrokeColor) => () => {
      setStrokeColor(color);
      canvasRef.current?.eraseMode(false);
    },
    [canvasRef],
  );

  const handleClickEraserButton = useCallback(() => {
    canvasRef.current?.eraseMode(true);
  }, [canvasRef]);

  const handleClickClearButton = useCallback(() => {
    canvasRef.current?.clearCanvas();
  }, [canvasRef]);

  const renderCanvasToolbar = useCallback(
    () => (
      <Box>
        {strokeColors.map((color) => (
          <Box
            key={color}
            as="button"
            bg={color}
            width="24px"
            height="24px"
            onClick={handleClickStrokeColorSelectButton(color)}
          />
        ))}
        <button onClick={handleClickEraserButton}>지우개</button>
        <button onClick={handleClickClearButton}>다 지우기</button>
      </Box>
    ),
    [
      handleClickStrokeColorSelectButton,
      handleClickEraserButton,
      handleClickClearButton,
    ],
  );

  return {
    strokeColor,
    strokeWidth,
    renderCanvasToolbar,
  } as const;
}

export default useCanvasToolbar;
