import React, { useCallback, useContext, useEffect, useState } from "react";
import { useComments } from "../../../hooks/useComments";
import { usePayments } from "../../../hooks/usePayments";
import CommentItem from "../../CommentItem";
import TextArea from "../../Form/TextArea";
import { ErrorNotification } from "../../../screens/NewPostScreen/styles";
import {
    CommentInputContainer,
    CommentsContainer,
    DesktopInputContainer,
    PhoneInputContainer,
    PostCommentLink, ViewMore,
} from "./styles";
import { DarkModeContext } from "../../../hooks/useDarkMode";

export default function Comments(
    {
        id,
        username,
        onPostFlow,
        hideInput = false,
        numberOfComments = 2,
        commentsForDesktop
    }
) {
    const {
        comments,
        fetchComments,
        fetchCommentsForDesktop,
        addEphemeralComment,
        setEphemeralCommentTxId,
        removeEphemeralComment,
    } = useComments();

    const { pay } = usePayments();

    const [viewMore, setViewMore] = useState(null);
    useEffect(() => {
        if (viewMore === null && comments.length > 0) {
            setViewMore(comments.length <= numberOfComments);
        }
    }, [comments, comments.length]);

    const updateComments = useCallback(() => {
        fetchComments(id);
    }, [id, fetchComments]);

    useEffect(() => {
        // Load comments by post id mobile and desktop
        // Load comments by post id for mobile and desktop
        if (window.mobileCheck()) {
            updateComments();
        } else {
            fetchCommentsForDesktop(id, commentsForDesktop);
        }
    }, []);

    const post = useCallback(text => {
        addEphemeralComment({ contentId: id, text });
        onPostFlow("started");

        pay({
            type: "COMMENT",
            data: {
                contentId: id,
                comment: text,
            },
            username,
            onPayment: txId => {
                setEphemeralCommentTxId({ contentId: id, text, txId });
                updateComments();
            },
            onError: () => {
                removeEphemeralComment({ contentId: id, text });
                onPostFlow("error");
            },
            onMoneyButtonModalHide: () => {
                removeEphemeralComment({ contentId: id, text });
                onPostFlow("error");
            },
        });
    }, [addEphemeralComment, updateComments, username, onPostFlow, comments]);

    // HERE
    const displayComments = React.useCallback(() => {
        const displayComments = commentsForDesktop && commentsForDesktop.length > 0 ? commentsForDesktop : comments;
        if (!viewMore) {
            return displayComments.slice(0, numberOfComments).map((comment, index) => <CommentItem key={index} id={id} comment={comment} />);
        } else {
            return displayComments.map((comment, index) => <CommentItem key={index} id={id} comment={comment} />);
        }
    }, [comments, commentsForDesktop, viewMore, numberOfComments]);

    return (
        <CommentsContainer>
            {!hideInput && (
                <PhoneInputContainer>
                    <CommentInput post={post}/>
                </PhoneInputContainer>
            )}
            <div className="mb-5">
                {displayComments()}
            </div>
            {viewMore === false && (
                <ViewMore onClick={() => setViewMore(true)}>
                    More
                </ViewMore>
            )}
            {!hideInput && (
            <DesktopInputContainer>
                <CommentInput post={post}/>
            </DesktopInputContainer>
            )}
        </CommentsContainer>
    );
}

function CommentInput({ post }) {
    const DM = useContext(DarkModeContext);
    const [text, setText] = useState();
    const [textDisabled, setDisabled] = useState(false);
    const [error, setError] = useState(null);

    const onPost = useCallback(text => {
        setText("");
        post(text);
    }, [setText, post]);

    const setCommentText = (value) => {
        // this is to calculate the bytes , the size cannot exceed 512 on the backend
        const encodedTextLength = new TextEncoder().encode(value).length;

        const isTooLong = encodedTextLength > 200 || value.length > 150;
        if (isTooLong) {
            setError("Too many characters");
            setDisabled(true);
        }
        if (!isTooLong && value.length < 151) {
            if (error) {
                setDisabled(false);
                setError(null);
            }
            setText(value);
        }
    };

    return (
        <div className="mt-3 mb-3">
            {error && <ErrorNotification>{error}</ErrorNotification>}
            <CommentInputContainer>
                <TextArea
                    placeholder="Add comment..."
                    value={text}
                    onChange={value => setCommentText(value)}
                    style={{ background: DM.darkMode ? `var(--black)` : 'white' }}
                />
                <PostCommentLink
                    onClick={() => {
                        if (!textDisabled && text && text.length > 0) {
                            onPost(btoa(unescape(encodeURIComponent(text))));
                        }
                    }}
                >
                    Post
                </PostCommentLink>
            </CommentInputContainer>
        </div>
    );
}
