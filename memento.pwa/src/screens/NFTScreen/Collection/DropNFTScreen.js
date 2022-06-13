import React, { useEffect, useState, useCallback } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import queryString from "query-string";
import Header from "../../../components/Header";
import MarketDetailItem from "../../../components/FeedItem/MarketDetailItem";
import NotFound from "../../../components/NotFound";
import NftService from "../../../services/NftService";

import {
    FullHeight,
    DropButton,
    InputGroupContainer
} from "./styles";
import Loader from "../../../components/Loader";
import Input from "../../../components/Form/Input";
import CurrencyConverter from "lib/currencyConverter";

const DropNFTScreen = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [relic, setRelic] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [note, setNote] = useState("");
    const [price, setPrice] = useState("");
    const location = useLocation();
    const {
      x: xProvided,
      y: yProvided,
    } = queryString.parse(location.search);

    const [walletInfo, setWalletInfo] = useState();
    const history = useHistory();

    const onNoteChange = (value) => {
        setNote(value);
    };

    const onPriceChange = (value) => {
        setPrice(value);
    };

    const DropNFT = async () => {
        setLoading(true);
        const params = {
            lat: yProvided,
            lon: xProvided,
            note: note,
            satoshis: await CurrencyConverter.convertToSatoshi(+price),
            nftId: id,
            mapDrop: true
        };

        const res = await NftService.dropNFT(params, walletInfo.password);
        if (res && !res.hasError) {
            setLoading(false);
            return history.push('/nft/satchel');
        }
    }

    const loadNFTInfo = useCallback(async () => {
        const walletInfo = JSON.parse(localStorage.getItem('relica_wallets'));
        setWalletInfo(walletInfo);

        let response = await NftService.getNFTById(id, walletInfo.password);
        if (response.hasError) {
            setNotFound(true);
        } else {
            const splittedRarity = response.data.rarity.split('/');
            const relic = {
                ...response.data,
                index: splittedRarity[0],
                total: splittedRarity[1]
            }
            setRelic(relic);
        }
    }, []);

    useEffect(() => {
        loadNFTInfo();
    }, []);

    if (notFound) {
        return <NotFound />;
    }

    return <FullHeight>
        <Header
            hasBack
            title="Drop NFT"
        />
        {relic
            ? <>
                <MarketDetailItem
                    key={id}
                    relic={relic}
                    border={false}
                    canNavigate={false}
                    isBig={true}
                />

                <InputGroupContainer>
                    <div className="relic-info">
                        <span>#{relic.index}</span> ({relic.rarity})
                    </div>
                    <div style={{ display: "grid" }}>
                        <Input name="note-value"
                            type="text"
                            placeholder="Say something about this post"
                            value={note}
                            inputClassName="text-left"
                            onChange={(val) => onNoteChange(val)}
                        />
                    </div>
                    <Input name="price-value"
                        type="number"
                        placeholder="$ Price"
                        value={price}
                        inputClassName="text-left"
                        onChange={(val) => onPriceChange(val)}
                    />
                    <DropButton className="primary"
                        style={{ marginTop: "20px" }}
                        onClick={() => {
                            DropNFT();
                        }}>
                        Place on map
                    </DropButton>
                </InputGroupContainer>
            </>
            : <Loader style={{ position: "absolute", left: "50%", top: "50%" }} />
        }
    </FullHeight>;
}

export default DropNFTScreen;
