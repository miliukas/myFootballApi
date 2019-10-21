using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyFootballApi.Models;

namespace MyFootballApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly MyFootballContext _context;

        public UsersController(MyFootballContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [Route("~/api/Users")]
        [Authorize(Roles = "administrator")]
        [HttpGet]
        public IEnumerable<User> GetUsers()
        {
            return _context.user.GetUsers();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        [Authorize(Roles = "administrator")]
        public async Task<IActionResult> GetUser([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _context.user.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // PUT: api/User/5
        [HttpPut("{id}")]
        [Authorize(Roles = "administrator, User")]
        public async Task<IActionResult> PutUser([FromRoute] int id, [FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userToPut = await _context.user.FindAsync(id);

            if (userToPut == null)
            {
                return NotFound();
            }

            _context.user.PutUser(id, user);

            return Ok(user);
        }

        // POST: api/Users
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> PostUser([FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //await
            _context.user.Add(user);

            return CreatedAtAction("GetUser", new { id = user.id }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "administrator")]
        public async Task<IActionResult> DeleteUser([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _context.user.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.user.Remove(user);

            return Ok(user);
        }

    }
}
