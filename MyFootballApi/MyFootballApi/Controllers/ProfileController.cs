using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyFootballApi.Models;

namespace MyFootballApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly MyFootballContext _context;
        public ProfileController(MyFootballContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Authorize(Roles = "administrator, User")]
        // Get: api/Profile
        public async Task<Object> GetUserProfile()
        {
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var username = claimsIdentity.FindFirst(ClaimTypes.Name)?.Value;
            string role;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            User user = await _context.user.FindByUsername(username);

            return new
            {
                Username = user.username,
                Email = user.email,
                FavouriteTeam = user.favouriteTeam
            };
        }

        // PUT: api/Profile
        [HttpPut]
        [Authorize(Roles = "administrator, User")]
        public async Task<IActionResult> PutProfile([FromBody] User user)
        {
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var username = claimsIdentity.FindFirst(ClaimTypes.Name)?.Value;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _context.user.PutByUsername(username, user);

            return Ok(user);
        }
    }
}