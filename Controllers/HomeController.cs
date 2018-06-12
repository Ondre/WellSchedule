using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WellSchedule.Models;
using Microsoft.EntityFrameworkCore;

namespace WellSchedule.Controllers
{
    public class HomeController : Controller
    {

        private AppDbContext context = new AppDbContext();  

            public IActionResult Index()
        {
            return View();
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult CreateSchedule(){

            for (int i = 0; i < 10 ; i++) {
                List<Well> wells = new List<Well>();
                for (int j = 0 ; j < 5 ; j ++){
                    Well well = new Well();
                    well.Name = "Well: " + i + ":" + j;
                    well.Jobs = new List<Job>();
                    well.JobsPool = new List<Job>();
                    well.JobsPool.Add(new Job {
                        Title = "Job: " + i + ":" + j
                    });
                    wells.Add(well);
                }
                Schedule temp = new Schedule();
                temp.Year = i + 2010;
                temp.Wells = wells;

                context.Add(temp);
            }
            context.SaveChanges();

            return RedirectToAction("Schedule");
        }

        public IActionResult Schedule()
        {
            ViewData["Message"] = "Wells schedule";

            var schedule = context.Schedule.Include(sch => sch.Wells)
            .ThenInclude(well => well.Jobs).Include(x => x.Wells).ThenInclude(x => x.JobsPool)
            .First();         

            return View(schedule);
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
