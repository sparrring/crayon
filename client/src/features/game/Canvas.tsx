import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ReactSketchCanvas, CanvasPath } from 'react-sketch-canvas';
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

interface CanvasProps {
  isEditMode: boolean;
}

function Canvas({ isEditMode }: CanvasProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<ReactSketchCanvas>(null);

  const [strokeColor, setStrokeColor] = useState(StrokeColor.Black);
  const [strokeWidth, setStrokeWidth] = useState(StrokeWidth.L);

  useEffect(
    function preventEditCanvas() {
      if (isEditMode) {
        return undefined;
      }

      const wrapperElement = wrapperRef.current;

      function preventPointerEvent(event: PointerEvent) {
        event.preventDefault();
        event.stopPropagation();
      }

      wrapperElement?.addEventListener('pointerdown', preventPointerEvent);
      wrapperElement?.addEventListener('pointermove', preventPointerEvent);
      wrapperElement?.addEventListener('pointerup', preventPointerEvent);

      return function cleanUp() {
        wrapperElement?.removeEventListener('pointerdown', preventPointerEvent);
        wrapperElement?.removeEventListener('pointermove', preventPointerEvent);
        wrapperElement?.removeEventListener('pointerup', preventPointerEvent);
      };
    },
    [isEditMode],
  );

  const handleUpdateCanvas = useCallback((updatedPath: CanvasPath[]) => {
    console.log(...updatedPath);
  }, []);

  const handleClickStrokeColorSelectButton = useCallback(
    (color: StrokeColor) => () => {
      setStrokeColor(color);
      canvasRef.current?.eraseMode(false);
    },
    [],
  );

  const handleClickEraserButton = useCallback(() => {
    canvasRef.current?.eraseMode(true);
  }, []);

  const handleClickClearButton = useCallback(() => {
    canvasRef.current?.clearCanvas();
  }, []);

  return (
    <Box>
      <Box ref={wrapperRef}>
        <ReactSketchCanvas
          ref={canvasRef}
          width="600"
          height="600"
          strokeColor={strokeColor}
          strokeWidth={strokeWidth}
          onUpdate={handleUpdateCanvas}
          withTimestamp
        />
      </Box>
      {isEditMode && (
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
      )}
    </Box>
  );
}

export default Canvas;
