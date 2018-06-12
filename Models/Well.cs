using System.Collections.Generic;

namespace WellSchedule.Models {

    public class Well {

        public int Id { get; set; }

        public List<Job> Jobs { get; set; }
        
        public List<Job> JobsPool { get; set; }

        public string Name { get; set; }

        public Job GetById(int id) {
            Jobs.GetRange(1,1);
            return Jobs.Find(x => x.Id == id);
        }
    }
}