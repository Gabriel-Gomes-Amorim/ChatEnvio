import "./styles.scss";

export interface ChatMessageProps {
  text: string;
  fromMe: boolean;
  senderName: string;
  createdAt?: Date;
}

export default function ChatMessage(props: ChatMessageProps) {
  const { text, createdAt, senderName, fromMe } = props;
  const messageClass = fromMe ? "sent" : "received";

  return (
    <div className={`message ${messageClass}`}>
      <div className="message__content">
        <div className="message__content__sender">{senderName}</div>
        <div className="message__content__text">{text}</div>
        <p className="message__content__at">
          {createdAt && toDateTime(new Date(createdAt).getTime())}
        </p>
      </div>
    </div>
  );
}

function toDateTime(secs: number) {
  const t = new Date(secs); // Epoc
  const hours = t.getHours();
  const minutes = t.getMinutes();

  return (
    <span>
      {hours > 9 ? hours : <>0{hours}</>}:
      {minutes > 9 ? minutes : <>0{minutes}</>}
    </span>
  );
}
