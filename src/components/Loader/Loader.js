import s from "../Loader/Loader.module.css";
import { ImSpinner2 } from "react-icons/im";

const Loader = () => {
  return (
    <div role="alert">
      <div>
        <ImSpinner2 size="32" className={s.spinner} />
        Загружаем...
      </div>
    </div>
  );
};

export default Loader;
