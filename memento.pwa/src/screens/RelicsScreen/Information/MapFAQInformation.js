import React from "react";

import './MapFAQInformation.scss';
import { MapInformationWrapper } from "screens/RelicsScreen/Information/styles";

const MapFAQInformation = () => {
  return (
    <MapInformationWrapper className={"map-faq-information"}>
      <h4>Welcome to Relica Maps</h4>
      <dl>
        <dd>A collection of three stones will grant you a limited edition NFT: The Bronze Medallion (Only 200 will exist) </dd>
        <dd>Collect three stones, post your collection on Relica & Twitter and tag @Relicaworld. The NFT will be airdropped to you upon release </dd>
        <dd>Stones are located in locked chests discoverable in cities. </dd>
      </dl>
      <h4>FAQ</h4>
      <dl>
        <dt>How do I unlock maps?</dt>
        <dd>Once purchased, select your country and start exploring the map for collectables.
        </dd>
        <dt>How do I drop Relics?</dt>
        <dd>Select the country you would like to drop Relics in and click on the map to Create a Relic.
        </dd>  
        <dt>How do I collect a Relic?</dt>
        <dd>First select your country. Travel to the location on your mobile device where the Relics are placed. Once within a certain distance of the Relic, your phone will collect the Relic and any Bitcoin attached.
          You will be able to create and explore Relics in your selected country.
        </dd>
        <dt>How do I view my Relics?</dt>
        <dd>Your collected Relics along with Bitcoin earned can be viewed in the Discovered menu.</dd>
        <dt>Where does my discovered Bitcoin go?</dt>
        <dd>Your discovered Bitcoin goes to the wallet you have paired your Relica account with.</dd>
        <dt>What if a Relic is placed in a part of town which is considered unfriendly?</dt>
        <dd>Do not attempt to retrieve the Relic. Contact the person that dropped the Relic and request they re-locate it.</dd>
        <dt>Troubleshooting</dt>
        <dd>
          If you are encountering problems with collecting Relics, attempt any or all of the
          following:
          <ul>
            <li style={{ color: "var(--blue)" }}>- Log out and back into Relica</li>
            <li>- Ensure location settings are switched on from your mobile device.</li>
            <li>- Ensure the location button within Relica maps is swithced on</li>
            <li>- Clear Relica.world website data on Mobile and Desktop .</li>
            <li>- Hard refresh webpage whilst on desktop mode (“Cmd + R” for Mac, “Ctrl + 5” for Windows.</li>
            <li>- Update mobile devices software to latest version.</li>
            <li>- If Safari is not displaying the map, use Google Chrome.</li>
            <li>- Increasing spend limit on your linked Bitcoin wallet.</li>
          </ul>
        </dd>
      </dl>
      <p>If you are still encountering issues, please reach out to us on Twitter.<br/>
        For more information relating to the maps functionality, please review our Terms & Conditions</p>
      <p>Stay safe and happy hunting!</p>
      <p className={"team-relica"}>Team Relica</p>
    </MapInformationWrapper>
  );
};

export default MapFAQInformation;
