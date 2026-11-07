using Microsoft.AspNetCore.Mvc;

namespace TDevElectronics.Controllers
{
    public class HomeController : Controller
    {
        // 1. Trang chủ (01-home.html)
        public IActionResult Index()
        {
            ViewBag.Page = "home";
            return View();
        }

        // 2. Về chúng tôi (20-about.html)
        public IActionResult About()
        {
            ViewBag.Page = "about";
            return View();
        }

        // 3. Hỗ trợ & Liên hệ (21-support.html)
        public IActionResult Support()
        {
            ViewBag.Page = "support";
            return View();
        }

        // 4. Chính sách bảo mật (22-privacy.html)
        public IActionResult Privacy()
        {
            ViewBag.Page = "privacy";
            return View();
        }

        // 5. Điều khoản dịch vụ (23-terms.html)
        public IActionResult Terms()
        {
            ViewBag.Page = "terms";
            return View();
        }

        // 6. Mua hàng doanh nghiệp / Báo giá (19-business-buying.html)
        public IActionResult BusinessBuying()
        {
            ViewBag.Page = "business-buying";
            return View();
        }

        // 7. Trang báo lỗi 404 (24-notfound.html)
        public new IActionResult NotFound()
        {
            ViewBag.Page = "notfound";
            Response.StatusCode = 404;
            return View();
        }
    }
}