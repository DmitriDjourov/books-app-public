import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SpinnerLoading from "../../Utils/SpinnerLoading";
import Pagination from "../../Utils/Pagination";
import HistoryModel from "../../../models/HistoryModel";

function HistoryPage() {

  const { authState } = useOktaAuth();
  const [isLoadingHistory, setIsLoadingHistory] = useState<boolean>(true);
  const [httpError, setHttpError] = useState<any>(null);

  const [histories, setHistories] = useState<HistoryModel[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchUserHistory = async () => {
      if (authState && authState.isAuthenticated) {
        const url = `${process.env.REACT_APP_API_URL}/histories/search/findBooksByUserEmail/?userEmail=${authState.accessToken?.claims.sub}&page=${currentPage - 1}&size=5`;
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        };
        const storyResponse = await fetch(url, requestOptions);
        if (!storyResponse.ok) {
          throw new Error("Ошибка!");
        }
        const storyResponseJson = await storyResponse.json();

        setHistories(storyResponseJson._embedded.histories);
        setTotalPages(storyResponseJson.page.totalPages);
      }
      setIsLoadingHistory(false);

    }
    fetchUserHistory().catch((error: any) => {
      setIsLoadingHistory(false);
      setHttpError(error.message);
    })
  }, [authState, currentPage, histories]);

  if (isLoadingHistory) {
    return (
      <SpinnerLoading />
    );
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="mt-2">
      {histories.length > 0 ?
        <>
          <h5>История:</h5>
          {histories.map((book, i) => (
            <div key={i}>
              <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
                <div className="row g-0">
                  <div className="col-md-2">
                    <div className="d-none d-lg-block">
                      {book.img ?
                        <img
                          src={book.img}
                          className="image-carousel small-img-history"
                          alt="Book" />
                        :
                        <img
                          className="image-carousel small-img-history"
                          src={require("./../../../Images/ImagesBooks/book_001.png")}
                          alt=""
                        />
                      }
                    </div>
                    <div className="d-lg-none d-flex justify-content-center align-items-center">
                      {book.img ?
                        <img
                          src={book.img}
                          className="image-carousel small-img-history"
                          alt="Book" />
                        :
                        <img
                          className="image-carousel small-img-history"
                          src={require("./../../../Images/ImagesBooks/book_001.png")}
                          alt=""
                        />
                      }
                    </div>
                  </div>
                  <div className="col">
                    <div className="card-body">
                      <h5 className="card-title"> {book.author} </h5>
                      <h4>{book.title}</h4>
                      <p className="card-text">{book.description}</p>
                      <hr />
                      <p className="card-text">Проверено: {book.checkoutDate}</p>
                      <p className="card-text">Возврат: {book.returnedDate}</p>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          ))}
        </>
        :
        <>
          <h3 className="mt-3">История пуста </h3>
          <Link
            className="btn btn-primary"
            to={"search"}
          >
            Найти новую
          </Link>
        </>
      }
      {
        totalPages > 1 && <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
        />
      }
    </div>
  );
}

export default HistoryPage;