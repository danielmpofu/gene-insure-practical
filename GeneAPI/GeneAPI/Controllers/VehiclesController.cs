using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GeneAPI.Data;
using GeneAPI.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GeneAPI.Controllers {

    [Route ("api/[controller]")]
    [ApiController]
    public class VehiclesController : ControllerBase {
        private readonly DataContext _context;

        public VehiclesController (DataContext context) {
            _context = context;
        }

        // GET: api/Vehicles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Vehicle>>> GetVehicles () {
            return await _context.Vehicles.ToListAsync ();
        }

        [HttpGet ("{id}")]
        public async Task<ActionResult<Vehicle>> GetVehicle (int id) {
            var vehicle = await _context.Vehicles.FindAsync (id);

            if (vehicle == null) {
                return NotFound ();
            }

            return vehicle;
        }

        [HttpPost ("update/{id}")]
        public async Task<IActionResult> UpdateVehicle (int id, Vehicle vehicle) {
            if (id != vehicle.Id) {
                return BadRequest ();
            }

            _context.Entry (vehicle).State = EntityState.Modified;

            try {
                await _context.SaveChangesAsync ();
            } catch (DbUpdateConcurrencyException) {
                if (!VehicleExists (id)) {
                    return NotFound ();
                } else {
                    throw;
                }
            }

            return NoContent ();
        }

        [HttpPost]
        [Route ("add")]
        public async Task<ActionResult<Vehicle>> AddVehicl (Vehicle vehicle) {
            vehicle.RegistrationDate = DateTime.Now;
            _context.Vehicles.Add (vehicle);
            await _context.SaveChangesAsync ();

            return CreatedAtAction ("GetVehicle", new { id = vehicle.Id }, vehicle);
        }

        [HttpGet]
        [Route ("delete/{id}")]
        public async Task<ActionResult<Vehicle>> DeleteVehicle (int id) {
            var vehicle = await _context.Vehicles.FindAsync (id);
            if (vehicle == null) {
                return NotFound ();
            }

            _context.Vehicles.Remove (vehicle);
            await _context.SaveChangesAsync ();

            return vehicle;
        }

        private bool VehicleExists (int id) {
            return _context.Vehicles.Any (e => e.Id == id);
        }
    }
}