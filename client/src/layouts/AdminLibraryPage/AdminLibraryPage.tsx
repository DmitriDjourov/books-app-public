import { useOktaAuth } from "@okta/okta-react/";
import { Redirect } from "react-router-dom";
import AdminMessages from "./components/AdminMessages";
import { AddNewBook } from "./components/AddNewBook";
import ChangeCountBooks from "./components/ChangeCountBooks";

function ManageLibraryPage() {
  const { authState } = useOktaAuth();

  if (authState?.accessToken?.claims.userTypeRole === undefined) {
    return <Redirect to="/home" />
  }

  return (
    <div className="container">
      <div className="mt-5">
        <h3>Управление библиотекой</h3>
        <nav>
          <div
            className="nav nav-tabs"
            id="nav-tab"
            role="tablist"
          >
            <button
              onClick={() => { }}
              className="nav-link active"
              id="nav-add-book-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-add-book"
              type="button"
              role="tab"
              aria-controls="nav-add-book"
              aria-selected="false"
            >
              Добавить новую книгу
            </button>
            <button
              onClick={() => { }}
              className="nav-link"
              id="nav-quantity-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-quantity"
              type="button"
              role="tab" aria-controls="nav-quantity"
              aria-selected="true"
            >
              Изменить количество доступных
            </button>
            <button
              onClick={() => { }}
              className="nav-link"
              id="nav-messages-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-messages"
              type="button"
              role="tab"
              aria-controls="nav-messages"
              aria-selected="false"
            >
              Сообщения
            </button>
          </div>
        </nav>
        <div
          className="tab-content"
          id="nav-tabContent"
        >
          <div
            className="tab-pane fade show active"
            id="nav-add-book"
            role="tabpanel"
            aria-labelledby="nav-add-book-tab"
          >
            <AddNewBook />
          </div>
          <div
            className="tab-pane fade"
            id="nav-quantity"
            role="tabpanel"
            aria-labelledby="nav-quantity-tab"
          >
            <ChangeCountBooks />
          </div>
          <div
            className="tab-pane fade"
            id="nav-messages"
            role="tabpanel"
            aria-labelledby="nav-messages-tab"
          >
            <AdminMessages />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageLibraryPage;