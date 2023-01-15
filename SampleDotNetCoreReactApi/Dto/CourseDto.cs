using System;
using SampleDotNetCoreReactApi.Models;

namespace SampleDotNetCoreReactApi.Dto
{
	public class CourseDto
	{
        public int Id { get; set; }
        public String? Title { get; set; }
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
        public bool Status { get; set; }

        public CourseDto()
		{
		}
        public CourseDto(Course course) =>
            (Id, Title, StartDateTime, EndDateTime, Status) =
            (course.Id, course.Title, course.StartDateTime,
            course.EndDateTime, course.Status);
	}
}

