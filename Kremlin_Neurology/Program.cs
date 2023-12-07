var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllersWithViews();
var app = builder.Build();

app.UseStaticFiles();
app.UseHttpsRedirection();
app.UseRouting();

app.MapControllerRoute(
    "default",
    "{controller}/{action}",
    new { controller = "Home", action = "Index" });

app.MapControllerRoute(
    "Library",
    "library.htm",
    new { controller = "Home", action = "Library" });

app.MapControllerRoute(
    "checkPassword",
    "checkPassword",
    new { controller = "Home", action = "CheckPassword" });

app.MapControllerRoute(
    "Download",
    "Download/{fileName}",
    new { controller = "File", action = "Download" }
);

app.MapControllerRoute(
    "learning",
    "edu.htm",
    new { controller = "Home", action = "Learning" }
);

app.Use(async (context, next) =>
{
    await next();
    if (context.Response.StatusCode == 404 && !context.Response.HasStarted) context.Response.Redirect("/");
});
app.Run();