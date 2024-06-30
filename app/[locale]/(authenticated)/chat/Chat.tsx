"use client";

import { useEffect, useRef, useState } from "react";

import { Socket, io } from "socket.io-client";

let socket: Socket;

export type ContactType = {
  fullName: string;
  role: string;
  _id: string;
};

type ChatProps = {
  accessToken: string;
  contacts: ContactType[];
};

export default function Chat({ accessToken, contacts }: ChatProps) {
  const messageRef = useRef<HTMLInputElement>(null);

  const [activeContact, setActiveContact] = useState<ContactType | undefined>(
    undefined
  );

  const onContactSelect = (contact: ContactType) => {
    setActiveContact(contact);
  };

  useEffect(() => {
    socket = io(process.env.CHAT_API_URL ?? "http://127.0.0.1:3099", {
      autoConnect: false,
      auth: { token: accessToken },
    });

    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = messageRef.current?.value;
    if (message) {
      console.log("message", message);
      socket.emit("message", message);
      messageRef.current!.value = "";
    }
  };

  return (
    <div className="flex w-full h-full">
      <ContactList contacts={contacts} onContactSelect={onContactSelect} />
      <div className="flex flex-col w-full h-full bg-slate-200">
        <ChatWindow activeContact={activeContact} />
        <form onSubmit={handleSubmit} className="flex w-full">
          <input ref={messageRef} type="text" className="w-full" />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

type ContactListProps = {
  contacts: ContactType[];
  onContactSelect: (contact: ContactType) => void;
};
function ContactList({ contacts, onContactSelect }: ContactListProps) {
  return (
    <div className="flex flex-col h-full w-96 bg-slate-300">
      {contacts.map((contact) => (
        <div
          key={contact._id}
          onClick={() => onContactSelect(contact)}
          className="cursor-pointer"
        >
          {contact.fullName}
        </div>
      ))}
    </div>
  );
}

type ChatWindowProps = {
  activeContact?: ContactType;
};
function ChatWindow({ activeContact }: ChatWindowProps) {
  return (
    <div className="flex flex-col w-full h-full bg-slate-200">
      {activeContact ? (
        <ChatWindowHeader activeContact={activeContact} />
      ) : (
        <div className="flex w-full h-full">Select a contact</div>
      )}
    </div>
  );
}

type ChatWindowHeaderProps = {
  activeContact: ContactType;
};
function ChatWindowHeader({ activeContact }: ChatWindowHeaderProps) {
  return (
    <div className="flex w-full h-16 bg-slate-400">
      {activeContact.fullName} ({activeContact.role})
    </div>
  );
}
