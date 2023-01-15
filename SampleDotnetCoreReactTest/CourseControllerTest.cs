using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SampleDotNetCoreReactApi.Controllers;
using SampleDotNetCoreReactApi.Data;
using SampleDotNetCoreReactApi.Models;

namespace SampleDotnetCoreReactTest;

public class CourseControllerTest
{
    [Fact]
    public void Get_CourseAddFunctionTestReturnsOkResult()
    {
        var builder = WebApplication.CreateBuilder();
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseNpgsql(builder.Configuration.GetConnectionString("TestConnection"))
                .Options;



        using (var context = new ApplicationDbContext(options))
        {
            context.Database.Migrate();
            context.Courses?.Add(new Course {Title="Test Course" });
            context.SaveChanges();
        }

        using (var context = new ApplicationDbContext(options))
        {
            var controller = new CourseController(context);
            var result = controller.GetCourses();
            Assert.NotNull(result);
        }
    }
}
