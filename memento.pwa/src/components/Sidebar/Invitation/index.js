import React from "react";
import { ReactComponent as CopyIcon } from "assets/icons/Relica_copy.svg";
import GenericMessage from "components/Toasts/GenericMessage";
import useToast from "hooks/useToast";
import { CopyLink, LinkInput, ReservedText, SocialNetworkLink } from "components/Sidebar/Invitation/styles";
import { ReactComponent as Instagram } from "assets/icons/Instagram icon.svg";
import { Twitter } from "react-feather";

const Invitation = ({ currentUser }) => {
  const { showToast } = useToast();
  const inviteLink = currentUser && window.location.origin + "/join/" + encodeURIComponent(currentUser.id)
    + "?username=" + encodeURIComponent(currentUser.username);

  return (
    <div className={"pt-5"}>
      <CopyLink>
        <CopyIcon
          onClick={() => {
            window.navigator.clipboard.writeText(inviteLink);
            showToast(<GenericMessage text="Copied to clipboard"/>);
          }}/>
        <LinkInput
          readOnly={true}
          onBlur={e => {
            const input = e.target;
            input.scrollLeft = 0;
          }}
          value={inviteLink}
        />
      </CopyLink>
      <div className={"d-flex mt-5 align-items-center"}>
        <SocialNetworkLink href="https://www.instagram.com/relica.world/">
          <Instagram className="mr-4"/>
        </SocialNetworkLink>
        <SocialNetworkLink href="https://twitter.com/relicaworld">
          <Twitter className="mr-4"/>
        </SocialNetworkLink>
      </div>
      <div className={"d-flex mt-5 align-items-center"}>
        <ReservedText>2021 Relica Pty Ltd. All rights reserved</ReservedText>
      </div>
    </div>
  );
};

export default Invitation;
