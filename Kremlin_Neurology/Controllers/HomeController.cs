using System.Text;
using System.Text.Json;
using Kremlin_Neurology.Models;
using Microsoft.AspNetCore.Mvc;

namespace Kremlin_Neurology.Controllers;

public class HomeController : Controller
{
    public static string PartialPage { get; set; }

    [HttpGet]
    public IActionResult Index()
    {
        return View();
    }

    [HttpPost]
    public async Task<IActionResult> LibraryAccess()
    {
        using (var reader = new StreamReader(Request.Body, Encoding.UTF8))
        {
            string requestBody = await reader.ReadToEndAsync();

            // Десериализация JSON в объект модели
            PasswordModel? passwordModel = JsonSerializer.Deserialize<PasswordModel>(requestBody);

            // Используйте passwordModel.Password по вашему усмотрению
            var password = passwordModel?.password;
            
            PartialPage = "~/Views/Partials/Lib.cshtml";
            return View("~/Views/Home/Library.cshtml");
        }
    }

    [HttpGet]
    public IActionResult Library()
    {
        PartialPage = "~/Views/Partials/Forma.cshtml";
        return View("~/Views/Home/Library.cshtml");
    }
}