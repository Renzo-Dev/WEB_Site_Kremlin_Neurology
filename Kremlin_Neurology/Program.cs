var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllersWithViews();
var app = builder.Build();

app.UseStaticFiles();

app.MapControllerRoute(
    "default",
    "{controller=Home}/{action=Index}"
);

app.Use(async (context, next) =>
{
    await next();
    if (context.Response.StatusCode == 404 && !context.Response.HasStarted) context.Response.Redirect("/");
});
app.Run();