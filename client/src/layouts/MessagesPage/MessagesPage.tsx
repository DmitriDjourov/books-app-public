import { useState } from "react";
import NewMessage from "./components/NewMessage";
import Messages from "./components/Messages";

function MessagesPage() {

  const [messagesClick, setMessagesClick] = useState<boolean>(false);

  return (
    <div className="container">
      <div className="mt-3 mb-2">
        <nav>
          <div
            className="nav nav-tabs"
            id="nav-tab"
            role="tablist"
          >
            <button
              onClick={() => setMessagesClick(false)}
              className="nav-link active"
              id="nav-send-message-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-send-message"
              type="button"
              role="tab"
              aria-controls="nav-send-message"
              aria-selected="true"
            >
              Задать вопрос
            </button>
            <button
              onClick={() => setMessagesClick(true)}
              className="nav-link"
              id="nav-message-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-message"
              type="button" role="tab"
              aria-controls="nav-message"
              aria-selected="false"
            >
              История вопросов
            </button>
          </div>
        </nav>
        <div
          className="tab-content"
          id="nav-tabContent">
          <div
            className="tab-pane fade show active"
            id="nav-send-message"
            role="tabpanel"
            aria-labelledby="nav-send-message-tab"
          >
            <NewMessage />
          </div>
          <div
            className="tab-pane fade"
            id="nav-message"
            role="tabpanel"
            aria-labelledby="nav-message-tab"
          >
            {messagesClick ? <Messages /> : <></>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessagesPage;