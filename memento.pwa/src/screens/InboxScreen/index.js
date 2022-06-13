import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import Header from "../../components/Header";
import useMyProfile from "../../hooks/useMyProfile";
import Spinner from "../../components/Loader";
import UserItem from "../../components/UserItem";
import SearchBar from "../SearchScreen/SearchBar";
import styled from "styled-components";
import Input from "../../components/Form/Input";
import { Send } from "react-feather";
import { useParams } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
import ContentService from "../../services/ContentService";
import { fetchUserById, UserRepository } from "api";
import Avatar from "../../components/Avatar";
import firebase from "firebase/app";

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Loader = styled.div`
  .lds-ring {
    padding-left: 40% !important;
    padding-top: 50%;
  }
`;

const NoResults = styled.div`
  padding: 10px;
  color: lightgrey;
`;

const MessageContainer = styled.div`
  height: 87vh;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #f7f7f7;

  .messages {
    overflow-y: scroll;
  }

  .message_row {
    width: 100%;
    display: flex;
  }

  .message_row_2 {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .current_user_bubble {
    width: 200px;
    min-height: 45px;
    background-color: #ffffff;
    text-align: left;
    margin-bottom: 15px;
    border: 1px solid #10a5f5;
    border-radius: 12px;
    box-shadow: rgba(1, 1, 1, 0.1) 0px 1px 6px 0px;
  }

  .other_user_bubble {
    color: white;
    float: right;
    width: 200px;
    min-height: 45px;
    background-color: #10a5f5;
    text-align: left;
    margin-bottom: 15px;
    border: 1px solid #ffffff;
    border-radius: 12px;
    box-shadow: rgba(1, 1, 1, 0.1) 0px 1px 6px 0px;
  }

  .message {
    padding: 20px 5px 0px 10px;
  }

  .time {
    padding: 5px;
    float: right;
    font-size: 10px !important;
  }

  .message_input_container {
    margin-bottom: 5vh;
    svg {
      float: right;
      margin-top: 4px;
    }
  }

  .message_input {
    width: 90%;
    display: inline-block;
    background-color: white;
    border: 1px solid #f1f1f1;
    border-radius: 25px;

    div {
      border-bottom: none;
    }

    input {
      padding-left: 10px;
    }
  }
`;

export default () => {
  const { id } = useParams();
  const [chats, setChats] = useState([]);
  const [singleMessageUser, setSingleMessageUser] = useState(null);
  const [singleMessageUserName, setSingleMessageUserName] = useState(null);
  const [otherUserProfilePic, setOtherUserProfilePic] = useState(null);
  const [newMessageView, setNewMessageView] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [usersSearchText, setUsersSearchText] = useState("");
  const [searchedUsersTerm, setSearchedUsersTerm] = useState("");
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const { profile } = useMyProfile();

  const debouncedSearchTerm = useDebounce(usersSearchText, 500);

  useEffect(() => {
    if (id) {
      UserRepository.getByObj({ username: id }).then(async (user) => {
        setSingleMessageUser(user.id);
        setSingleMessageUserName(user.username);
        setOtherUserProfilePic(user.profilePic);
      });
    } else {
      setSingleMessageUser(null);
      setSingleMessageUserName(null);
      setOtherUserProfilePic(null);
    }
  }, [id]);

  useEffect(() => {
    if (profile && profile.id) {
      loadChats();
    }
  }, [profile]);

  useEffect(
    () => {
      // Make sure we have a value (user has entered something in input)
      if (debouncedSearchTerm) {
        // Set isSearching state
        setLoading(true);

        // Load accounts
        loadUsers(debouncedSearchTerm);
      } else {
        // No search results
      }
    },
    // This is the useEffect input array
    // Our useEffect function will only execute if this value changes ...
    // ... and thanks to our hook it will only change if the original ...
    // value (searchTerm) hasn't changed for more than 500ms.
    [debouncedSearchTerm]
  );

  const loadUsers = useCallback((debouncedSearchTerm) => {
    if (
      debouncedSearchTerm.trim() === searchedUsersTerm.trim() ||
      debouncedSearchTerm.length < 3
    ) {
      setLoading(false);
      return;
    }

    ContentService.exploreUsers(debouncedSearchTerm).then((response) => {
      if (response.data.users) {
        const userProfileRequests = response.data.users.map((user) => {
          fetchUserById(user.userId);
        });
        Promise.all(userProfileRequests).then(() => {
          setUsers(response.data.users);
          setSearchedUsersTerm(debouncedSearchTerm);
          setLoading(false);
        });
      } else {
        setUsers([]);
        setSearchedUsersTerm(debouncedSearchTerm);
        setLoading(false);
      }
    });
  });

  const loadChats = useCallback(() => {
    if (profile && profile.id) {
      setLoading(true);
      firebase
        .firestore()
        .collection("chats")
        .where("users", "array-contains", profile.id)
        .onSnapshot(async (res) => {
          const chats = res.docs.map((doc) => doc.data());
          setChats(chats);
          setLoading(false);
        });
    }
  }, [profile]);

  const onMessageClick = (friendId, profilePic, friendUsername) => {
    setSingleMessageUser(friendId);
    setSingleMessageUserName(friendUsername);
    messageRead(friendId);
    setNewMessageView(false);
    setOtherUserProfilePic(profilePic);
    history.push(`/inbox/${friendUsername}`);
  };

  const newChatClick = () => {
    setNewMessageView(true);
  };

  const sendMessage = (isNewMessage) => {
    const docKey = buildDocKey(singleMessageUser);

    // Create document structure
    // If it is a new chat
    if (isNewMessage) {
      createNewChat(profile.id, messageText, docKey, singleMessageUser);
    } else {
      updateChat(profile.id, messageText, docKey);
    }

    setMessageText("");
  };

  const updateChat = (userId, message, dockey) => {
    firebase
      .firestore()
      .collection("chats")
      .doc(dockey)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          sender: userId,
          message: message,
          timestamp: Math.round(Date.now() / 1000),
        }),
        recieverHasRead: false,
      });
  };

  const createNewChat = (userId, message, dockey, sendTo) => {
    firebase
      .firestore()
      .collection("chats")
      .doc(dockey)
      .set({
        messages: [
          {
            message: message,
            sender: userId,
            timestamp: Math.round(Date.now() / 1000),
          },
        ],
        users: [userId, sendTo],
        recieverHasRead: false,
      });
  };

  const messageRead = (friendId) => {
    const docKey = buildDocKey(friendId);

    var chat = chats.find((chat) => chat.users.includes(friendId));
    if (
      chat &&
      chat.recieverHasRead === false &&
      chat.messages[chat.messages.length - 1].sender !== profile.id
    ) {
      firebase
        .firestore()
        .collection("chats")
        .doc(docKey)
        .update({ recieverHasRead: true });
    }
  };

  const buildDocKey = (friendId) => [profile.id, friendId].sort().join(":");

  const onTextChange = (value) => {
    setSearchText(value.replace(/[^\w\s]/gi, ""));
  };

  const onUserSearchTextChange = (value) => {
    setUsersSearchText(value.replace(/[^\w\s]/gi, ""));
  };

  // render methods
  const renderDate = (timestamp) => {
    if (!timestamp) {
      return "";
    }

    var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(timestamp);

    var isPM = d.getHours() >= 12;
    return `${d.toLocaleTimeString().split(":").slice(0, -1).join(":")}${
      isPM ? "pm" : "am"
    }`;
  };

  const renderLoader = () => {
    return (
      <>
        <Loader>
          <Spinner></Spinner>
        </Loader>
      </>
    );
  };

  const renderAllMessages = useCallback(() => {
    // All Messages view
    var filteredChats = chats.filter((chat) => {
      var userName = chat.users.find((user) => user !== profile.id);
      return userName.toLowerCase().includes(searchText.toLowerCase());
    });

    var messages = filteredChats.map((chat) => (
      <UserItem
        key={chat.users.find((user) => user !== profile.id)}
        userId={chat.users.find((user) => user !== profile.id)}
        unreadMessages={
          chat.recieverHasRead === false &&
          chat.messages[chat.messages.length - 1].sender !== profile.id
        }
        showFollow={false}
        onClickOverride={onMessageClick}
        showLink={false}
      />
    ));

    return (
      <>
        <div className="mb-4">
          <SearchBar onTextChange={onTextChange} searchTerm={searchText} />
        </div>
        {loading ? loading : messages}
      </>
    );
  }, [chats, loading, searchText, profile]);

  const renderNewMessageView = () => {
    // Cant talk to your self
    var filteredUsers = users.filter((j) => j.username !== profile.username);
    return (
      <>
        <div className="mb-4">
          <SearchBar
            onTextChange={onUserSearchTextChange}
            searchTerm={usersSearchText}
          />
        </div>
        {loading ? (
          renderLoader()
        ) : (
          <div>
            {filteredUsers && filteredUsers.length ? (
              filteredUsers.map((user) => (
                <UserItem
                  key={user.username}
                  username={user.username}
                  showFollow={false}
                  onClickOverride={onMessageClick}
                  showLink={false}
                />
              ))
            ) : (
              <NoResults>No results</NoResults>
            )}
          </div>
        )}
      </>
    );
  };

  const renderSingleMessageView = () => {
    var chat = chats.find((chat) => chat.users.includes(singleMessageUser));

    if (loading) {
      return renderLoader();
    }

    var messages = null;
    if (chat && chat.messages.length) {
      messages = chat.messages.map((message, index) => (
        <div
          key={`message_${index}`}
          className={`${
            message.sender == profile.id ? "message_row" : "message_row_2"
          }`}
        >
          {message.sender === profile.id && (
            <Avatar
              url={profile.profilePic}
              height={30}
              width={30}
              className="mr-3"
            />
          )}
          <div
            className={`${
              message.sender == profile.id
                ? "current_user_bubble"
                : "other_user_bubble"
            }`}
          >
            <div className="message">{message.message}</div>
            <div className="time">{renderDate(message.timestamp)}</div>
          </div>
          {message.sender !== profile.id && (
            <Avatar
              url={otherUserProfilePic}
              height={30}
              width={30}
              className="mr-3"
            />
          )}
        </div>
      ));
    } else if (chat) {
      messages = (
        <div style={{ flex: "1" }}>
          {`${chat.messages.sender} : ${chat.messages.message}`}
        </div>
      );
    }

    return (
      <>
        <MessageContainer>
          <div id="messages" className="messages">
            {messages}
          </div>
          <div className="message_input_container">
            <div className="message_input">
              <Input
                key="message-text"
                name="message-text"
                placeholder="Type a message"
                onChange={(val) => setMessageText(val)}
                value={messageText}
              />
            </div>
            <Send
              key="send_icon"
              size="35"
              onClick={() => sendMessage(messages ? false : true)}
              color="#10A5F5"
              className="send_icon"
              style={{ transform: "rotate(40deg)" }}
            />
          </div>
        </MessageContainer>
      </>
    );
  };

  var content = null;
  var header = null;

  if (newMessageView) {
    header = <Header hasBack backTitle={"Messages"} title={""} spacer={true} />;
    content = renderNewMessageView();
  } else if (singleMessageUser) {
    header = (
      <Header
        hasBack
        backTitle={singleMessageUserName}
        profilePic={otherUserProfilePic}
        spacer={otherUserProfilePic ? true : false}
      />
    );
    content = renderSingleMessageView();
  } else {
    header = <Header hasBack title={""} newChatCallBack={newChatClick} />;
    content = renderAllMessages();
  }

  return (
    <TopContainer>
      {header}
      {content}
    </TopContainer>
  );
};
