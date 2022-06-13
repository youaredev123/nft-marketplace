import React, { useCallback, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { usePayments } from "../../hooks/usePayments";
import bsv from "bsv";
import mapboxgl from "mapbox-gl";
import { v4 as uuid } from "uuid";
import RelicService from "../../services/RelicService";

const Bold = styled.span`
  font-weight: bold;
`;

const Error = styled.span`
  color: red;
`;

const hashPuzzleScriptAsmPostfix = " OP_1 OP_PICK OP_SHA256 OP_1 OP_PICK OP_EQUAL OP_NIP OP_NIP";

const MAPBOXGL_ACCESS_TOKEN = "pk.eyJ1Ijoia3VuaXRzeW4iLCJhIjoiY2tsdHZkdHg3MjBlbzJwcW1yenplNWx1byJ9.TGrgJuSjgVrL-WL41-tXvg";

export default () => {
  const [ loading, setLoading ] = useState(false);
  const [ success, setSuccess ] = useState(false);
  const [ error, setError ] = useState("");
  const [ note, setNote ] = useState("");
  const [ relicAmount, setRelicAmount ] = useState(null);
  const { getInvisibleMoneyButtonClient } = usePayments();

  const map = useRef();
  const mapContainer = useRef();
  const [ relicPosX, setRelicPosX ] = useState(null);
  const [ relicPosY, setRelicPosY ] = useState(null);

  useEffect(() => {
    mapboxgl.accessToken = MAPBOXGL_ACCESS_TOKEN;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-0.09, 51.505],
      zoom: 363,
    });

    let relicMarker = null;
    map.current.on("click", (e) => {
      if (relicMarker === null) {
        relicMarker = new mapboxgl.Marker().setLngLat(e.lngLat);
        relicMarker.addTo(map.current);
      } else {
        relicMarker.setLngLat(e.lngLat);
      }
      setRelicPosX(e.lngLat.lng);
      setRelicPosY(e.lngLat.lat);
    });

    return () => map.current.remove();
  }, []);

  const putRelic = useCallback(() => {
    if (loading) {
      return;
    }
    if (!relicAmount) {
      setError("Need an output amount.");
      return;
    }
    const relicAmountNumber = Number(relicAmount);
    if (!relicAmountNumber) {
      setError(relicAmount + " doesn't look like a number.");
      return;
    }
    const newUuid = uuid();
    const newUuidHashBuffer = bsv.crypto.Hash.sha256(Buffer.from(newUuid));
    setError(null);
    (async () => {
      setLoading(true);

      const hashPuzzleScriptOpcodes = newUuidHashBuffer.toString("hex") +
        hashPuzzleScriptAsmPostfix;
      const imbClient = await getInvisibleMoneyButtonClient();
      imbClient.swipe({
        buttonId: "SMART",
        type: "tip",
        outputs: [{
          script: hashPuzzleScriptOpcodes,
          amount: relicAmountNumber.toString(),
          currency: "USD",
        }],
        onPayment: async (paymentData) => {
          const satoshis = paymentData.satoshis;
          const extraSatoshis = satoshis - 1638;

          const response = await RelicService.bury({
            lon: relicPosX,
            lat: relicPosY,
            title: "title",
            note,
            pictureLocation: newUuid,
            satoshis: extraSatoshis,
            txId: paymentData.txid,
            intermediateKey: "intermediateKey",
          });
          if (response.status !== 200) {
            setError("Your money were deducted, but backend responded with error: " +
              response.status + " " + JSON.stringify(response.data));
          } else {
            setSuccess(true);
          }
          setLoading(false);
        },
        onError: errorData => {
          setLoading(false);
          setError("Couldn't create a transaction, MB returned us error: \"" +
            errorData.message + "\"");
        },
      });
    })();
  }, [loading, relicAmount, note]);

  return (<>
    <Bold>Place Relics</Bold>
    <br />
    <div ref={mapContainer} style={{
      height: "300px",
      width: "100%",
      position: "relative",
    }} />
    <br />
    Reward in USD:<br />
    <input
      type="text"
      onChange={e => setRelicAmount(e.target.value)} />
    <br />
    Note:<br />
    <input
      type="text"
      onChange={e => setNote(e.target.value)} />
    <br />
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      {relicPosX !== null ?
        <>
          <button onClick={putRelic}>Put Relic on {relicPosX} {relicPosY}</button>
          <br />
        </> :
        <>Click on a map to start placing a Relic.</>}
      {loading && <>
        <br />
        Loading...
      </>}
      {success && <>
        <br />
        Successfuly placed a Relic.
      </>}
      {error && (<>
        <br />
        <Error>{error}</Error>
      </>)}
    </div>
  </>);
};
