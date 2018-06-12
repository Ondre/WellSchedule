using System;

namespace WellSchedule.Models {

    public class Job {
        
        public int Id { get; set; }

        public DateTime From { get; set;}

        public void test() {
            bool a = From.Day == 1;
        }
    
        public DateTime To { get; set; }

        public string Title { get; set; }

    }
}