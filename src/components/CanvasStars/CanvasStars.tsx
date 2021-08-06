import { FunctionComponent, useEffect, useRef } from "react";
import "./CanvasStars.css";

export const CanvasStarsComponent: FunctionComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWhiteRef = useRef<HTMLCanvasElement>(null);

  const handleClick = (event: any) => {
    event.stopPropagation();
    const canvas = canvasWhiteRef.current as HTMLCanvasElement;
    const wrapperForColor = canvas.getContext("2d");
    if (!wrapperForColor) {
      throw new Error("Invalid canvas object");
    }

    // https://ourcodeworld.com/articles/read/185/how-to-get-the-pixel-color-from-a-canvas-on-click-or-mouse-event-with-javascript
    /**
     * Return the location of the element (x,y) being relative to the document.
     *
     * @param {Element} obj Element to be located
     */
    const getElementPosition = (obj: any) => {
      let curleft = 0;
      let curtop = 0;
      if (obj.offsetParent) {
        do {
          curleft += obj.offsetLeft;
          curtop += obj.offsetTop;
        } while ((obj = obj.offsetParent));
        return { x: curleft, y: curtop };
      }
      return undefined;
    };

    /**
     * return the location of the click (or another mouse event) relative to the given element (to increase accuracy).
     * @param {DOM Object} element A dom element (button,canvas,input etc)
     * @param {DOM Event} event An event generate by an event listener.
     */
    const getEventLocation = (element: any, event: any) => {
      // Relies on the getElementPosition function.
      const pos = getElementPosition(element);
      if (!pos) {
        throw new Error("Inavlid position");
      }
      return {
        x: event.pageX - pos.x,
        y: event.pageY - pos.y,
      };
    };

    function rgbToHex(r: number, g: number, b: number) {
      if (r > 255 || g > 255 || b > 255)
        throw new Error("Invalid color component");
      return ((r << 16) | (g << 8) | b).toString(16);
    }

    const eventLocation = getEventLocation(event.target, event);
    // Get the data of the pixel according to the location generate by the getEventLocation function
    const context = event.target.getContext("2d");
    const pixelData = context.getImageData(
      eventLocation.x,
      eventLocation.y,
      1,
      1
    ).data;

    // If transparency on the pixel , array = [0,0,0,0]
    if (
      pixelData[0] === 0 &&
      pixelData[1] === 0 &&
      pixelData[2] === 0 &&
      pixelData[3] === 0
    ) {
      wrapperForColor.fillStyle = "white";
    } else {
      const hex =
        "#" +
        ("000000" + rgbToHex(pixelData[0], pixelData[1], pixelData[2])).slice(
          -6
        );

      wrapperForColor.fillStyle = hex;
    }

    wrapperForColor.fillRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    // http://jsfiddle.net/m1erickson/8j6kdf4o/
    const drawStar = (
      cx: number,
      cy: number,
      spikes: number,
      outerRadius: number,
      innerRadius: number,
      color: string
    ) => {
      var rot = (Math.PI / 2) * 3;
      var x = cx;
      var y = cy;
      var step = Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
      ctx.stroke();
      ctx.fillStyle = color;
      ctx.fill();
    };

    drawStar(100, 100, 5, 30, 15, "red");
    drawStar(200, 100, 5, 30, 15, "blue");
    drawStar(300, 100, 5, 30, 15, "green");
    drawStar(400, 100, 5, 30, 15, "yellow");
    drawStar(500, 100, 5, 30, 15, "black");
  }, []);
  return (
    <div className="canvas">
      <canvas
        ref={canvasRef}
        id="canvas"
        width="600"
        height="200"
        onClick={handleClick}
      ></canvas>
      <canvas ref={canvasWhiteRef} id="canvas" width="600" height="50"></canvas>
    </div>
  );
};
