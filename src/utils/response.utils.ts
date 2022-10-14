class CommonResponse {
  async RESPONSE(status: number = 0, response: any = {}, message: string = "") {
    return { status, response, message };
  }
}

export default CommonResponse;
