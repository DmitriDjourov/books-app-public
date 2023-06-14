import { useState } from "react";
import StarsReview from "./StarsReview";

interface Props {
  submitReview: any
}
function StarReview(arg: Props) {

  const [starInput, setStarInput] = useState<number>(0);
  const [displayInput, setDisplayInput] = useState<boolean>(false);
  const [reviewDescription, setReviewDescription] = useState<string>("");

  function starValue(value: number) {
    setStarInput(value);
    setDisplayInput(true);
  }

  return (
    <div
      className="dropdown"
      style={{ cursor: "pointer" }}
    >
      <h5
        className="dropdown-toggle"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
      >
        Ваш отзыв :
      </h5>
      <ul
        id="submitReviewRating"
        className="dropdown-menu"
        aria-labelledby="dropdownMenuButton1"
      >
        {
          Array.from({ length: 6 }, (_, index) => index)
            .map(value => (
              <li key={value}>
                <button
                  onClick={() => starValue(value)}
                  className="dropdown-item"
                >
                  <StarsReview rating={value} />
                </button>
              </li>))
        }
      </ul>
      <StarsReview rating={starInput} />

      {displayInput &&
        <form
          method="POST"
          action="#"
        >
          <hr />
          <div className="mb-3">
            <label className="form-label">
              Описание
            </label>
            <textarea
              className="form-control"
              id="submitReviewDescription"
              placeholder="Optional"
              rows={3}
              onChange={e => setReviewDescription(e.target.value)}
            >
            </textarea>
          </div>

          <div>
            <button
              type="button"
              onClick={() => arg.submitReview(starInput, reviewDescription)}
              className="btn btn-primary mt-3"
            >
              Оставить отзыв
            </button>
          </div>
        </form>
      }
    </div>
  );
}

export default StarReview;