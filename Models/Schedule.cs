using System.Collections.Generic;

namespace WellSchedule.Models {

    public class Schedule {

        public int Id { get; set; }

        public int Year { get; set; }

        public List<Well> Wells { get; set; }

        public Well GetById(int id){
            return Wells.Find(x => x.Id == id);
        }
    }
}