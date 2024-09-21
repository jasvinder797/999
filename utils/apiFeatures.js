class APIFeatures {
  constructor(query, queryString) {
    // queryString = req.query
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    const queryObj = { ...this.queryString };
    // not queryObj = req.query because it will delete also from req.query
    const exculdedFields = ['page', 'limit', 'sort', 'fields'];
    exculdedFields.forEach((field) => delete queryObj[field]);

    //1B) ADVANCED FILTRING
    // {'difficulty': 'easy', 'duration': {$gte: 5}}
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt'); // - here for decending latest ot oldest
    }
    return this;
  }
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields); // called projecting ****
    } else {
      this.query = this.query.select('-__v'); // - exculde fileds here
    }
    return this;
  }
  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;
