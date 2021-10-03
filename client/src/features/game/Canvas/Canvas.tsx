import React, { useEffect, useRef, useCallback } from 'react';
import { ReactSketchCanvas, CanvasPath } from 'react-sketch-canvas';
import { Box } from '@chakra-ui/react';

import useCanvasToolbar from './useCanvasToolbar';

interface CanvasProps {
  isEditMode: boolean;
}

function Canvas({ isEditMode }: CanvasProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<ReactSketchCanvas>(null);

  const { strokeColor, strokeWidth, renderCanvasToolbar } = useCanvasToolbar({
    canvasRef,
  });

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
      {isEditMode && renderCanvasToolbar()}
    </Box>
  );
}

export default Canvas;
