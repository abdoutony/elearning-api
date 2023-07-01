const mongoose = require("mongoose");
const moment = require("moment-timezone");
const courseSchema = new mongoose.Schema(
  {
    course_image: {
      type: String,
    },
    course_name: {
      type: String,
      required: true,
    },
    course_code: {
      type: String,
    },
    course_timezone: {
      type: Date,
      default: moment.tz(Date.now(), moment.tz.guess()).format(),
    },
    course_startdate: {
      type: Date,
      default: null,
    },
    course_enddate: {
      type: Date,
      default: null,
    },
    course_restrinct_beforestart: {
      type: Boolean,
      default: false,
    },
    course_restrict_afterend: {
      type: Boolean,
      default: false,
    },
    course_due_time: {
      type: Date,
      default: moment().endOf("day").subtract(1, "minute").toDate(),
    },
    course_language: {
      type: String,
      default: "English",
    },
    course_visibility: {
      type: String,
      enum: ["published", "unpublished"],
      default: "unpublished",
    },
    course_description: {
      type: String,
    },
    course_updatedBy: {
      type: String,
      default: null,
    },
    course_archivedAt: {
      type: Date,
      default: null,
    },
    course_archivedBy: {
      type: String,
      default: null,
    },
    course_isArchived: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

courseSchema.pre("save", function (next) {
  if (this.isNew) {
    this.course_code = this.course_name.split(" ")[0];
    return next();
  } else {
    return next();
  }
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
