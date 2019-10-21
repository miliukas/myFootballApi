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
    public class TeamsController : ControllerBase
    {
        private readonly MyFootballContext _context;
        public TeamsController(MyFootballContext context)
        {
            _context = context;
        }

        // GET: api/Teams
        [Route("~/api/Teams")]
        [AllowAnonymous]
        [HttpGet]
        public IEnumerable<Team> GetTeams()
        {
            return _context.team.GetTeams();
        }


        // GET: api/Teams/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetTeam([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var team = await _context.team.FindAsync(id);

            if (team == null)
            {
                return NotFound();
            }

            return Ok(team);
        }

        // PUT: api/Teams/5
        [HttpPut("{id}")]
        [Authorize(Roles = "administrator")]
        public async Task<IActionResult> PutTeam([FromRoute] int id, [FromBody] Team team)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var teamToPut = await _context.team.FindAsync(id);

            if (teamToPut == null)
            {
                return NotFound();
            }

            _context.team.PutTeam(id, team);

            return Ok(team);
        }

        // POST: api/Teams
        [HttpPost]
        [Authorize(Roles = "administrator")]
        public async Task<IActionResult> PostTeam([FromBody] Team team)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //await
            _context.team.Add(team);

            return CreatedAtAction("GetTeam", new { id = team.id }, team);
        }

        // DELETE: api/Teams/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "administrator")]
        public async Task<IActionResult> DeleteTeam([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var team = await _context.team.FindAsync(id);
            if (team == null)
            {
                return NotFound();
            }

            _context.team.Remove(team);

            return Ok(team);
        }

    }
}
