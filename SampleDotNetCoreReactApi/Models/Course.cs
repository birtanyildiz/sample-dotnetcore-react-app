using System;
namespace SampleDotNetCoreReactApi.Models
{
	public class Course
	{
		public int Id { get; set; }
		public String? Title { get; set; }
		public DateTime StartDateTime { get; set; }
		public DateTime EndDateTime { get; set; }
		public bool Status { get; set; }
		public List<Content>? Contents { get; set; }
	}
}

