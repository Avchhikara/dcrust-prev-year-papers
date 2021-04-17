const Paper = require("./../model/paper");
const SearchLog = require("./../model/SearchLog");

module.exports = async (req, res, mongoose) => {
  const { courseId, courseName } = req.query;
  // console.log(courseId, courseName);
  var papers = [];
  if (courseId) {
    const re = RegExp(courseId.toUpperCase());
    papers = await Paper.find(
      {
        courseId: { $regex: re },
      },
      {
        _id: 0,
        __v: 0,
      }
    );
  } else if (courseName) {
    papers = await Paper.find(
      {
        courseName: { $regex: courseName },
      },
      {
        _id: 0,
        __v: 0,
      }
    );
  }

  // Saving the search logs as well.
  const log = new SearchLog({
    courseId,
    ip: req.ip,
  });
  await log.save();

  return {
    papers,
    courseId,
  };
};
