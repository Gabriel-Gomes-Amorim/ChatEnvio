/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { Input, Button, Menu, Dropdown, message } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import "./styles.scss";
import ChatMessage, { ChatMessageProps } from "../components/ChatMessage";
import { useChat } from "../store/hooks";
import { useDispatch } from "react-redux";
import { initialFetchMessages } from "../store/routines/messages";
import { chatService } from "../api";
import { chatActions } from "../store/features/messages";

export default function ChatRoom() {
  const [messageText, setMessageText] = useState("");
  const { messages, randomName } = useChat();
  const dispatch = useDispatch();

  const dummy = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000");

    const heartbeat = () => {
      if (!socket) return;
      if (socket.readyState !== 1) return;
      socket.send(JSON.stringify({ ping: "Pong" }));
      setTimeout(heartbeat, 10000);
    };

    socket.onopen = function () {
      heartbeat();
      message.success("Seu chat está conectado! ✅");
    };
    const listener = (event: MessageEvent) => {
      const data = JSON.parse(event.data);

      if (data.type === "heartbeat" || data.message.senderName === randomName)
        return;
      dispatch(chatActions.add({ ...data.message, fromMe: false }));
    };

    socket.addEventListener("message", listener);
    socket.onclose = function () {
      message.success("Erro ao conectar (onclose)");
    };
    socket.onerror = function () {
      message.success("Erro ao conectar (onerror)");
    };

    return () => {
      socket?.close();
    };
  }, [randomName]);

  useEffect(() => {
    if (dummy.current) {
      dummy.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    dispatch(initialFetchMessages());
  }, []);

  const handleMessageOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();

    setMessageText(event.target.value);
  };

  const handleCreateMessage = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    if (messageText && dummy.current) {
      const newMessage: ChatMessageProps = {
        fromMe: true,
        senderName: randomName,
        text: messageText,
        createdAt: new Date(),
      };

      try {
        const res = await chatService.sendMessage(newMessage);

        dispatch(chatActions.add({ ...res, fromMe: true }));

        setMessageText("");

        dummy.current.scrollIntoView({ behavior: "smooth" });
      } catch (error) {
        console.error("Erro ao enviar a mensagem:", error);
        message.error("Erro ao enviar a mensagem. Tente novamente.");
      }
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => {}}>
        Edit group name
      </Menu.Item>
      <Menu.Item key="2" onClick={() => {}}>
        Change group icon
      </Menu.Item>
      <Menu.Item key="4" onClick={() => {}}>
        Exit group
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div className="chat-container">
        <div className="chat-container__background">
          <header style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="image">Fake</div>
            <Dropdown.Button
              style={{ width: 50 }}
              overlay={menu}
              icon={<MoreOutlined style={{ fontSize: "1.65rem" }} />}
            />
          </header>
          <main>
            <div>
              {messages.map((msg, index) => {
                const { senderName, text, createdAt } = msg;
                return (
                  <ChatMessage
                    key={index}
                    fromMe={senderName === randomName}
                    senderName={senderName === randomName ? "Eu" : senderName}
                    text={text}
                    createdAt={createdAt}
                  />
                );
              })}
              <div ref={dummy} />
            </div>
          </main>
          <footer>
            <form onSubmit={(e) => e.preventDefault()}>
              <Input
                type="text"
                value={messageText}
                placeholder="Type a message"
                onChange={handleMessageOnChange}
              />
              <Button onClick={handleCreateMessage}>Send message</Button>
            </form>
          </footer>
        </div>
      </div>
    </>
  );
}
