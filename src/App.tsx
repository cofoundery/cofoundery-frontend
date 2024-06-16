import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// https://developers.kakao.com/docs/latest/ko/javascript/getting-started
// https://developers.kakao.com/docs/latest/ko/kakaologin/js
function App() {
  const [count, setCount] = useState(0)

  const jsKey = 'eeabbb7674231ca871214f0126057186';
  console.log('initialized', window.Kakao.isInitialized());
  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(jsKey);
  }

  function loginWithKakao() {
    const redirectUri = 'http://localhost:5173/auth/success';
    window.Kakao.Auth.authorize({
      redirectUri,
    });
  }

  displayToken()

  function displayToken() {
    const token = getCookie('authorize-access-token');

    if (token) {
      window.Kakao.Auth.setAccessToken(token);
      window.Kakao.Auth.getStatusInfo()
        .then(function (res) {
          if (res.status === 'connected') {
            document.getElementById('token-result').innerText
              = 'login success, token: ' + window.Kakao.Auth.getAccessToken();
          }
        })
        .catch(function (err) {
          window.Kakao.Auth.setAccessToken(null);
        });
    }
  }

  function getCookie(name: string) {
    const parts = document.cookie.split(name + '=');
    if (parts.length === 2) {
      return parts[1].split(';')[0];
    }
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo"/>
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo"/>
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <a id="kakao-login-btn" onClick={() => loginWithKakao()}>
        <img src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg" width="222"
             alt="카카오 로그인 버튼"/>
      </a>
      <p id="token-result"></p>
    </>
  )
}

export default App
