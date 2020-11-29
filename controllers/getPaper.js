const Paper = require("./../model/paper");

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
  return {
    papers,
    courseId,
  };
};
