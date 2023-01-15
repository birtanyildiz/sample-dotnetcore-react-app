using System;
using Microsoft.EntityFrameworkCore;
using SampleDotNetCoreReactApi.Models;

namespace SampleDotNetCoreReactApi.Data
{
	public class ApplicationDbContext : DbContext
	{
		public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
			: base(options)
		{
		}
		public DbSet<Course>? Courses { get; set; }
		public DbSet<Content>? Contents { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<Content>()
				.HasOne(p => p.Course)
				.WithMany(c => c.Contents)
				.HasForeignKey(p => p.CourseId);
		}
	}
}

