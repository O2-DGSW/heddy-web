import { Link } from "react-router-dom";
import { font, lightTheme } from "@design-tokens";

export const MainPage = () => {
  return (
    <div className="flex-col">
      <div>
        <Link to={"/login"}>
          <button className={font.body.bold} style={{ backgroundColor: lightTheme.primary.normal }}>
            로그인 페이지 가는 길
          </button>
        </Link>
      </div>
    </div>
  );
};
