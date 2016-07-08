using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ngInfiniteScroll.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }

        //fetch data from the database.
        public JsonResult getEmployeeData(int page)
        {
            List<Employee> list = new List<Employee>();
            //The reason for the "using" statement is to ensure that the object is disposed as soon as it goes out of scope, and it doesn't require explicit code to ensure that this happens.
            using (myDatabaseEntities dc = new myDatabaseEntities())
            {
                int totalPage = 0;
                int totalRecord = 0;
                int pageSize = 20;

                //Populate v with data from the database.
                var v = dc.Employees.OrderBy(a => a.FirstName);
                totalRecord = v.Count();
                totalPage = (totalRecord / pageSize) + ((totalRecord % pageSize) > 0 ? 1 : 0);
                //Populate the list with data from the variable v ,data filtered is, as shown below 
                list = v.Skip((page - 1) * pageSize).Take(pageSize).ToList();

                //The first argument is a json object populated with data from above.
                //The second argument is required if the request is a GET request. 
                return new JsonResult { Data = new { List = list, currentPage = page, totalPage = totalPage }, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

            }
        }
    }
}