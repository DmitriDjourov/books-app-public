import { useOktaAuth } from "@okta/okta-react";
import { useState } from "react";
import bookItem from "../../../models/AddBookRequest";

export const AddNewBook = () => {

  const { authState } = useOktaAuth();

  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [copies, setCopies] = useState<number>(0);
  const [category, setCategory] = useState<string>("Категория");
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const [displayWarning, setDisplayWarning] = useState<boolean>(false);
  const [displaySuccess, setDisplaySuccess] = useState<boolean>(false);

  function categoryField(value: string) {
    setCategory(value.toUpperCase());
  }

  async function base64ForImages(e: any) {
    if (e.target.files[0]) {
      getBase64(e.target.files[0]);
    }
  }

  function getBase64(file: any) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setSelectedImage(reader.result);
    };
    reader.onerror = function (error) {
      console.log(error);
    }
  }

  async function submitNewBook() {
    const url = `${process.env.REACT_APP_API_URL}/admin/secure/add/book`;
    if (
      authState?.isAuthenticated
      && title !== ""
      && author !== ""
      && category !== "Категория"
      && description !== ""
      && copies >= 0) {

      const book: bookItem = new bookItem(
        title,
        author,
        description,
        copies,
        category);
      book.img = selectedImage;

      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(book)
      };

      const submitNewBookResponse = await fetch(url, requestOptions);
      if (!submitNewBookResponse.ok) {
        throw new Error("Ошибка добавления");
      }

      setTitle("");
      setAuthor("");
      setDescription("");
      setCopies(0);
      setCategory("Категория");
      setSelectedImage(null);
      setDisplayWarning(false);
      setDisplaySuccess(true);
    } else {
      setDisplayWarning(true);
      setDisplaySuccess(false);
    }
  }

  function categoryList() {
    const comparison = [];
    comparison.push({ shotName: "be", displayName: "Back End" });
    comparison.push({ shotName: "fe", displayName: "Front End" });
    comparison.push({ shotName: "devops", displayName: "DevOps" });
    comparison.push({ shotName: "data", displayName: "Data Science" });
    return comparison;
  }

  return (
    <div className="container mt-5 mb-5">
      {displaySuccess &&
        <div
          className="alert alert-success"
          role="alert"
        >
          Книга добавлена
        </div>
      }
      {
        displayWarning &&
        <div
          className="alert alert-danger"
          role="alert"
        >
          Заполните все поля
        </div>
      }
      <div className="card">
        <div className="card-header">
          Добавить книгу
        </div>
        <div className="card-body">
          <form method="POST">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Название
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="название" required
                  onChange={e => setTitle(e.target.value)}
                  value={title}
                />
              </div>
              <div className="col-md-3 mb-3">
                <label
                  className="form-label">
                  Автор
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="автор"
                  required
                  onChange={e => setAuthor(e.target.value)}
                  value={author}
                />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">
                  Категория
                </label>
                <button
                  className="form-control btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {category}
                </button>
                <ul
                  id="addNewBookId"
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  {
                    categoryList().map(item => (
                      <li key={item.displayName}>
                        <a
                          onClick={() => categoryField(item.shotName)}
                          className="dropdown-item"
                        >
                          {item.displayName}
                        </a>
                      </li>
                    )
                    )}
                </ul>
              </div>
            </div>
            <div className="col-md-12 mb-3">
              <label className="form-label">
                Описание
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows={3}
                onChange={e => setDescription(e.target.value)}
                value={description}
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">
                Количество
              </label>
              <input
                type="number"
                className="form-control"
                name="Copies"
                required
                onChange={e => setCopies(Number(e.target.value))}
                value={copies}
              />
            </div>
            <input
              type="file"
              onChange={e => base64ForImages(e)}
            />
            <div>
              <button
                type="button"
                className="btn btn-primary mt-3"
                onClick={() => { submitNewBook(); }}
              >
                Добавить книгу
              </button>
            </div>
          </form>
        </div>
      </div >
    </div >
  );
}