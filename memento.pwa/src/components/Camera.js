import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  Camera as CameraIcon,
  CameraOff,
  RefreshCcw,
  ArrowLeft,
} from "react-feather";
import { useUserMedia } from "@vardius/react-user-media";

function getBlobFromCanvas(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(resolve, "image/jpeg", 0.75);
  });
}

const getSettings = (facing, size) => ({
  audio: false,
  video: {
    facingMode: { ideal: facing },
  },
});

function useStream(facing, size) {
  return useUserMedia(getSettings(facing, size));
}

export function Camera({ onPhoto, onBack, enabled }) {
  const [facing, setFacing] = useState("user");
  const canvasRef = useRef();

  const takePicture = useCallback(() => {
    getBlobFromCanvas(canvasRef.current).then(onPhoto);
  }, [canvasRef, onPhoto]);

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        background: "#232323",
      }}
    >
      <canvas
        ref={canvasRef}
        width="320"
        height="320"
        style={{
          border: "2px #939393 solid",
          zIndex: 10,
          borderLeft: "none",
          borderRight: "none",
          position: "absolute",
          maxWidth: "100%",
          maxHeight: "100%",
        }}
      />
      <CameraInner facing={facing} key={facing} ctx={canvasRef} />
      <div style={{ position: "absolute", left: 20, top: 20 }} onClick={onBack}>
        <ArrowLeft color="#fff" />
      </div>
      <div
        style={{ position: "absolute", right: 20, top: 20 }}
        onClick={() => setFacing(facing === "user" ? "environment" : "user")}
      >
        <RefreshCcw color="#fff" />
      </div>
      <Buttons
        setFacing={setFacing}
        facing={facing}
        enabled={enabled}
        takePicture={takePicture}
      />
    </div>
  );
}

export function CameraInner({ facing, ctx }) {
  const { stream, error } = useStream(facing, 320);

  const video = useRef();
  useEffect(() => {
    if (stream && video.current) {
      video.current.srcObject = stream;
      video.current.onloadedmetadata = function (e) {
        video.current.play();
      };
    }
    return () => {
      if (stream) stream.getTracks().forEach((track) => track.stop());
      if (video.current) {
        video.current.pause();
      }
    };
  }, [video, stream, ctx]);

  useEffect(() => {
    let raf;
    function loop() {
      raf = requestAnimationFrame(loop);
      if (ctx.current && video.current) {
        ctx.current
          .getContext("2d")
          .drawImage(
            video.current,
            0,
            0,
            Math.min(video.current.videoWidth, video.current.videoHeight),
            Math.min(video.current.videoWidth, video.current.videoHeight),
            0,
            0,
            Math.min(ctx.current.width, ctx.current.height),
            Math.min(ctx.current.width, ctx.current.height)
          );
      }
    }
    if (ctx.current && video.current) {
      setTimeout(loop, 2000);
    }

    return () => cancelAnimationFrame(raf);
  }, [ctx, video]);

  return (
    <>
      {error && <p>Error using Camera</p>}
      <video ref={video} style={{ display: "none" }} />
    </>
  );
}

function Buttons({ setFacing, facing, enabled, takePicture }) {
  return (
    <div
      className="d-flex flex-row justify-content-center align-items-center"
      style={{
        position: "absolute",
        left: 0,
        width: "100%",
        right: "100%",
        bottom: 0,
        height: 120,
      }}
    >
      <button
        disabled={!enabled}
        onClick={takePicture}
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "50px",
          background: "transparent",
          border: "2px solid #fff",
          color: "#fff",
          outline: "none",
        }}
      >
        {enabled ? <CameraIcon /> : <CameraOff />}
      </button>
    </div>
  );
}
