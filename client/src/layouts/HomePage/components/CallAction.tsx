import { useOktaAuth } from "@okta/okta-react/";
import { Link } from "react-router-dom";

function CallAction() {
  const { authState } = useOktaAuth();

  return (
    <div>
      <div className="d-none d-lg-block">
        <div className="row g-0 mt-5">

          <div className="col-sm-6 col-md-6">
            <div className="col-image-left"></div>
          </div>

          <div className="col-4 col-md-4 container d-flex justify-content-center align-items-center">
            <div className="ml-2">
              <h1>Пора найти лучшее</h1>
              <p className="lead">
                Открой мир слов в нашем книжном магазине.
                Расширь кругозор, вдохновись и погрузись в
                приключения через страницы нашего каталога.
                Готов начать свое литературное путешествие?
                Исследуй каталог прямо сейчас!
              </p>
              <Link type="button" className="btn main-color btn-lg text-white"
                to="/search">Исследовать</Link>
            </div>
          </div>
        </div>

        <div className="row g-0">
          <div className="col-4 col-md-4 container d-flex 
                        justify-content-center align-items-center">
            <div className="ml-2">
              <h1>Он такой один </h1>
              <p className="lead">
                Добро пожаловать в наш книжный магазин!
                Создай свой личный кабинет, чтобы открывать новые главы и наслаждаться привилегиями.
                Получи доступ к специальным предложениям,
                сохраняй свои избранные книги и оставляй отзывы.
                Вступи в нашу читательскую коммуну и открой мир литературы сегодня!
              </p>
              <ul className="navbar-nav ms-auto">
                {!authState?.isAuthenticated ?
                  <li className="nav-item m-1">
                    <Link type="button" className="btn main-color btn-lg text-white" to="/login">
                      Вход
                    </Link>
                  </li>
                  :
                  <li className="nav-item m-1">
                    У вас есть личный кабинет. Перейти в <Link type="button" className="link-primary"
                      to="/search">каталог</Link>
                  </li>
                }
              </ul>
            </div>
          </div>
          <div className="col-sm-6 col-md-6">
            <div className="col-image-right"></div>
          </div>
        </div>

      </div>

      <div className="d-lg-none">
        <div className="container">
          <div className="m-2">
            <div className="col-image-left">  </div>
            <div className="mt-2">
              <h1>Пора найти лучшее</h1>
              <p className="lead">
                Открой мир слов в нашем книжном магазине.
                Расширь кругозор, вдохновись и погрузись в
                приключения через страницы нашего каталога.
                Готов начать свое литературное путешествие?
                Исследуй каталог прямо сейчас!
              </p>
              <Link type="button" className="btn main-color btn-lg text-white"
                to="/search">Исследовать</Link>
            </div>

            <div className="mt-2">
              <div className="col-image-right"></div>
              <div className="mt-2">
                <h1>Он такой один </h1>
                <p className="lead">
                  Добро пожаловать в наш книжный магазин!
                  Создай свой личный кабинет, чтобы открывать новые главы и наслаждаться привилегиями.
                  Получи доступ к специальным предложениям,
                  сохраняй свои избранные книги и оставляй отзывы.
                  Вступи в нашу читательскую коммуну и открой мир литературы сегодня!
                </p>
                <ul className="navbar-nav ms-auto">
                  {!authState?.isAuthenticated ?
                    <li className="nav-item m-1">
                      <Link type="button" className="btn main-color btn-lg text-white" to="/login">
                        Вход
                      </Link>
                    </li>
                    :
                    <li className="nav-item m-1">
                      У вас есть личный кабинет. Перейти в <Link type="button" className="link-primary"
                        to="/search">каталог</Link>
                    </li>
                  }
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div >
  );
}

export default CallAction;