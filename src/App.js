import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, onValue, ref, push, set } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_L3WDYQzxSQ1nQDXa5IRW9BmmYGTSL4g",
  authDomain: "chat-app-1f194.firebaseapp.com",
  projectId: "chat-app-1f194",
  storageBucket: "chat-app-1f194.appspot.com",
  messagingSenderId: "515848706689",
  appId: "1:515848706689:web:2db6f4841f63e26db7cb80",
  measurementId: "G-SNN5EEX7JT",
  databaseURL: 'https://chat-app-1f194-default-rtdb.asia-southeast1.firebasedatabase.app/'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

const messagesDiv = document.getElementById('messagesList')

const styles = {
  chatbox: {
    height: '600px',
    width: '1024px',
    background: 'white',
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  textInput: {
    height: 50,
    fontSize: 24,
    paddingLeft: 30,
    width: '100%'
  },
  messageListWrapper: {
    overflow: 'scroll', 
    height: '525px',
    paddingBottom: '10px'
  },
  messageList: {
    listStyle: 'none',
    textAlign: 'left',
  },
  message: {
    paddingTop: 10
  },
  inputForm: {
    overflow: 'hidden',
    height: 55
  }
}

function App() {
  const [messages, setMessages] = useState([]);

  const [userInput, setUserInput] = useState('');

  const [nickname, setNickname] = useState('');

  useEffect(() => {
    const messagesRef = ref(database, 'messages');
    onValue(messagesRef, snapshot => {
      const data = snapshot.val();
      setMessages(Object.values(data));
      console.log(data)
    })
  }, [])

  const handleUserInput = (event) => {
    event.preventDefault();
    
    let name = nickname;
    if (name === '') {
      name = prompt('What is your nickname?', '')
      setNickname(name)
    }

    const postListRef = ref(database, 'messages');
    const newPostRef = push(postListRef);
    set(newPostRef, name + ': ' + userInput)

    setUserInput('');
  }

  return (
 <div className="App">
      <header className="App-header">
        <div style={styles.chatbox}>
          <div id="messagesList" style={styles.messageListWrapper}>  
            <ul style={styles.messageList}>

              { messages.map(message => 
                <li style={styles.message}>{message}</li>
              )}
             
            </ul>
          </div>
          <form style={styles.inputForm} onSubmit={handleUserInput}>
            <input value={userInput} 
                   onChange={event => setUserInput(event.target.value)} 
                   style={styles.textInput} 
                   type="text" 
                   placeholder='Hi!'/>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
