var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllersWithViews();
var app = builder.Build();

app.UseStaticFiles();

app.MapControllerRoute(
    "default",
    "{controller}/{action}",
    new { controller = "Home", action = "Index" });

app.MapControllerRoute(
    "Library",
    "Library",
    new { controller = "Home", action = "Library" }
);

app.MapControllerRoute(
    "LibraryAccess",
    "LibraryAccess",
    new { controller = "Home", action = "LibraryAccess" }
);

app.Use(async (context, next) =>
{
    await next();
    if (context.Response.StatusCode == 404 && !context.Response.HasStarted) context.Response.Redirect("/");
});
app.Run();