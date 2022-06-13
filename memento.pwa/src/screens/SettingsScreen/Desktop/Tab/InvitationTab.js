import invitationImg from "assets/images/invitation_white.png";
import { ReactComponent as CopyIcon } from "assets/icons/Relica_copy.svg";
import GenericMessage from "components/Toasts/GenericMessage";
import React from "react";
import useToast from "hooks/useToast";
import {
  CopyButton, CopyLink,
  InvitationImg, InvitationTitle, LinkInput,
  TabContentWrapper,
  TweetButton,
  TwitterText
} from "screens/SettingsScreen/Desktop/Tab/styles";

const InvitationTab = ({ currentUser }) => {
  const { showToast } = useToast();

  const inviteLink =
    currentUser &&
    window.location.origin +
    "/join/" +
    encodeURIComponent(currentUser.id) +
    "?username=" +
    encodeURIComponent(currentUser.username);
  const twitterText = encodeURIComponent(
    "Post photos. Make money. Maintain ownership.\n\n" +
    "Join the @Relicaworld revolution and experience an exciting new photo sharing platform built on #Bitcoin" +
    " where you generate income from your content.\n\n" +
    "#Relica #BSV #Bitcoin #Photos 📸🌎🌸"
  );

  const copyHandler = () => {
    window.navigator.clipboard.writeText(inviteLink);
    showToast(<GenericMessage text="Copied to clipboard"/>);
  }

  return (
    <>
      <div className={"d-flex justify-content-end"}>
        <TweetButton target={"_blank"} href={`https://twitter.com/intent/tweet?text=${twitterText}&url=${encodeURIComponent(
          inviteLink
        )}`}>Tweet</TweetButton>
      </div>
      <TabContentWrapper>
        <div className={"mb-5 d-flex"}>
          <InvitationImg src={invitationImg} alt="Invitation"/>
        </div>
        <TwitterText className="mb-5">
          Invite friends with your link!
          <br/>
          Be rewarded referral bonuses whenever they earn.
        </TwitterText>
        <div className="mb-5">
          <CopyLink>
            <CopyIcon onClick={() => copyHandler()}/>
            <LinkInput
              readOnly={true}
              onBlur={(e) => {
                const input = e.target;
                input.scrollLeft = 0;
              }}
              value={inviteLink}
            />
          </CopyLink>
        </div>
        <div className={"mb-5 text-align-center d-flex"}>
          <CopyButton onClick={() => copyHandler()}>Copy</CopyButton>
        </div>
      </TabContentWrapper>
    </>
  );
};

export default InvitationTab;
