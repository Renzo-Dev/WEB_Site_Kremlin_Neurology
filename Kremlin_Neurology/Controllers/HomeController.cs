using Kremlin_Neurology.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Kremlin_Neurology.Controllers;

public class HomeController : Controller
{
    [HttpGet]
    public IActionResult Index()
    {
        return View();
    }

    [HttpGet]
    public IActionResult Library()
    {
        return View("~/Views/Home/Library.cshtml");
    }

    [HttpPost]
    public async Task<ActionResult?> CheckPassword()
    {
        var tempPass = "123123";

        using (var reader = new StreamReader(Request.Body))
        {
            var json = await reader.ReadToEndAsync();
            var passModel = JsonConvert.DeserializeObject<PasswordModel>(json);
            if (passModel != null && passModel.password == tempPass)
                return PartialView("~/Views/Partials/PrivateLibrary.cshtml");

            return StatusCode(StatusCodes.Status401Unauthorized);
        }
    }

    [HttpGet]
    public IActionResult Learning()
    {
        return View();
    }
}