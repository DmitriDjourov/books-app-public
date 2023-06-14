import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ShelfCurrentLoans from "../../../models/ShelfCurrentLoans";
import SpinnerLoading from "../../Utils/SpinnerLoading";
import LoansModal from "./LoansModal";

function Loans() {

  const { authState } = useOktaAuth();
  const [httpError, setHttpError] = useState<any>(null);

  const [shelfCurrentLoans, setShelfCurrentLoans] = useState<ShelfCurrentLoans[]>([]);
  const [isLoadingUserLoans, setIsLoadingUserLoans] = useState<boolean>(true);
  const [checkout, setCheckout] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserCurrentLoans = async () => {
      if (authState && authState.isAuthenticated) {
        const url = `${process.env.REACT_APP_API_URL}/books/secure/currentloans`;
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            "Content-Type": "application/json"
          }
        };
        const shelfCurrentLoansResponse = await fetch(url, requestOptions);
        if (!shelfCurrentLoansResponse.ok) {
          throw new Error("Ошибка!");
        }
        const shelfCurrentLoansResponseJson = await shelfCurrentLoansResponse.json();
        setShelfCurrentLoans(shelfCurrentLoansResponseJson);
      }
      setIsLoadingUserLoans(false);
    }
    fetchUserCurrentLoans().catch((error: any) => {
      setIsLoadingUserLoans(false);
      setHttpError(error.message);
    })
    window.scrollTo(0, 0);
  }, [authState, checkout]);

  if (isLoadingUserLoans) {
    return (
      <SpinnerLoading />
    );
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>
          {httpError}
        </p>
      </div>
    );
  }

  async function returnBook(bookId: number) {
    const url = `${process.env.REACT_APP_API_URL}/books/secure/return/?bookId=${bookId}`;
    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        "Content-Type": "application/json"
      }
    };
    const returnResponse = await fetch(url, requestOptions);
    if (!returnResponse.ok) {
      throw new Error("Ошибка!");
    }
    setCheckout(!checkout);
  }

  async function renewLoan(bookId: number) {
    const url = `${process.env.REACT_APP_API_URL}/books/secure/renew/?bookId=${bookId}`;
    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        "Content-Type": "application/json"
      }
    };

    const returnResponse = await fetch(url, requestOptions);
    if (!returnResponse.ok) {
      throw new Error("Ошибка!");
    }
    setCheckout(!checkout);
  }
  return (
    <div>
      <div className="d-none d-lg-block mt-2">
        {shelfCurrentLoans.length > 0 ?
          <>
            <h5>Текущий список: </h5>
            {shelfCurrentLoans.map(shelfCurrentLoan => (
              <div key={shelfCurrentLoan.book.id}>
                <div className="row mt-3 mb-3">
                  <div className="col-4 col-md-4 container">
                    {shelfCurrentLoan.book?.img ?
                      <img
                        src={shelfCurrentLoan.book?.img}
                        className="image-carousel checkout-img"
                        alt="Book" />
                      :
                      <img
                        className="image-carousel checkout-img"
                        src={require("./../../../Images/ImagesBooks/book_001.png")}
                        alt=""
                      />
                    }
                  </div>
                  <div
                    className="card col-3 col-md-3 
                    container d-flex"
                  >
                    <div className="card-body">
                      <div className="mt-3">
                        <h4>Варианты: </h4>
                        {shelfCurrentLoan.daysLeft > 0 &&
                          <p className="text-secondary">
                            Осталось дней: {shelfCurrentLoan.daysLeft}.
                          </p>
                        }
                        {shelfCurrentLoan.daysLeft === 0 &&
                          <p className="text-success">
                            Сегодня
                          </p>
                        }
                        {shelfCurrentLoan.daysLeft < 0 &&
                          <p className="text-danger">
                            Срок вышел дней: {shelfCurrentLoan.daysLeft}.
                          </p>
                        }
                        <div className="list-group mt-3">
                          <button
                            className="list-group-item list-group-item-action"
                            aria-current="true"
                            data-bs-toggle="modal"
                            data-bs-target={`#modal${shelfCurrentLoan.book.id}`}
                          >
                            Управление
                          </button>
                          <Link
                            to={"search"}
                            className="list-group-item list-group-item-action">
                            Подыскать другие?
                          </Link>
                        </div>
                      </div>
                      <hr />
                      <p className="mt-3">
                        Помогите другим найти свое приключение...
                      </p>
                      <Link
                        className="btn btn-primary"
                        to={`/checkout/${shelfCurrentLoan.book.id}`}
                      >
                        Оставить отзыв
                      </Link>
                    </div>
                  </div>
                </div>
                <hr />
                <LoansModal
                  shelfCurrentLoan={shelfCurrentLoan}
                  mobile={false}
                  returnBook={returnBook}
                  renewLoan={renewLoan} />
              </div>
            ))}
          </> :
          <>
            <h3 className="mt-3">
              Отсутствует
            </h3>
            <Link
              className="btn btn-primary"
              to={`search`}
            >
              Найти новую
            </Link>
          </>
        }
      </div>


      <div className="container d-lg-none mt-2">
        {shelfCurrentLoans.length > 0 ?
          <>
            <h5 className="mb-3">Current Loans: </h5>

            {shelfCurrentLoans.map(shelfCurrentLoan => (
              <div key={shelfCurrentLoan.book.id}>
                <div className="d-flex justify-content-center align-items-center">
                  {shelfCurrentLoan.book?.img ?
                    <img
                      src={shelfCurrentLoan.book?.img}
                      className="image-carousel checkout-img"
                      alt="Book" />
                    :
                    <img
                      className="image-carousel checkout-img"
                      src={require("./../../../Images/ImagesBooks/book_001.png")}
                      alt=""
                    />
                  }
                </div>
                <div className="card d-flex mt-5 mb-3">
                  <div className="card-body container">
                    <div className="mt-3">
                      <h4>Варианты</h4>
                      {shelfCurrentLoan.daysLeft > 0 &&
                        <p className="text-secondary">
                          Дней осталось: {shelfCurrentLoan.daysLeft}.
                        </p>
                      }
                      {shelfCurrentLoan.daysLeft === 0 &&
                        <p className="text-success">
                          Сегодня
                        </p>
                      }
                      {shelfCurrentLoan.daysLeft < 0 &&
                        <p className="text-danger">
                          Дней осталось: {shelfCurrentLoan.daysLeft}.
                        </p>
                      }
                      <div className="list-group mt-3">
                        <button
                          className="list-group-item list-group-item-action"
                          aria-current="true"
                          data-bs-toggle="modal"
                          data-bs-target={`#mobilemodal${shelfCurrentLoan.book.id}`}
                        >
                          Управление
                        </button>
                        <Link
                          to={"search"}
                          className="list-group-item list-group-item-action"
                        >
                          Подыскать другие?
                        </Link>
                      </div>
                    </div>
                    <hr />
                    <p className="mt-3">
                      Помогите другим найти свое приключение...
                    </p>
                    <Link
                      className="btn btn-primary"
                      to={`/checkout/${shelfCurrentLoan.book.id}`}
                    >
                      Оставить отзыв
                    </Link>
                  </div>
                </div>

                <hr />
                <LoansModal
                  shelfCurrentLoan={shelfCurrentLoan}
                  mobile={true}
                  returnBook={returnBook}
                  renewLoan={renewLoan} />
              </div>
            ))}
          </> :
          <>
            <h3 className="mt-3">
              Отсутствует
            </h3>
            <Link
              className="btn btn-primary"
              to={`/search`}>
              Найти новую
            </Link>
          </>
        }
      </div>
    </div >
  );
}

export default Loans;