const DEAFULT_PAGE_LIMIT = 1;

function getPagination(query) {
  const limit = Math.abs(query.limit) || DEAFULT_PAGE_LIMIT;
  const page = Math.abs(query.page) || DEAFULT_PAGE_LIMIT;
  const skip = (page - 1) * limit;

  return { skip, limit };
}

module.exports = { getPagination };
