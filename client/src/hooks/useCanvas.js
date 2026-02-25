// useCanvas.js
import { CanvasScreen, Sprite } from "@jaymar921/2dgraphic-utils";
import { useEffect, useState } from "react";

/**
 * @param {string} canvasId
 * @param {Number} width
 * @param {Number} height
 * @param {string} background
 */
export function useCanvas(
  canvasId = "my-canvas",
  width,
  height,
  background = "black",
) {
  const [canvas, setCanvas] = useState();

  useEffect(() => {
    const canvas = new CanvasScreen(canvasId, width, height, background);
    setCanvas(canvas);
  }, [canvasId, background]);

  function getFixedCameraOffset() {
    return CanvasScreen.fixedCameraOffset;
  }

  function getCameraOffset() {
    return CanvasScreen.cameraOffset;
  }

  function setCameraOffset(x = 0, y = 0) {
    CanvasScreen.cameraOffset = { x, y };
  }

  function enableScreenDrag(bool) {
    if (!canvas) return;
    canvas.enableScreenDrag(bool);
  }

  function handleScreenClickedEvent(callbackFunc) {
    if (!canvas) return;
    canvas.handleScreenClickedEvent(callbackFunc);
  }

  function registerObject(sprite) {
    if (!canvas) return;
    canvas.registerObject(sprite);
  }

  function unregisterObject(objectId) {
    if (!canvas) return;
    canvas.unregisterObject(objectId);
  }

  function getRegisteredObject(objectId) {
    if (!canvas) return null;
    return canvas.getRegisteredObject(objectId);
  }

  function getAllRegisteredObjects() {
    if (!canvas) return [];
    return canvas.getAllRegisteredObjects();
  }

  function setGlobalScale(value) {
    if (!canvas) return;
    canvas.setGlobalScale(value);
  }

  function enableScreenZoom(bool) {
    if (!canvas) return;
    canvas.enableScreenZoom(bool);
  }

  function handleScreenZoomEvent(callback) {
    if (!canvas) return;
    canvas.handleScreenZoomEvent(callback);
  }

  function setZoomSpeed(value = 0.01) {
    if (!canvas) return;
    canvas.setZoomSpeed(value);
  }

  return {
    registerObject,
    unregisterObject,
    handleScreenClickedEvent,
    enableScreenDrag,
    getRegisteredObject,
    getAllRegisteredObjects,
    getCameraOffset,
    setCameraOffset,
    setGlobalScale,
    enableScreenZoom,
    handleScreenZoomEvent,
    setZoomSpeed,
    getFixedCameraOffset,
  };
}
