class Responses {
  constructor(res) {
    this.res = res;
  }
  success(data) {
    const { res } = this;
    res
      .status(200)
      .json({
        data: data,
      })
      .end();
  }
  customError(status, message) {
    const { res } = this;
    res
      .status(status)
      .json({
        errors: message,
      })
      .end();
  }
  setCookie(cookieName, cookieValue) {
    const { res } = this;
    res.cookie(cookieName, cookieValue);
  }
  error(message) {
    const { res } = this;
    res
      .status(500)
      .json({
        errors: message,
      })
      .end();
  }
}

export default Responses;
