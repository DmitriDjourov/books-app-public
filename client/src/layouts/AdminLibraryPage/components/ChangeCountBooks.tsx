import React from "react";
import { useEffect, useState } from "react";
import Book from "../../../models/Book";
import SpinnerLoading from "../../Utils/SpinnerLoading";
import Pagination from "../../Utils/Pagination";
import ChangeCountBook from "./ChangeCountBook";

function ChangeCountBooks() {

  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [httpError, setHttpError] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [booksPerPage] = useState<number>(3);
  const [totalAmountBooks, setTotalAmountBooks] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const [bookDelete, setBookDelete] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      const baseUrl: string = `${process.env.REACT_APP_API_URL}/books?page=${currentPage - 1}&size=${booksPerPage}`;

      const response = await fetch(baseUrl);

      if (!response.ok) {
        throw new Error("Ошибка загрузки");
      }

      const responseJson = await response.json();
      const responseData = responseJson._embedded.books;

      setTotalAmountBooks(responseJson.page.totalElements);
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
    fetchBooks().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    })
  }, [currentPage, bookDelete]);

  const indexOfLastBook: number = currentPage * booksPerPage;
  const indexOfFirstBook: number = indexOfLastBook - booksPerPage;
  let lastItem = booksPerPage * currentPage <= totalAmountBooks ?
    booksPerPage * currentPage : totalAmountBooks;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const deleteBook = () => setBookDelete(!bookDelete);

  if (isLoading) {
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

  return (
    <div className="container mt-5">
      {totalAmountBooks > 0 ?
        <>
          <div className="mt-3">
            <h3>Количество: ({indexOfFirstBook + 1} .. {lastItem} из {totalAmountBooks})</h3>
          </div>
          {
            books.map(book => (
              <ChangeCountBook
                book={book}
                key={book.id}
                deleteBook={deleteBook}
              />
            ))
          }
        </>
        :
        <h5>Книга не добавлена</h5>
      }
      {
        totalPages > 1 &&
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
        />
      }
    </div>
  );
}

export default ChangeCountBooks;