import ShelfCurrentLoans from "../../../models/ShelfCurrentLoans";

interface Props {
  shelfCurrentLoan: ShelfCurrentLoans;
  mobile: boolean;
  returnBook: any;
  renewLoan: any;
}
function LoansModal(arg: Props) {
  return (
    <div
      className="modal fade"
      id={
        arg.mobile
          ? `mobilemodal${arg.shelfCurrentLoan.book.id}`
          : `modal${arg.shelfCurrentLoan.book.id}`
      }
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
      key={arg.shelfCurrentLoan.book.id}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              Варианты
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
            </button>
          </div>
          <div className="modal-body">
            <div className="container">
              <div className="mt-3">
                <div className="row">
                  <div className="col-2">
                    {arg.shelfCurrentLoan.book?.img ?
                      <img
                        src={arg.shelfCurrentLoan.book.img}
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
                  <div className="col-10">
                    <h6>{arg.shelfCurrentLoan.book.author}</h6>
                    <h4>{arg.shelfCurrentLoan.book.title}</h4>
                  </div>
                </div>
                <hr />
                {arg.shelfCurrentLoan.daysLeft > 0 &&
                  <p className="text-secondary">
                    Осталось дней: {arg.shelfCurrentLoan.daysLeft}.
                  </p>
                }
                {arg.shelfCurrentLoan.daysLeft === 0 &&
                  <p className="text-success">
                    Сегодня
                  </p>
                }
                {arg.shelfCurrentLoan.daysLeft < 0 &&
                  <p className="text-danger">
                    Срок вышел дней: {arg.shelfCurrentLoan.daysLeft}.
                  </p>
                }
                <div className="list-group mt-3">
                  <button
                    onClick={() => arg.returnBook(arg.shelfCurrentLoan.book.id)}
                    data-bs-dismiss="modal"
                    className="list-group-item list-group-item-action"
                    aria-current="true"
                  >
                    Возврат
                  </button>
                  <button
                    onClick=
                    {
                      arg.shelfCurrentLoan.daysLeft < 0
                        ? (event) => event.preventDefault()
                        : () => arg.renewLoan(arg.shelfCurrentLoan.book.id)
                    }
                    data-bs-dismiss="modal"
                    className={
                      arg.shelfCurrentLoan.daysLeft < 0
                        ? "list-group-item list-group-item-action inactiveLink"
                        : "list-group-item list-group-item-action"
                    }>
                    {arg.shelfCurrentLoan.daysLeft < 0 ?
                      "Просроченные не могут быть продлены" : "Продлить"
                    }
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoansModal;