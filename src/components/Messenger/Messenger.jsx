import { useRef, useState } from 'react';
import css from './Messenger.module.css';
import { toast } from "react-toastify";

const Messenger = () => {
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState('');
  const [connected, setConnected] = useState(false);
  const socket = useRef(null);

  function connect() {
    socket.current = new WebSocket('wss://mt-lab2-server.onrender.com');
    socket.current.onopen = () => {
      setConnected(true);
      const message = {
        event: 'connection',
        username,
        id: Date.now(),
      };
      socket.current.send(JSON.stringify(message));
    };
    socket.current.onmessage = event => {
      const message = JSON.parse(event.data);
      setMessages(prev => [message, ...prev]);
    };
    socket.current.onclose = () => {
      setUsername('')
      setConnected(false);
    }
    socket.current.onerror = () => {
      toast.error('Sorry, server doesn\'t respond, try again later!')
      console.log('Socket error');
      return;
    };
  }

  function disconnect() {
    const message = {
      event: 'disconnection',
      username,
      id: Date.now(),
    };
    socket.current.send(JSON.stringify(message));
    socket.current.close()
  }

  const sendMessage = async () => {
    const message = {
      username,
      message: value,
      id: Date.now(),
      event: 'message',
    };
    socket.current.send(JSON.stringify(message));
    setValue('');
  };

  if (!connected) {
    return (
      <div className={css.container}>
        <div className={css.form}>
          <input
            className={css.input}
            value={username}
            onChange={e => setUsername(e.target.value)}
            type="text"
            placeholder="Enter name"
          />
          <button onClick={connect} className={css.btn}>Enter</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className={css.container}>
        <div>
          <div className={css.form}>
            <input
              value={value}
              onChange={e => setValue(e.target.value)}
              type="text"
              className={css.input}
            />
            <button type="button" onClick={sendMessage} className={css.btn}>Send</button>
            <button type="button" onClick={disconnect} className={css.btnLeave}>Leave</button>
          </div>
        </div>
      </div>
      <div className={css.messagesContainer}>
        {messages.map(mess => {
          if (mess.event === 'connection') {
            return <div key={mess.id}>
              <div className={css.connectionMessage}>
                User {mess.username} connected
              </div>
            </div>
          } else if (mess.event === 'disconnection') {
            return <div key={mess.id}>
              <div className={css.connectionMessage}>
                User {mess.username} left
              </div>
            </div>
          } else {
            return <div key={mess.id}>
              <div className={css.messageWrapper}>
                <div className={css.userName}>
                  {mess.username}
                </div>
                <div className={css.message}>
                  <p className={css.messageText}>
                    {mess.message}
                  </p>
                </div>
              </div>
            </div>
          }
        })}
      </div>
    </div>
  )
}

export default Messenger;
