import React, { useState, useEffect, useCallback } from "react";
import {
    CardContainer,
    CardHeader,
    CardBody,
    CardTitle,
    CardText,
    CardLink
} from "./styles";
import { useWallet } from "../../hooks/useWallet"
import { Link } from "react-router-dom";
import { getBalance, getRate, converter } from "../../lib/wallet"
import Spinner from "../../components/Loader";
import eye from "../../assets/icons/eye.svg";
const QRCode = require('qrcode.react');

const WalletCard  = ({ hideRecovery, deplay }) => {
    const { getWallet } = useWallet();
    const [ wallet , setWallet ] = useState(false);
    const [ loading , setLoading ] = useState(false);

    const onGetWallet = useCallback(async () => {
        setLoading(true);
        setTimeout(async () => {
            const wallet = await getWallet();
            let data = {
                bsv: 0,
                usd: 0
            };
            if (wallet) {
                let balance = await getBalance(wallet.currentBsvChildAddress);
                let rate = await getRate();
                if (balance && rate) {
                    data = {...wallet, ...converter(balance, rate)};
                }
            }
            setWallet(data);
            setLoading(false);
        }, deplay || 0);
    }, []);

    useEffect(() => {
        onGetWallet();
    }, []);

    return (
      <CardContainer>
          <CardHeader>
              Balance
          </CardHeader>
          <CardBody>
              { loading ? <Spinner /> : <>
                  <CardTitle>
                      ${ wallet && wallet.usd }
                  </CardTitle>
                  <CardText>
                      { wallet && wallet.bsv } BSV
                  </CardText>
                  { !hideRecovery &&
                  <CardLink>
                      <Link to={'/wallet/recovery'}>Recovery phrase <img className="eye-icon" src={ eye }/></Link>
                  </CardLink>
                  }
              </>
              }
          </CardBody>
      </CardContainer>
    );

}

export default WalletCard;
