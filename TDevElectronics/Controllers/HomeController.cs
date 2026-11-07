using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using TDevElectronics.Models;

namespace TDevElectronics.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index() => View();
        public IActionResult About() => View();
        public IActionResult Support() => View();
        public IActionResult Privacy() => View();
        public IActionResult Terms() => View();
        public IActionResult BusinessBuying() => View();
        public IActionResult NotFound() => View();

        // Bổ sung action Error theo yêu cầu
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}