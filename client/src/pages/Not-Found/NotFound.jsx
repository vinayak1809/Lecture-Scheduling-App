import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="devMode">
      <div class="error">404</div>
      <br />
      <br />
      <span class="info">
        Not Found!
      </span>

      <img
        src="http://images2.layoutsparks.com/1/160030/too-much-tv-static.gif"
        class="static"
        alt="not found"
      />
    </div>
  );
};

export default NotFound;
