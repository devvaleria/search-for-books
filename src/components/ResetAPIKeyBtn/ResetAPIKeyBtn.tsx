import style from "./resetAPIKeyBtn.module.css";
import { useAppDispatch } from "../../app/hooks";
import { getUsersAPIKey } from "../../features/search/searchSlice";

function ResetAPIKeyBtn() {
  const dispatch = useAppDispatch();
  const resetAPI = () => {
    const APIKeyPrompt = prompt("Your API key: ");
    if (APIKeyPrompt) {
      dispatch(getUsersAPIKey(APIKeyPrompt));
    } else alert(`API key cannot be empty. Try again.
     Info: https://developers.google.com/books/docs/v1/using?hl=en#APIKey`);
  };
  return (
    <button onClick={() => resetAPI()} className={style.resetAPIKeyBtn}>
      Reset API key
    </button>
  );
}

export default ResetAPIKeyBtn;
