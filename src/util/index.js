module.exports = {
  initCap: (string) => {
    string = string.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    return string;
  },

  /**
   * get pagination data
   * @param {*} data -> {
   *                      pageNo: +ve number,
   *                      limit: +ve number
   *                    }
   * @returns 
   */
  paginationData: (data) => {
    try {
      let pageNo = Number(data.pageNo) || 1,
      limit = Number(data.limit) || 10,
      skip = (pageNo - 1) * limit;
      return {pageNo,limit,skip};
    } catch(error) {
      return {pageNo:1,limit:10,skip:0}
    }
  }

}