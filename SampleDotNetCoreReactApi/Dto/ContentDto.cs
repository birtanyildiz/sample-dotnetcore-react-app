using System;
using SampleDotNetCoreReactApi.Models;

namespace SampleDotNetCoreReactApi.Dto
{
	public class ContentDto
	{

        public int Id { get; set; }
        public String? Title { get; set; }
        public String? Description { get; set; }
        public String? Url { get; set; }
        public int CourseId { get; set; }

        public ContentDto()
		{
		}

        public ContentDto(Content content)
            => (Id, Title, Description, Url, CourseId)
            = (
            content.Id, content.Title, Description,
            content.Url, content.CourseId
            );
	}
}

