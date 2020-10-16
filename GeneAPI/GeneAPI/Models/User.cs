using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeneAPI.Models {
    public class User {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string ImageUrl { get; set; }
        public string Password { get; set; }
        public string NationalId { get; set; }
        public IList<Vehicle> Vehicles { get; set; }

    }
}