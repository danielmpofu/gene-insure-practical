using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeneAPI.Models {
    public class Vehicle {
        public int Id { get; set; }
        public string RegNo { get; set; }
        public string PicUrl { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public string Color { get; set; }
        public int OwnerId { get; set; }
        public double MonthlyAmount { get; set; }
        public string OwnerNationalId { get; set; }
        public DateTime RegistrationDate { get; set; }
        public User Owner { get; set; }

    }
}