import React, { useCallback, useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import { useAccount } from "../../hooks/useAccount";
import { useMoneyButton } from "../../hooks/useMoneyButton";
import { useHandCash } from "../../hooks/useHandCash";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import CreateUserScreen from "../CreateUserScreen";
import { LogoName } from "../SplashScreen/styles";
import { FullHeight, Heading, Paragraph, ResponsiveButtonContainer, Section, Tile } from "./styles";
import { getUnixTime } from "../../lib/dateTime";

export default ({ provider, rejected = false }) => {
  const history = useHistory();
  const { handleAuthorizationResponse: authMb, user: userMb } =
    useMoneyButton();
  const { handleAuthorizationResponse: authHc, user: userHc } = useHandCash();
  const { login, signup, hydrateMbToken, setHcToken } = useAccount();
  const [state, setState] = useState("start");
  const [referrerUserId, setReferrerUserId] = useLocalStorage(
    "referrer_user_id",
    null,
    false
  );
  const [isInAddFlow] = useLocalStorage("login_add_flow", null, true);
  const [, setTokenTimestamp] = useLocalStorage(
    "token_timestamp",
    null
  );

  const redirectBack = useCallback(() => {
    if (referrerUserId) {
      history.push("/join/" + referrerUserId);
    } else {
      history.push("/auth");
    }
  }, [referrerUserId, history]);

  let tokenHc = null;
  if (provider === "handcash" && !rejected && state !== "error") {
    const search = history.location.search;
    const params = new URLSearchParams(search);
    tokenHc = params.get("authToken");
    if (!tokenHc) {
      setState("error");
    }
  }

  const onSave = useCallback(
    async (username, profilePicLocation) => {
      const response = await signup({
        provider,
        username,
        profilePicLocation,
        id: provider === "moneybutton" ? userMb.profile.id : userHc.paymail,
        authToken: provider === "moneybutton" ? userMb.accessToken : tokenHc,
        referrerUserId
        // exclusivity,
        // pricePerLike
        // adult
      });
      if (!response.hasError) {
        // add the time we're getting the token
        setTokenTimestamp(getUnixTime());

        if (provider === "handcash") {
          setHcToken(tokenHc);
        }
        history.push("/welcome");
      } else {
        switch (response.status) {
          case 401:
            setReferrerUserId(null);
            history.push("/");
            break;
          case 404:
            // Show register with Relica screen
            setState("NotFound");
            break;
          case 409:
            // stay on the page
            setState("Create");
            break;
          default:
            setState("error");
            break;
        }
      }
      return response;
    },
    [
      userMb,
      userHc,
      history,
      tokenHc,
      signup,
      setHcToken,
      setReferrerUserId,
      setState
    ]
  );

  if (
    referrerUserId !== null &&
    (typeof referrerUserId !== "string" ||
      referrerUserId.length < 36 ||
      referrerUserId.indexOf('"') !== -1) &&
    state !== "error"
  ) {
    // the referrer user ID hasn't been stored properly
    // reject it
    setState("error");
  }

  useEffect(() => {
    if (rejected) {
      redirectBack();
    } else {
      if (provider === "moneybutton") {
        authMb(hydrateMbToken);
      } else {
        authHc(tokenHc, () => {
          alert(
            "Unfortunately, we couldn't log you in using HandCash.\n" +
            "Please try again, and if this doesn't work, please let us know:\n" +
            "@relica.world on Instagram or @relicaworld on Twitter."
          );
          redirectBack();
        });
      }
    }
  }, []);

  useEffect(() => {
    if (state !== "start" || rejected) {
      return;
    }
    if (provider === "moneybutton" && !userMb) {
      return;
    }
    if (provider === "handcash" && !userHc) {
      return;
    }
    (async function () {
      setState("processing");

      let id;
      if (provider === "moneybutton") {
        id = userMb.profile.id;
      } else if (isInAddFlow) {
        id = undefined;
      } else {
        id = userHc.paymail;
      }

      const response = await login({
        provider,
        authToken: provider === "moneybutton" ? userMb.accessToken : tokenHc,
        id
      });

      if (response.status === 200 || response.status === 201) {
        setState("Linked");

        // add the time we're getting the token
        setTokenTimestamp(getUnixTime());

        if (provider === "handcash") {
          setHcToken(tokenHc);
        }
        history.push(isInAddFlow ? "/settings" : "/");
      } else {
        if (response.status === 403) {
          setState("Create");
        } else if (response.status === 401) {
          history.push("/");
        } else if (response.status === 404) {
          if (referrerUserId !== null) {
            setState("Create");
          } else {
            setState("NotFound");
          }
        } else {
          setState("");
        }
      }
    })();
  }, [setState, login, userMb, userHc, tokenHc]);

  if (rejected) {
    if (referrerUserId) {
      return <Redirect to={"/join/" + referrerUserId}/>;
    } else {
      return <Redirect to="/auth"/>;
    }
  }

  if (state === "Create") {
    return <CreateUserScreen onSave={onSave}/>;
  }

  if (state === "NotFound") {
    return (
      <FullHeight>
        <Tile>
          <LogoName/>
          <Section backgroundcolor="var(--blue)">
            <div className="container">
              <div className="row">
                <div className="col-sm-12 col-md-12 d-flex flex-column justify-content-center">
                  <div className="text-center text-sm-left">
                    <Heading
                      size={22}
                      color="var(--white)"
                      className="mb-5 text-center"
                    >
                      You're almost there!
                    </Heading>

                    <Paragraph size={16} color="var(--white)" className="mb-4">
                      Relica is still in its private beta.
                    </Paragraph>
                    <Paragraph size={16} color="var(--white)" className="mb-4">
                      Please reach out to us on Twitter or Instagram with your
                      Money Button ID to request access.
                    </Paragraph>
                  </div>
                </div>
              </div>
            </div>
          </Section>
          <ResponsiveButtonContainer style={{ width: "100%" }}>
            <Button
              className="mb-4 primary"
              onClick={() =>
                window.open("https://www.instagram.com/relica.world/")
              }
              target="_blank"
              style={{
                padding: "16px",
                background: "white",
                color: "#10a5f5"
              }}
            >
              Visit us on Instagram
            </Button>
            <Button
              onClick={() => window.open("https://twitter.com/relicaworld")}
              className="mb-4 primary"
              style={{
                padding: "16px",
                background: "white",
                color: "#10a5f5"
              }}
            >
              Visit us on Twitter
            </Button>
          </ResponsiveButtonContainer>
        </Tile>
      </FullHeight>
    );
  }

  if (state === "error") {
    return (
      <div className="p-5 text-center">
        <h3 className="mb-4">Sorry, we couldn't show this page</h3>
        <p>
          Please try again. If the problem persists, feel free to contact us on
          Twitter so we can look into this problem.&nbsp;
          <Link to="/">Go back to Relica</Link>
        </p>
      </div>
    );
  }

  return (
    <FullHeight>
      <Loader
        style={{
          alignItems: "center",
          display: "flex",
          height: "100%",
          flexDirection: "column",
          justifyContent: "center"
        }}
      />
    </FullHeight>
  );
};
