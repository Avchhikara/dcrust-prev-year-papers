module.exports = async ($, appendWithHref = "") => {
  const out = [];
  $("table[border='1'] tr")
    .toArray()
    .forEach((element) => {
      let [course, courseName] = $(element).children().toArray().slice(1);
      course = $(course);
      courseName = $(courseName);
      out.push({
        courseId: course.text(),
        paperUrl:
          appendWithHref + $(course.children().toArray()[0]).attr("href"),
        courseName: courseName.text(),
      });
    });
  return out;
};
