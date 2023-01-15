using System;
namespace SampleDotNetCoreReactApi.Dto
{
	public class CourseWithContentsDto
	{
        public int Id { get; set; }
        public String? Title { get; set; }
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
        public bool Status { get; set; }
        public List<ContentDto>? Contents { get; set; }
	}
}

