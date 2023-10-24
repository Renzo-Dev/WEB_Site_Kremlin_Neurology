using Microsoft.AspNetCore.Mvc;

namespace Kremlin_Neurology.Controllers;

public class HomeController : Controller
{
    [HttpGet]
    public IActionResult Index()
    {
        return View();
    }
}