using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SampleDotNetCoreReactApi.Data;
using SampleDotNetCoreReactApi.Models;

namespace SampleDotNetCoreReactApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ContentController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Content
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Content>>> GetContents()
        {
          if (_context.Contents == null)
          {
              return NotFound();
          }
            return await _context.Contents.ToListAsync();
        }

        // GET: api/Content/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Content>> GetContent(int id)
        {
          if (_context.Contents == null)
          {
              return NotFound();
          }
            var content = await _context.Contents.FindAsync(id);

            if (content == null)
            {
                return NotFound();
            }

            return content;
        }

        // PUT: api/Content/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContent(int id, Content content)
        {
            if (id != content.Id)
            {
                return BadRequest();
            }

            _context.Entry(content).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContentExists(id))
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

        // POST: api/Content
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Content>> PostContent(Content content)
        {
          if (_context.Contents == null)
          {
              return Problem("Entity set 'ApplicationDbContext.Contents'  is null.");
          }
            _context.Contents.Add(content);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetContent", new { id = content.Id }, content);
        }

        // DELETE: api/Content/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContent(int id)
        {
            if (_context.Contents == null)
            {
                return NotFound();
            }
            var content = await _context.Contents.FindAsync(id);
            if (content == null)
            {
                return NotFound();
            }

            _context.Contents.Remove(content);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ContentExists(int id)
        {
            return (_context.Contents?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
