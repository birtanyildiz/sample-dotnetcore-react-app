using System;
namespace SampleDotNetCoreReactApi.Models
{
	public class Content
	{
		public int Id { get; set; }
		public String? Title { get; set; }
		public String? Description { get; set; }
		public String? Url { get; set; }
		public int CourseId { get; set; }
		public Course? Course { get; set; }
	}
}

