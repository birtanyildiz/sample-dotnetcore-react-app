using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SampleDotNetCoreReactApi.Data;
using SampleDotNetCoreReactApi.Dto;
using SampleDotNetCoreReactApi.Models;

namespace SampleDotNetCoreReactApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CourseController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Course
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CourseDto>>> GetCourses()
        {
            _context.Database.Migrate();
          if (_context.Courses == null)
          {
              return NotFound();
          }
            return await _context.Courses.Select(c => new CourseDto(c)).ToListAsync();
        }


        [HttpGet("{id}/content")]
        public async Task<ActionResult<CourseWithContentsDto>> GetContentsOfCourse(int id)
        {
            var course = _context.Courses.Find(id);

            if (course == null)
            {
                return NotFound();
            }

            var contents = await _context.Contents
                .Where(c => c.CourseId == id)
                .Select(c => new ContentDto
                {
                    Id = c.Id,
                    Title = c.Title,
                    Description = c.Description,
                    Url = c.Url,
                    CourseId = c.CourseId

                })
                .ToListAsync();

            CourseWithContentsDto _result = new CourseWithContentsDto
            {
                Id = course.Id,
                Title = course.Title,
                StartDateTime = course.StartDateTime,
                EndDateTime = course.EndDateTime,
                Status = course.Status,
                Contents = contents
            };


            return _result;
        }

        // GET: api/Course/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CourseDto>> GetCourse(int id)
        {
          if (_context.Courses == null)
          {
              return NotFound();
          }
            var course = await _context.Courses.FindAsync(id);

            if (course == null)
            {
                return NotFound();
            }
            CourseDto courseDto = new CourseDto
            {
                Id = course.Id,
                Title = course.Title,
                StartDateTime = course.StartDateTime,
                EndDateTime = course.EndDateTime,
                Status = course.Status

            };
            return courseDto;
        }


        

        // PUT: api/Course/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCourse(int id, Course course)
        {
            if (id != course.Id)
            {
                return BadRequest();
            }

            _context.Entry(course).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CourseExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Course
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CourseDto>> PostCourse(CourseDto course)
        {
          if (_context.Courses == null)
          {
              return Problem("Entity set 'ApplicationDbContext.Courses'  is null.");
          }

            Course newCourse = new Course
            {
                Title = course.Title,
                StartDateTime = course.StartDateTime,
                EndDateTime = course.EndDateTime,
                Status = course.Status
            };
            
            _context.Courses.Add(newCourse);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCourse", new { id = newCourse.Id }, course);
        }

        // DELETE: api/Course/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCourse(int id)
        {
            if (_context.Courses == null)
            {
                return NotFound();
            }
            var course = await _context.Courses.FindAsync(id);
            if (course == null)
            {
                return NotFound();
            }

            _context.Courses.Remove(course);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CourseExists(int id)
        {
            return (_context.Courses?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
