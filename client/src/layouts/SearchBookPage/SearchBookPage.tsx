import { useEffect, useState } from "react";
import Book from "../../models/Book";
import SpinnerLoading from "../Utils/SpinnerLoading";
import SearchBookItem from "./components/SearchBookItem";
import Pagination from "../Utils/Pagination";
import LibraryServices from "../HomePage/components/LibraryServices";

export const SearchBooksPage = () => {

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setIsLoading] = useState<boolean>(true);
  const [httpError, setHttpError] = useState<any>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(2);
  const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [search, setSearch] = useState("");
  const [searchUrl, setSearchUrl] = useState("");

  const [categorySelection, setCategorySelection] = useState("All");

  useEffect(() => {
    const fetchBooks = async () => {
      const baseUrl = `${process.env.REACT_APP_API_URL}/books`;
      let url = `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`

      if (searchUrl === "") {
        url = `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`;
      } else {
        let searchWithPage = searchUrl.replace("<pageNumber>", `${currentPage - 1}`);
        url = `${baseUrl}${searchWithPage}`
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Ошибка загрузки");
      }

      const responseJson = await response.json();
      const responseData = responseJson._embedded.books;

      setTotalAmountOfBooks(responseJson.page.totalElements);
      setTotalPages(responseJson.page.totalPages);

      const loadedBooks: Book[] = [];

      for (const key in responseData) {
        loadedBooks.push({
          id: responseData[key].id,
          title: responseData[key].title,
          author: responseData[key].author,
          description: responseData[key].description,
          copies: responseData[key].copies,
          copiesAvailable: responseData[key].copiesAvailable,
          category: responseData[key].category,
          img: responseData[key].img,
        });
      }

      setBooks(loadedBooks);
      setIsLoading(false);
    };
    fetchBooks().catch((err: any) => {
      setIsLoading(false);
      setHttpError(err.message)
    });
    window.scrollTo(0, 0);

  }, [currentPage, searchUrl]);

  if (loading) {
    return (
      <SpinnerLoading />
    );
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    )
  }

  const searchHandleChange = () => {
    setCurrentPage(1);
    if (search === "") {
      setSearchUrl("");
    } else {
      setSearchUrl(`/search/findByTitleContaining?title=${search}&page=<pageNumber>&size=${booksPerPage}`)
    }
    setCategorySelection("all")
  }

  const categoryField = (value: string) => {
    setCurrentPage(1);
    if (
      value.toLowerCase() === "fe" ||
      value.toLowerCase() === "be" ||
      value.toLowerCase() === "data" ||
      value.toLowerCase() === "devops"
    ) {
      setCategorySelection(value);
      setSearchUrl(`/search/findByCategory?category=${value}&page=<pageNumber>&size=${booksPerPage}`)
    } else {
      setCategorySelection("All");
      setSearchUrl(`?page=<pageNumber>&size=${booksPerPage}`)
    }
  }

  const fullNameCategoryTitle = (shotName: string) => {
    const comparison = new Map<string, string>();
    comparison.set("be", "Back End");
    comparison.set("fe", "Front End");
    comparison.set("devops", "DevOps");
    comparison.set("data", "Data Science");
    comparison.set("all", "Все категории");

    return comparison.get(shotName.toLowerCase());
  }

  const indexOfLastBook: number = currentPage * booksPerPage;
  const indexOfFirstBook: number = indexOfLastBook - booksPerPage;
  let lastItem = booksPerPage * currentPage <= totalAmountOfBooks
    ? booksPerPage * currentPage
    : totalAmountOfBooks;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <div>
      <div className="container">
        <div>
          <div className="row mt-5">
            <div className="col-6">
              <div className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Поиск"
                  aria-labelledby="Search"
                  onChange={(e) => { setSearch(e.target.value); }} />
                <button
                  className="btn btn-outline-success"
                  onClick={(e) => { searchHandleChange(); }}
                >
                  Найти
                </button>
              </div>
            </div>
            <div className="col-4">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {fullNameCategoryTitle(categorySelection)}
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li onClick={(e) => { categoryField("all"); }}>
                    <a className="dropdown-item" href="#">
                      All
                    </a>
                  </li>
                  <li onClick={(e) => { categoryField("fe"); }}>
                    <a className="dropdown-item" href="#">
                      Frontend
                    </a>
                  </li>
                  <li onClick={(e) => { categoryField("be"); }}>
                    <a className="dropdown-item" href="#">
                      Backend
                    </a>
                  </li>
                  <li onClick={(e) => { categoryField("data"); }}>
                    <a className="dropdown-item" href="#">
                      Data
                    </a>
                  </li>
                  <li onClick={(e) => { categoryField("devops"); }}>
                    <a className="dropdown-item" href="#">
                      DevOps
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {totalAmountOfBooks > 0 ?
            <>
              <div className="mt-3">
                <h5>Всего книг: {totalAmountOfBooks}</h5>
              </div>
              <p>
                На странице: {indexOfFirstBook + 1} .. {lastItem} из {totalAmountOfBooks}
              </p>
              {books.map(item => (
                <SearchBookItem book={item} key={item.id} />
              ))}
            </>
            :
            <LibraryServices />
          }
          {totalPages > 1 &&
            <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
          }
        </div>
      </div >
    </div >
  );
}

export default SearchBooksPage;