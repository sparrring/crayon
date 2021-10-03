import React, { useState, useRef, useCallback } from 'react';
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

function Canvas() {
  const canvasRef = useRef<ReactSketchCanvas>(null);

  const [strokeColor, setStrokeColor] = useState(StrokeColor.Black);
  const [strokeWidth, setStrokeWidth] = useState(StrokeWidth.L);

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
      <ReactSketchCanvas
        ref={canvasRef}
        width="600"
        height="600"
        strokeColor={strokeColor}
        strokeWidth={strokeWidth}
        onUpdate={handleUpdateCanvas}
        withTimestamp
      />
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
  );
}

export default Canvas;
