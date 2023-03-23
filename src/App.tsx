import { useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import { getUsersAPIKey } from "./features/search/searchSlice";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import ResetAPIKeyBtn from "./components/ResetAPIKeyBtn/ResetAPIKeyBtn";
import FoundBookCards from "./components/FoundBookCards/FoundBookCards";
import SelectedBookInfo from "./components/SelectedBookInfo/SelectedBookInfo";
import Error from "./components/Error/Error";

function App() {
  const APIKey = useAppSelector((state) => state.search.APIKey);
  const status = useAppSelector((state) => state.search.status);
  const currentPage = useAppSelector((state) => state.search.currentPage);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUsersAPIKey(APIKey));
  }, []);
  return (
    <div className="App">
      <ResetAPIKeyBtn />
      <Header APIKey={APIKey} />
      {status === "failed" ? (
        <Error />
      ) : currentPage === "foundBookCards" ? (
        <FoundBookCards APIKey={APIKey} status={status} />
      ) : (
        <SelectedBookInfo APIKey={APIKey} status={status} />
      )}
    </div>
  );
}
export default App;
