import { useRouteError } from "react-router-dom";

export default function Error() {
  let error = useRouteError();

  return (
    <div id="error">
      <h1>Error!</h1>
      <p>An unexpected error has occurred.</p>
      <p>
        <em style={{ color: 'red' }}>
          {error.statusText ? `${error.statusText} : ` : ''}
          {error.message || error.data || ''}
        </em>
      </p>
    </div>
  );
}
